import api from "../api/index.ts"
import type { SuccessExpression, ErrorExpression } from "../Expressions.tsx"

interface SuccessResponse {
    result: number
}

interface ErrorResponse {
    message: string
}

function useBackend() {

    async function calculate(expression: string): Promise<SuccessResponse | ErrorResponse> {
        return (await api.post("/", expression)).data
    }

    async function fetchHistory(): Promise<(SuccessExpression | ErrorExpression)[]> {
        return (await api.get("/")).data
    }

    return [calculate, fetchHistory] as const
}

export default useBackend
