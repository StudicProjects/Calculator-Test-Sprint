package models

import "fmt"

const (
	TypeValidationError               = "ValidationError"
	TypeBadExpression                 = "BadExpression"
	TypeExpressionLengthLimitExceeded = "ExpressionLengthLimitExceeded"
	TypeInternalError                 = "InternalError"
)

type (
	CalculatorError struct {
		Type    string `json:"type"`
		Message string `json:"message"`
	}

	ExpressionLengthLimitExceededError struct {
		CalculatorError
		Expression string `json:"expression"`
		Length     int    `json:"length"`
		Limit      int    `json:"limit"`
	}

	ValidationError struct {
		CalculatorError
	}

	BadExpressionError struct {
		CalculatorError
		Expression string `json:"expression"`
	}

	InternalError struct {
		CalculatorError
	}

	EvalExpressionRequest struct {
		Expression string `json:"expression"`
	}

	EvalExpressionResponse struct {
		Expression string `json:"expression"`
		Result     string `json:"result"`
	}

	HistoryRecord struct {
		ID         int    `json:"-" db:"id"`
		Expression string `json:"expression" db:"expression"`
		Result     string `json:"result" db:"result"`
	}

	EnvConfig struct {
		AppPort    string
		DbUser     string
		DbPassword string
		DbHost     string
		DbPort     string
		DbName     string
	}
)

func (e CalculatorError) getType() string {
	return e.Type
}

func (e CalculatorError) Error() string {
	return e.Message
}

func NewBadExpression(expression, msg string) error {
	return BadExpressionError{
		CalculatorError: CalculatorError{
			Type:    TypeBadExpression,
			Message: msg,
		},
		Expression: expression,
	}
}

func NewExpressionLengthLimitExceeded(expression string, limit int) error {
	msg := fmt.Sprintf("expression length %d exceeded %d characters", len(expression), limit)
	return ExpressionLengthLimitExceededError{
		CalculatorError: CalculatorError{
			Type:    TypeExpressionLengthLimitExceeded,
			Message: msg,
		},
		Expression: expression,
		Length:     len(expression),
		Limit:      limit,
	}
}

func NewValidationError(msg string) error {
	return ValidationError{
		CalculatorError: CalculatorError{
			Type:    TypeValidationError,
			Message: msg,
		},
	}
}

func NewInternalError(msg string) error {
	return InternalError{
		CalculatorError: CalculatorError{
			Type:    TypeInternalError,
			Message: msg,
		},
	}
}

func ToCalculatorError(err error) error {
	calculatorError := chainUnwrap(err)
	if calculatorError == nil {
		return nil
	}

	if _, ok := calculatorError.(interface{ getType() string }); !ok {
		calculatorError = NewInternalError(calculatorError.Error())
	}
	return calculatorError
}

func chainUnwrap(err error) error {
	for err != nil {
		if _, ok := err.(interface{ getType() string }); ok {
			return err
		}
		u, ok := err.(interface{ Unwrap() error })
		if !ok {
			return err
		}
		err = u.Unwrap()
	}
	return nil
}
