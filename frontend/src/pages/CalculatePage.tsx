import { Container, Form, Button, Row, Col, Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react'

function CalculatePage(props: any) {
    const isCalcualting = props.isCalcualting
    const result = props.result
    const history = props.history
    const onCalculate = props.onCalculate
    const onFetchHistory = props.onFetchHistory
    const [expression, setExpression] = useState('');
    const [isHistoryLoading, setHistory] = useState(false);
    const [showModal, setModal] = useState(false); 
    const handleButtonClickNumber = (symbol: string) => {
        setExpression(expression + symbol);
    };
    const handleButtonClickOperation = (oper: string) => {
        setExpression(expression + " " + oper + " ");
    };
    const handleButtonClickAC = () => {
        setExpression("");
    };
    const handleDeleteClick = () => {
        if (expression.endsWith(' ')) {
            setExpression(expression.slice(0, -3));
        } else {
            setExpression(expression.slice(0, -1));
        }
    };

    const handleCalculateClick = () => {
        if (!expression.trim()) {
            alert("Поле ввода пустое! Введите математическое выражение.");
            return;
        }

        onCalculate(expression);
    };

    const handleHistoryClick = async () =>{
        setHistory(true); 
        try {
            // Пинаем готовую функцию бэка, чтобы она обновила массив history в props
            await onFetchHistory(); 
            // Переключаем состояние: теперь окно должно открыться!
            setModal(true); 
            } catch (error) {
                alert("Не удалось получить историю с сервера");
            } finally {
                // Разблокируем кнопку
                setHistory(false); 
        }
    }

    useEffect(() => {
    if (result !== undefined && result !== null) {
            setExpression(String(result));
        }
    }, [result]);

    const buttonStyles = (
    <style>{`
        .push-button:active {
        transform: translateY(2px) !important; /* Сдвигаем кнопку вниз на 2 пикселя */
        box-shadow: inset 0 2px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.3) !important; /* Делаем тень плоской */
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
                    value={expression} 
                    disabled={isCalcualting} 
                    className="text-end fs-4"
                    style={{boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)'}}
                />
            </Form.Group>

        <Row className="g-2 mb-2">
            <Col xs={3}><Button variant="light" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleButtonClickOperation('%')}>%</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleButtonClickOperation('(')}>(</Button></Col>
            <Col xs={3}><Button variant="warning" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleButtonClickOperation(')')}>)</Button></Col>
            <Col xs={3}><Button variant="danger" className="w-100 push-button"style={{ backgroundColor: '#E5A93C', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleButtonClickAC()}>AC</Button></Col>
        </Row>
        <Row className="g-2 mb-2">
            <Col xs={3}><Button variant="danger" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleButtonClickNumber('1')}>1</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleButtonClickNumber('2')} >2</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleButtonClickNumber('3')} >3</Button></Col>
            <Col xs={3}><Button variant="warning" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }}onClick={() => handleButtonClickOperation('÷')}>÷</Button></Col>
        </Row>
        <Row className="g-2 mb-2">
            <Col xs={3}><Button variant="danger" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleButtonClickNumber('4')}>4</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleButtonClickNumber('5')}>5</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleButtonClickNumber('6')}>6</Button></Col>
            <Col xs={3}><Button variant="warning" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }}onClick={() => handleButtonClickOperation('*')} >*</Button></Col>
        </Row>
        <Row className="g-2 mb-2">
            <Col xs={3}><Button variant="danger" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleButtonClickNumber('7')}>7</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleButtonClickNumber('8')}>8</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleButtonClickNumber('9')}>9</Button></Col>
            <Col xs={3}><Button variant="warning" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }}onClick={() => handleButtonClickOperation('+')}>+</Button></Col>
        </Row>
        <Row className="g-2 mb-2">
            <Col xs={3}><Button variant="danger" className="w-100 push-button"style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleButtonClickNumber('0')}>0</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button" style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }}onClick={() => handleButtonClickNumber('.')}>.</Button></Col>
            <Col xs={3}><Button variant="light" className="w-100 push-button" style={{ backgroundColor: '#E8DFFF', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleDeleteClick()}>delete</Button></Col>
            <Col xs={3}><Button variant="warning" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleButtonClickOperation('-')}>-</Button></Col>
        </Row>
        <Row className="g-2 mb-2">
            <Col xs={9}><Button variant="light" className="w-100 push-button" style={{ backgroundColor: '#E5A93C', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleCalculateClick()} disabled={isCalcualting} >=</Button></Col>
            <Col xs={3}><Button variant="warning" className="w-100 push-button" style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none',boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.3)' }} onClick={() => handleButtonClickOperation('^')}>^</Button></Col>
        </Row>

        <Button
        onClick={handleHistoryClick} // Привязываем функцию вызова истории
        className="push-button"
        disabled={isHistoryLoading || isCalcualting} // Блокируем по ТЗ
        style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
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
        {buttonStyles}

        <Modal show={showModal} onHide={() => setModal(false)} centered>
            <Modal.Header closeButton style={{ backgroundColor: '#9ce7e5', color: '#3d2314', borderBottom: '1px solid #3d2314' }}>
                <Modal.Title className="fs-5">История вычислений</Modal.Title>
            </Modal.Header>
            
            <Modal.Body style={{ backgroundColor: '#9ce7e5', color: '#3d2314' }}>
                Здесь скоро будут прямоугольники с выражениями из базы данных...
            </Modal.Body>
        </Modal>
        </Container>
    )
}


export default CalculatePage