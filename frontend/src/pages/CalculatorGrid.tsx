import { Row, Col, Button } from 'react-bootstrap';



function CalculatorGrid(props: any) {
    const textArea = props.textArea;
    const isCalcualting = props.isCalculating;
    const isHistoryLoading = props.isHistoryLoading;
    const onHistoryClick = props.onHistoryClick;

    function LightGreenButton(props: { char: string }) {
        return <Col xs={3}><Button variant="light" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => textArea.onOperationClick(props.char)}>{props.char}</Button></Col>
    }
    function DangerWhiteButton(props: { char: string }) {
        return <Col xs={3}><Button variant="danger" className="w-100 push-button" style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => textArea.onNumberClick(props.char)}>{props.char}</Button></Col>

    }
    function LightWhiteButton(props: { char: string }) {
        return <Col xs={3}><Button variant="light" className="w-100 push-button" style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => textArea.onNumberClick(props.char)}>{props.char}</Button></Col>
    }
    function OperationButton(props: { char: string }) {
        return <Col xs={3}><Button variant="warning" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => textArea.onOperationClick(props.char)}>{props.char}</Button></Col>
    }

    return (
        <>
            <Row className="g-2 mb-2">
                <LightGreenButton char='%' />
                <LightGreenButton char='(' />
                <LightGreenButton char=')' />
                <Col xs={3}><Button variant="danger" className="w-100 push-button" style={{ backgroundColor: '#E5A93C', color: '#4A3525', border: 'none', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => textArea.onACClick()}>AC</Button></Col>
            </Row>
            <Row className="g-2 mb-2">
                <DangerWhiteButton char='1' />
                <LightWhiteButton char='2' />
                <LightWhiteButton char='3' />
                <OperationButton char='÷' />
            </Row>
            <Row className="g-2 mb-2">
                <DangerWhiteButton char='4' />
                <LightWhiteButton char='5' />
                <LightWhiteButton char='6' />
                <OperationButton char='*' />
            </Row>
            <Row className="g-2 mb-2">
                <DangerWhiteButton char='7' />
                <LightWhiteButton char='8' />
                <LightWhiteButton char='9' />
                <OperationButton char='+' />
            </Row>
            <Row className="g-2 mb-2">
                <Col xs={3}><Button variant="danger" className="w-100 push-button" style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => textArea.onNumberClick('0')}>0</Button></Col>
                <Col xs={3}><Button variant="light" className="w-100 push-button" style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => textArea.onNumberClick('.')}>.</Button></Col>
                <Col xs={3}><Button variant="light" className="w-100 push-button" style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => textArea.onDeleteClick()}>delete</Button></Col>
                <OperationButton char='-' />            </Row>
            <Row className="g-2 mb-2">
                <Col xs={9}><Button variant="light" className="w-100 push-button" style={{ backgroundColor: '#E5A93C', color: '#4A3525', border: 'none', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => textArea.handleCalculateClick()} disabled={isCalcualting} >=</Button></Col>
                <OperationButton char='^' />
            </Row>

            <Button
                onClick={onHistoryClick}
                className="push-button"
                disabled={isHistoryLoading}
                style={{
                    position: 'absolute',
                    top: '30px',
                    left: '15px',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',

                    background: 'linear-gradient(180deg, #D95D5D 0%, #A63F3F 100%)',
                    border: 'none',
                    boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.3), 0 4px 6px rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'transform 0.1s ease'
                }}
            >
            </Button>
        </>
    );
}
export default CalculatorGrid;