import {Form, Button, Container, Row, Col} from "react-bootstrap";
import {fetchCategories} from "../../actions/categoryActions";
import {useDispatch, useSelector} from "react-redux";
import {currencies, types} from "../../utils";
import Moment from "moment";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

const TransactionForm = (props) => {
    const auth = useSelector(state=>state.auth);
    const initialState = {
        id: 0,
        name: '',
        amount: 1,
        type: '',
        date: Moment().format('YYYY-MM-DD'),
        categoryId: '',
        currency: '',
        username: auth.user.username
    };
    const initialStateErrors = {
        id: 0,
        name: '',
        amount: '',
        type: '',
        date: '',
        categoryId: '',
        currency: '',
        username: auth.user.username
    };

    const [transaction, setTransaction] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const category = useSelector(state => state.category);
    const id = props.id;
    const tr = useSelector(state => state.transaction.transactions.find((t) => t.id === Number(id)));
    const [errors, setErrors] = useState(initialStateErrors);

    const setTransactionWithValues = () => {
        setTransaction({
            id: id,
            name: tr.name,
            type: tr.transactionType.type,
            amount: tr.amount,
            categoryId: tr.transactionType.category.id,
            date: formatDate(tr.date),
            currency: tr.currency,
            username: auth.user.username
        })
    };

    useEffect(() => {
        if (id) {
            setTransactionWithValues();
        }
        findAllCategories();
    }, [dispatch])

    const resetTransaction = () => {
        setTransaction(initialState);
    }

    const findAllCategories = () => {
        dispatch(fetchCategories());
        setTimeout(() => {
            const categoryList = category.categories.map(c => {
                return {value: c.id, key: c.id, text: c.name}
            });
            setCategories(categoryList);
        }, 100)
    };

    const formatDate = (date) => {
        return Moment(date).format('yyyy-MM-DD');
    };

    const onChange = (event) => {
        setTransaction({
            ...transaction,
            [event.target.name]: event.target.value
        });
        if (!!errors[event.target.name]) setErrors({
            ...errors,
            [event.target.name]: null
        })
    };

    const onSubmit = (e) => {
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            props.onSubmit(transaction);
            navigate("/transactions")
        }
    }

    const onCancel = () => {
        navigate("/transactions")
    };

    const findFormErrors = () => {
        const {name, type, date, categoryId, amount, currency} = transaction;
        const newErrors = {};

        if (!name || name === '') newErrors.name = 'Please input a transaction name!'
        else if (!type || type === '') newErrors.type = 'Please select a transaction type!'
        else if (!amount || amount === '') newErrors.amount = 'Please input an amount!'
        else if (!currency || currency === '') newErrors.currency = 'Please select a currency!'
        else if (!categoryId || categoryId === '') newErrors.categoryId = 'Please select a category!'
        else if (!date || date === '') newErrors.date = 'Please select a transaction date!'

        return newErrors;
    }

    return (
        <Container style={{
            marginTop: '20px',
            height: '590px',
            width: '500px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '5px',
            paddingLeft: '40px',
            paddingRight: '40px',
        }}>
            <br/>
            <h2 className="text-center">{props.id ? "Update a transaction" : "Create a new transaction"}</h2>
            <Row className="justify-content-md-center">
                <Col>
                    <Form onReset={resetTransaction}>
                        <Form.Group>
                            <Form.Label>Transaction name</Form.Label>
                            <Form.Control type="text" name="name" value={transaction.name} onChange={onChange}
                                          placeholder="Transaction name"/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Transaction type</Form.Label>
                            <Form.Control as="select" name="type" placeholder="Select type"
                                          onChange={onChange} value={transaction.type} isInvalid={!!errors.type}>
                                <option value="" disabled>Select type</option>
                                {
                                    types.map(type => (
                                        <option key={type.key} value={type.value}>{type.text}</option>
                                    ))
                                }
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {errors.type}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" value={transaction.amount} name="amount" placeholder="Amount"
                                          onChange={onChange} isInvalid={!!errors.amount}/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.amount}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Currency</Form.Label>
                            <Form.Control as="select" name="currency" placeholder="Select currency"
                                          onChange={onChange} value={transaction.currency} isInvalid={!!errors.currency}>
                                <option value="" disabled>Select currency</option>
                                {
                                    currencies.map(currency => (
                                        <option key={currency.key} value={currency.value}>{currency.text}</option>
                                    ))
                                }
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {errors.currency}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" name="categoryId" value={transaction.categoryId}
                                          onChange={onChange} isInvalid={!!errors.categoryId}>
                                <option value="" disabled>Select category</option>
                                {
                                    categories.map(category => (
                                        <option key={category.key} value={category.value}>{category.text}</option>
                                    ))
                                }
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {errors.categoryId}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Transaction date</Form.Label>
                            <Form.Control type="date" name="date" value={formatDate(transaction.date)}
                                          onChange={onChange} isInvalid={!!errors.date}/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.date}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br/>
                    </Form>
                </Col>
                <Col className="col-md-12 text-center">
                    <Button size="lg" className="custom-button-create" type="submit" onClick={onSubmit}>
                        {props.id ? "Update" : "Save"}
                    </Button>&nbsp;
                    <Button size="lg" variant="outline-secondary" onClick={onCancel}>Cancel</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default TransactionForm;