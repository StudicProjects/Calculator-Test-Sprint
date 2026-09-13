import api from "../api/index.ts"

interface SuccessReponse {
    result: number
}

interface ErrorResponse {
    message: string
}

interface SuccessExpression {
    expression: string,
    answer: number
}

interface ErrorExpression {
    expression: string,
    message: string
}

function useBackend() {

    async function calculate(expression: string): Promise<SuccessReponse | ErrorResponse> {
        return (await api.post("/", expression)).data
    }

    async function fetchHistory(): Promise<(SuccessExpression | ErrorExpression)[]> {
        return (await api.get("/")).data
    }

    return [calculate, fetchHistory] as const
}

export default useBackend
