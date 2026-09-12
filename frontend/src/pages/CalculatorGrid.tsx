import { Row, Col, Button } from 'react-bootstrap';

function CalculatorGrid(props: any) {
    const expression = props.expression;
    const setExpression = props.setExpression;
    const onCalculateClick = props.onCalculateClick;
    const isCalcualting = props.isCalculating;
    const isHistoryLoading = props.isHistoryLoading;
    const onHistoryClick = props.onHistoryClick;

    const onNumberClick = (symbol: string) => {
        setExpression(expression + symbol);
    };

    const onOperationClick = (oper: string) => {
        setExpression(expression + " " + oper + " ");
    };

    const onACClick = () => {
        setExpression("");
    };

    const onDeleteClick = () => {
        if (expression.endsWith(' ')) {
            setExpression(expression.slice(0, -3));
        } else {
            setExpression(expression.slice(0, -1));
        }
    };

    return (
        <>
        <Row className="g-2 mb-2">
            <Col xs={3}><Button variant="light" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onOperationClick('%')}>%</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onOperationClick('(')}>(</Button></Col>
            <Col xs={3}><Button variant="warning" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onOperationClick(')')}>)</Button></Col>
            <Col xs={3}><Button variant="danger" className="w-100 push-button"style={{ backgroundColor: '#E5A93C', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onACClick()}>AC</Button></Col>
        </Row>
        <Row className="g-2 mb-2">
            <Col xs={3}><Button variant="danger" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onNumberClick('1')}>1</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onNumberClick('2')} >2</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onNumberClick('3')} >3</Button></Col>
            <Col xs={3}><Button variant="warning" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }}onClick={() => onOperationClick('÷')}>÷</Button></Col>
        </Row>
        <Row className="g-2 mb-2">
            <Col xs={3}><Button variant="danger" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onNumberClick('4')}>4</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onNumberClick('5')}>5</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onNumberClick('6')}>6</Button></Col>
            <Col xs={3}><Button variant="warning" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }}onClick={() => onOperationClick('*')} >*</Button></Col>
        </Row>
        <Row className="g-2 mb-2">
            <Col xs={3}><Button variant="danger" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onNumberClick('7')}>7</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onNumberClick('8')}>8</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onNumberClick('9')}>9</Button></Col>
            <Col xs={3}><Button variant="warning" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }}onClick={() => onOperationClick('+')}>+</Button></Col>
        </Row>
        <Row className="g-2 mb-2">
            <Col xs={3}><Button variant="danger" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onNumberClick('0')}>0</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button" style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }}onClick={() => onNumberClick('.')}>.</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button" style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onDeleteClick()}>delete</Button></Col>
            <Col xs={3}><Button variant="warning" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onOperationClick('-')}>-</Button></Col>
        </Row>
        <Row className="g-2 mb-2">
            <Col xs={9}><Button variant="light" className="w-100 push-button" style={{ backgroundColor: '#E5A93C', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onCalculateClick()} disabled={isCalcualting} >=</Button></Col>
            <Col xs={3}><Button variant="warning" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => onOperationClick('^')}>^</Button></Col>
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