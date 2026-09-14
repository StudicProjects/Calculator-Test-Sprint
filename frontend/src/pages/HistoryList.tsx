import { Row, Col, Button } from 'react-bootstrap';

function HistoryList(props: any) {
    const records = props.records;
    const onItemClick = props.onItemClick;

    if (!records || records.length === 0 || !records[0] || records[0].length === 0) {
        return <p 
        className="text-center my-4" 
        style={{ 
            color: '#4A3525', 
            fontSize: '1.4rem',
            fontWeight: 'bold',
            letterSpacing: '1px'
        }}
    >История вычислений пока пуста</p>;
    }

    return (
        <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }}>
            {records.map((item: [string, string], index: number) => {
                const expressionText = item[0];
                const resultText = item[1];

                return (
                    <div 
                        key={index}
                        className="p-2 mb-2 rounded border" 
                        style={{ 
                            backgroundColor: '#FFFFFF', 
                            borderColor: '#90CAF9',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                    >          
                        <Row className="g-2 align-items-center">
                            <Col xs={8}>
                                <Button 
                                    className="w-100 text-start push-button text-truncate"
                                    style={{ backgroundColor: '#A3BCA9', color: '#4A3525', border: 'none', fontSize: '0.9rem' }}
                                    onClick={() => onItemClick(expressionText)}
                                >
                                    {expressionText}
                                </Button>
                            </Col>
                            
                            <Col xs={4}>
                                <Button 
                                    className="w-100 text-center push-button text-truncate"
                                    style={{ backgroundColor: '#64B5F6', color: '#4A3525', border: 'none', fontWeight: 'bold' }}
                                    onClick={() => onItemClick(resultText)}
                                >
                                    = {resultText}
                                </Button>
                            </Col>
                        </Row>
                    </div>
                );
            })}
        </div>
    );
}
export default HistoryList