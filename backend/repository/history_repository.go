package repository

import (
	"context"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/tortedCtrl/Calculator-Test-Sprint/models"
)

type HistoryRepository struct {
	pool *pgxpool.Pool
}

func NewHistoryRepository(pool *pgxpool.Pool) *HistoryRepository {
	return &HistoryRepository{
		pool: pool,
	}
}

func (r *HistoryRepository) SaveRecord(ctx context.Context, record *models.HistoryRecord) error {
	_, err := r.pool.Exec(ctx, `
    	INSERT INTO history (expression, result)
    	VALUES ($1, $2)
	`, record.Expression, record.Result)
	return err
}

func (r *HistoryRepository) GetRecords(ctx context.Context, limit int, offset int) ([]models.HistoryRecord, error) {
	rows, err := r.pool.Query(ctx, `
		SELECT id, expression, result
		FROM history
		ORDER BY id DESC
		LIMIT $1
		OFFSET $2
		`,limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	records, err := pgx.CollectRows(
		rows,
		pgx.RowToStructByName[models.HistoryRecord],
	)
	if err != nil {
		return nil, err
	}
	return records, nil
}
