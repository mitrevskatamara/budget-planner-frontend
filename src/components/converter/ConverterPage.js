import {Button, Col, Container, Form, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";
import {getCurrency} from "../../actions/converterActions";
import {getStompClient} from "../../ws/stopmClient";
import {OPEN_EXCHANGE_RATES_API_URL} from "../../utils";
import '../assets/css/converterForm.css';

const initialState = {
    toCurrency: ''
};

const is = {
    currencyCode: '',
    exchangeRate: ''
}

const ConverterPage = () => {
    const [exchangeRates, setExchangeRates] = useState(null);

    const [convert, setConvert] = useState(initialState);
    const dispatch = useDispatch();
    const [message, setMessage] = useState(is);
    const [amount, setAmount] = useState(1);
    const [buttonClicked, setButtonClicked] = useState(false); // New state variable

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get(OPEN_EXCHANGE_RATES_API_URL);
                if (response.status === 200) {
                    setExchangeRates(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetchCurrencies();
    }, []);

    const onClick = () => {
        setButtonClicked(true);
        dispatch(getCurrency(convert.toCurrency));
        setMessage('');
    }

    useEffect(() => {
        if (buttonClicked) {
            const stompClient = getStompClient();

            stompClient.connect({}, () => {
                console.log('WebSocket connected');

                stompClient.subscribe('/topic/converter', (frame) => {
                    const receivedMessage = JSON.parse(frame.body);
                    const user = JSON.parse(localStorage.getItem('user'));

                    if (user.id.toString() === receivedMessage.userId) {
                        setMessage(receivedMessage);
                    }
                });
            });

            return () => {
                stompClient.disconnect();
                console.log('WebSocket disconnected');
            };
        }

    }, [buttonClicked]);

    const onChange = (event) => {
        const { name, value } = event.target;

        setConvert((prevConvert) => ({
            ...prevConvert,
            [name]: name === 'amount' ? Number(value) : value,
        }));
    };

    const onAmountChange = (event) => {
        setAmount(event.target.value)
    }

    const findCurrencyEntry = (specificCurrencyCode) => {
        const currencyEntry = Object.entries(exchangeRates).find(([currencyCode, currencyDescription]) => {
            return currencyCode === specificCurrencyCode;
        });

        return currencyEntry || null;
    };

    const currencyEntry = message.currencyCode ? findCurrencyEntry(message.currencyCode) : null;

    return (
        <Container className="converter-container">
            <h3 style={{marginBottom: '20px'}}>Currency converter</h3>
            <Row>
                <Col xs={4}>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="text" name="amount" value={amount} onChange={onAmountChange} min={1}/>
                </Col>
                <Col xs={4}>
                    <Form.Label>From</Form.Label>
                    <Form.Control as="select" name="from">
                        <option>USD - United States Dollar</option>
                    </Form.Control>
                </Col>
                <Col xs={4}>
                    <Form.Label>To</Form.Label>
                    <Form.Control className="form-inline" as="select" name="toCurrency" onChange={onChange}
                                  value={convert.toCurrency}>
                        <option value="" disabled></option>
                        {exchangeRates ? (
                                Object.entries(exchangeRates).map(([currencyCode, currencyDescription]) => (
                                    <option key={currencyCode}
                                            value={currencyCode}>{currencyCode} - {currencyDescription}</option>
                                )))
                            : (
                                ''
                            )
                        }
                    </Form.Control>
                </Col>
            </Row>
            <Row style={{marginTop: '20px'}}>
                <Col xs={4}></Col>
                <Col xs={4}></Col>
                <Col xs={4}>
                    <Button className="custom-button-create" style={{width: '100%'}}
                            onClick={onClick}>Convert</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <label>
                        {
                            message.exchangeRate ? (
                                <p>1 USD = {message.exchangeRate} {message.currencyCode}</p>) : ''
                        }
                    </label>
                </Col>
            </Row>
            <Row>
                <Col>
                    {
                        message.exchangeRate ? (
                            <div>
                                <h5>{amount} USD = </h5>
                                <div style={{display: 'flex'}}>
                                    <h3>{message.exchangeRate * amount}</h3>&nbsp;&nbsp;&nbsp;
                                    <h3 className="currency-color">{currencyEntry[0]} - {currencyEntry[1]}</h3>
                                </div>
                            </div>

                        ) : ''
                    }
                </Col>
            </Row>
        </Container>
    )

}

export default ConverterPage;