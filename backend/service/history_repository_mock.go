package service

import (
	"context"

	"github.com/tortedCtrl/Calculator-Test-Sprint/models"
)

type historyRepositoryMock struct {
	records []models.HistoryRecord
}

func newHistoryRepositoryMock() *historyRepositoryMock {
	return &historyRepositoryMock{}
}

func (r *historyRepositoryMock) SaveRecord(_ context.Context, record *models.HistoryRecord) error {
	r.records = append(r.records, *record)
	return nil
}

func (r *historyRepositoryMock) GetRecords(_ context.Context) ([]models.HistoryRecord, error) {
	return r.records, nil
}
