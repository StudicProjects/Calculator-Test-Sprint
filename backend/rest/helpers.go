package rest

import (
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"

	models "github.com/tortedCtrl/Calculator-Test-Sprint/models"
)

func handleSuccess(w http.ResponseWriter, resp any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode(resp); err != nil {
		slog.Error("failed to write response", "error", err)
	}
}

func mapErrorWithCode(err error) int {
	var code int
	switch {
	case errors.As(err, &models.BadExpressionError{}) ||
		errors.As(err, &models.ValidationError{}) ||
		errors.As(err, &models.ExpressionLengthLimitExceededError{}):
		code = http.StatusBadRequest
	default:
		code = http.StatusInternalServerError
	}
	return code
}

func handleError(w http.ResponseWriter, err error) {
	if err == nil {
		return
	}

	code := mapErrorWithCode(err)

	slog.Error("request failed with an error", "error", err)

	calculatorError := models.ToCalculatorError(err)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)

	if err := json.NewEncoder(w).Encode(calculatorError); err != nil {
		slog.Error("failed to write response", "error", err)
	}
}
