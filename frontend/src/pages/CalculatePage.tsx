import { Container, Form, Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import CalculatorGrid from './CalculatorGrid';
import HistoryList from './HistoryList';
import type { SuccessExpression, ErrorExpression } from '../Expressions.tsx'
import type { TextAreaHook } from '../hooks/TextAreaHook.tsx'
import { useTextArea } from '../hooks/TextAreaHook.tsx'

function CalculatePage(props: any) {
    const isCalcualting = props.isCalcualting
    const result = props.result
    const history = props.history
    // const history: (SuccessExpression | ErrorExpression)[] = [
    //     { expression: "2 + 2", answer: 4 },
    //     { expression: "(10 + 5) * 2", answer: 30 },
    //     { expression: "100 ÷ 4", answer: 25 },
    //     { expression: "50 % 10", answer: 0 },
    //     { expression: "7 + 8 - 3", answer: 12 },
    //     { expression: "2 ^ 3", answer: 8 },
    //     { expression: "(25 * 4) + 50", answer: 150 },
    //     { expression: "99 + 1", answer: 100 }
    // ];
    const onCalculate = props.onCalculate
    const onFetchHistory = props.onFetchHistory
    const textArea: TextAreaHook = useTextArea(onCalculate)
    const [isHistoryLoading, setHistory] = useState(false);
    const [showModal, setModal] = useState(false);

    const handleHistoryClick = async () => {
        setHistory(true);
        try {
            await onFetchHistory();
            setModal(true);
        } catch (error) {
            alert("Не удалось получить историю с сервера");
        } finally {
            setHistory(false);
        }
    }

    useEffect(() => {
        textArea.setResultIfNotNull(result);
    }, [result]);

    const buttonStyles = (
        <style>{`
        .push-button:active {
        transform: translateY(2px) !important;
        box-shadow: inset 0 2px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.3) !important;
        }
    `}</style>
    );

    return (
        <Container className="mx-auto p-4 border rounded shadow-sm" style={{
            maxWidth: '350px',
            marginTop: '130px',
            position: 'relative',
            color: '#E8DFFF',
            background: 'linear-gradient(180deg, #563E2B 0%, #3D291C 100%)',
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), 0 15px 35px rgba(0,0,0,0.5)',
        }} >

            <h4 className="text-center mb-4">Калькулятор</h4>
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    value={textArea.expression}
                    onChange={textArea.handleChange}
                    disabled={isCalcualting}
                    className="text-end fs-4"
                    style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }}
                />
            </Form.Group>

            <CalculatorGrid
                textArea={textArea}
                isCalculating={isCalcualting}
                isHistoryLoading={isHistoryLoading}
                onHistoryClick={handleHistoryClick}
            />

            {buttonStyles}

            <Modal show={showModal} onHide={() => setModal(false)} centered>
                <Modal.Header closeButton style={{ backgroundColor: '#9ce7e5', color: '#3d2314', borderBottom: '1px solid #3d2314' }}>
                    <Modal.Title className="fs-5">История вычислений</Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ backgroundColor: '#9ce7e5', color: '#3d2314' }}>
                    <HistoryList
                        records={history}
                        onItemClick={(clickedText: string) => {
                            textArea.onSetHistoryElement(clickedText);
                            setModal(false);
                        }}
                    />
                </Modal.Body>
            </Modal>
        </Container>
    )
}


export default CalculatePage