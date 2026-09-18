import api from "../api/index.ts"
import type { SuccessExpression, ErrorExpression } from "../Expressions.tsx"

// Контракт из документации
interface EvalExpressionRequest {
    expression: string
}

interface EvalExpressionResponse {
    expression: string
    result: string
}

interface HistoryRecord {
    expression: string
    result: string
}

interface CalculatorError {
    type: 'ValidationError' | 'BadExpression' | 'ExpressionLengthLimitExceeded' | 'InternalError'
    message: string
    expression?: string
    length?: number
    limit?: number
}

function useBackend() {

    async function calculate(expression: string): Promise<EvalExpressionResponse> {
        const payload: EvalExpressionRequest = { expression }
        return (await api.post<EvalExpressionResponse>("eval", payload)).data
    }

    async function fetchHistory(): Promise<HistoryRecord[]> {
        return (await api.get<HistoryRecord[]>("history")).data
    }

    return [calculate, fetchHistory] as const
}

export default useBackend
