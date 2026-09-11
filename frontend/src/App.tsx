import CalculatePage from './pages/CalculatePage.tsx'
import useBackend from './hooks/BackendHook.tsx'

function App() {

    const [calculate, fetchHistory] = useBackend()

    return (
        <CalculatePage onCalculate={calculate} onFetchHistory={fetchHistory} />
    )
}

export default App