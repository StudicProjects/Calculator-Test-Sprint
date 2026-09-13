package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/tortedCtrl/Calculator-Test-Sprint/models"
	"github.com/tortedCtrl/Calculator-Test-Sprint/repository"
	"github.com/tortedCtrl/Calculator-Test-Sprint/rest"
	"github.com/tortedCtrl/Calculator-Test-Sprint/service"
)

func parseEnvConfig() (*models.EnvConfig, error) {
	if err := godotenv.Load(); err != nil {
		return nil, err
	}
	return &models.EnvConfig{
		AppPort:    os.Getenv("APP_PORT"),
		DbUser:     os.Getenv("DB_USER"),
		DbPassword: os.Getenv("DB_PASSWORD"),
		DbHost:     os.Getenv("DB_HOST"),
		DbPort:     os.Getenv("DB_PORT"),
		DbName:     os.Getenv("DB_NAME"),
	}, nil
}

func createPgDbPool(ctx context.Context, config *models.EnvConfig) (*pgxpool.Pool, error) {
	dsn := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable",
		config.DbUser,
		config.DbPassword,
		config.DbHost,
		config.DbPort,
		config.DbName,
	)

	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		return nil, fmt.Errorf("create pgx pool: %w", err)
	}

	if err := pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, fmt.Errorf("ping pgx pool: %w", err)
	}

	return pool, nil
}

func main() {
	ctx := context.Background()

	mux := http.NewServeMux()

	config, err := parseEnvConfig()
	if err != nil {
		log.Fatalf("Can't parse env config: %s", err.Error())
	}

	pool, err := createPgDbPool(ctx, config)
	if err != nil {
		log.Fatalf("Can't create postgres database pool: %s", err.Error())
	}
	defer pool.Close()

	repo := repository.NewHistoryRepository(pool)
	calculator := service.NewCalculator(repo)

	handler := rest.NewHandler(calculator)
	handler.RegisterRoutes(mux)

	log.Fatal(http.ListenAndServe(fmt.Sprintf("localhost:%s", config.AppPort), mux))
}
