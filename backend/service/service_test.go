package service

import (
	"context"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/tortedCtrl/Calculator-Test-Sprint/models"
)

func TestCalculator(t *testing.T) {
	t.Run("happy path", func(t *testing.T) {
		ctx := context.Background()

		testExpression1 := "(2+4)/6"
		testResult1 := "1"

		testExpression2 := "(2+4)/6*18/6"
		testResult2 := "3"

		testExpression3 := ""
		testResult3 := ""

		testExpression4 := "1/0"
		testResult4 := "+Inf"

		repo := newHistoryRepositoryMock()

		calculator := NewCalculator(repo)

		result, err := calculator.EvalExpression(ctx, testExpression1)
		assert.NoError(t, err)

		assert.Equal(t, testResult1, result)

		result, err = calculator.EvalExpression(ctx, testExpression2)
		assert.NoError(t, err)

		assert.Equal(t, testResult2, result)

		result, err = calculator.EvalExpression(ctx, testExpression3)
		assert.NoError(t, err)

		assert.Equal(t, testResult3, result)

		result, err = calculator.EvalExpression(ctx, testExpression4)
		assert.NoError(t, err)

		assert.Equal(t, testResult4, result)

		records, err := calculator.GetHistory(ctx)
		assert.NoError(t, err)

		assert.ElementsMatch(t, []models.HistoryRecord{
			{Expression: testExpression1, Result: testResult1},
			{Expression: testExpression2, Result: testResult2},
			{Expression: testExpression4, Result: testResult4},
		}, records)
	})

	t.Run("invalid expression", func(t *testing.T) {
		ctx := context.Background()

		var longExpression strings.Builder
		for range expressionLengthLimit + 1 {
			longExpression.WriteString("a")
		}

		testCases := []struct {
			name              string
			invalidExpression string
			assertErr         func(t *testing.T, err error)
		}{
			{
				name:              "letter in expression",
				invalidExpression: "7+9/9-x",
				assertErr: func(t *testing.T, err error) {
					var target models.BadExpressionError
					assert.ErrorAs(t, err, &target)
					assert.Equal(t, models.TypeBadExpression, target.Type)
				},
			},
			{
				name:              "logically invalid expression",
				invalidExpression: "1+2+3(+4)",
				assertErr: func(t *testing.T, err error) {
					var target models.BadExpressionError
					assert.ErrorAs(t, err, &target)
					assert.Equal(t, models.TypeBadExpression, target.Type)
				},
			},
			{
				name:              "expression too big",
				invalidExpression: longExpression.String(),
				assertErr: func(t *testing.T, err error) {
					var target models.ExpressionLengthLimitExceededError
					assert.ErrorAs(t, err, &target)
					assert.Equal(t, models.TypeExpressionLengthLimitExceeded, target.Type)
					assert.Equal(t, expressionLengthLimit, target.Limit)
					assert.Equal(t, len(longExpression.String()), target.Length)
				},
			},
		}

		for _, tc := range testCases {
			t.Run(tc.name, func(t *testing.T) {
				repo := newHistoryRepositoryMock()

				calculator := NewCalculator(repo)

				_, err := calculator.EvalExpression(ctx, tc.invalidExpression)
				assert.Error(t, err)
				tc.assertErr(t, err)

				records, err := calculator.GetHistory(ctx)
				assert.NoError(t, err)
				assert.Empty(t, records)
			})
		}
	})
}
