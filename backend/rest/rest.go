package rest

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/tortedCtrl/Calculator-Test-Sprint/models"
)

//go:generate mockgen -source=rest.go -destination=calculator_mock.go -package=rest
type (
	Handler struct {
		calculator Calculator
	}

	Calculator interface {
		EvalExpression(ctx context.Context, expression string) (string, error)
		GetHistory(ctx context.Context) ([]models.HistoryRecord, error)
	}
)

func NewHandler(calculator Calculator) *Handler {
	return &Handler{
		calculator: calculator,
	}
}

func (h *Handler) RegisterRoutes(mux *http.ServeMux) {
	mux.HandleFunc("POST /eval", h.EvalExpression)
	mux.HandleFunc("GET /history", h.GetHistory)
}

func (h *Handler) EvalExpression(w http.ResponseWriter, req *http.Request) {
	var evalRequest models.EvalExpressionRequest
	if err := json.NewDecoder(req.Body).Decode(&evalRequest); err != nil {
		handleError(w, models.NewValidationError(err.Error()))
		return
	}

	result, err := h.calculator.EvalExpression(req.Context(), evalRequest.Expression)
	if err != nil {
		handleError(w, err)
		return
	}

	evalResponse := models.EvalExpressionResponse{
		Expression: evalRequest.Expression,
		Result:     result,
	}
	handleSuccess(w, evalResponse)
}

func (h *Handler) GetHistory(w http.ResponseWriter, req *http.Request) {
	limit:= 20
	offset:=10

	if value:=req.URL.Query().Get("limit"); value != ""{
		parsed,err := strconv.Atoi(value)
		if err!=nil {
			handleError(w, models.NewValidationError("limit must be an int"))
			return
		}
		limit = parsed
	}
	if value:=req.URL.Query().Get("offset"); value != ""{
		parsed,err := strconv.Atoi(value)
		if err!=nil {
			handleError(w, models.NewValidationError("offset must be an int"))
			return
		}
		offset = parsed
	}
	records, err := h.calculator.GetHistory(req.Context())
	if err != nil {
		handleError(w, err)
		return
	}

	handleSuccess(w, records)
}
