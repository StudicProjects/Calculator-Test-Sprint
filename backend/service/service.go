package service

import (
	"context"
	"fmt"
	"regexp"

	"github.com/expr-lang/expr"
	"github.com/tortedCtrl/Calculator-Test-Sprint/models"
)

var (
	validExpression = regexp.MustCompile(`^[0-9+\-*/().\s]+$`)
)

const (
	expressionLengthLimit = 256
)

type (
	Calculator struct {
		repo HistoryRepository
	}

	HistoryRepository interface {
		SaveRecord(ctx context.Context, record *models.HistoryRecord) error
		GetRecords(ctx context.Context) ([]models.HistoryRecord, error)
	}
)

func NewCalculator(repo HistoryRepository) *Calculator {
	return &Calculator{
		repo: repo,
	}
}

func (c *Calculator) EvalExpression(ctx context.Context, expression string) (string, error) {
	if len(expression) == 0 {
		return "", nil
	}

	if len(expression) > expressionLengthLimit {
		return "", models.NewExpressionLengthLimitExceeded(expression, expressionLengthLimit)
	}

	if !validExpression.MatchString(expression) {
		return "", models.NewBadExpression(expression, "expression contains invalid characters")
	}

	result, err := c.evaluate(expression)
	if err != nil {
		return "", fmt.Errorf("evaluate expression: %w", err)
	}

	record := &models.HistoryRecord{
		Expression: expression,
		Result:     result,
	}
	if err := c.repo.SaveRecord(ctx, record); err != nil {
		return "", fmt.Errorf("save history record: %w", err)
	}
	return result, nil
}

func (c *Calculator) evaluate(expression string) (string, error) {
	result, err := expr.Eval(expression, nil)
	if err != nil {
		return "", models.NewBadExpression(expression, err.Error())
	}
	return fmt.Sprint(result), nil
}

func (c *Calculator) GetHistory(ctx context.Context) ([]models.HistoryRecord, error) {
	return c.repo.GetRecords(ctx)
}
