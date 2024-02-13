import {Form, Button, Container, Row, Col} from "react-bootstrap";
import {fetchCategories} from "../../../actions/categoryActions"
import {useDispatch, useSelector} from "react-redux";
import {types} from "../../../utils";
import Moment from "moment";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {fetchUsers} from "../../../actions/userActions";

const initialState = {
    id: 0,
    name: '',
    amount: '',
    type: '',
    date: '',
    categoryId: '',
    userId: ''
};

const TransactionFormForAdmin = (props) => {
    const [transaction, setTransaction] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);
    const navigate = useNavigate();
    const id = props.id;
    const tr = useSelector(state => state.transaction.transactions.find((t) => t.id === Number(id)));
    const [errors, setErrors] = useState(initialState);
    const user = useSelector(state => state.user);
    const location = useLocation();

    const setTransactionWithValues = () => {
        setTransaction({
            id: id,
            name: tr.name,
            type: tr.transactionType.type,
            amount: tr.amount,
            categoryId: tr.transactionType.category.id,
            date: formatDate(tr.date),
            userId: tr.user
        })
    };

    useEffect(() => {
        if (id) {
            setTransactionWithValues();
        }
        findAllCategories();
        dispatch(fetchUsers());
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
            navigate("/admin", {
                state: {
                    location: location.pathname
                }
            });
            props.onSubmit(transaction);
        }
    }

    const onCancel = () => {
        navigate("/admin", {
            state: {
                location: location.pathname
            }
        });
    };

    const findFormErrors = () => {
        const {name, type, date, categoryId, amount} = transaction;
        const newErrors = {};

        if (!name || name === '') newErrors.name = 'Please input a transaction name!'
        else if (!type || type === '') newErrors.type = 'Please select a transaction type!'
        else if (!amount || amount === '') newErrors.amount = 'Please input an amount!'
        else if (!categoryId || categoryId === '') newErrors.categoryId = 'Please select a category!'
        else if (!date || date === '') newErrors.date = 'Please select a transaction date!'

        return newErrors;
    }

    return (
        <Container>
            <br/>
            <h2 className="text-center">{props.id ? "Update a transaction" : "Create a new transaction"}</h2>
            <Row className="justify-content-md-center">
                <Col xs={5}>
                    <Form onReset={resetTransaction}>
                        <Form.Group>
                            <Form.Label>User</Form.Label>
                            <Form.Control as="select" name="userId" value={transaction.userId} onChange={onChange}>
                                <option value="0" disabled>Select user</option>
                                {
                                    user.users.map(u => (
                                        <option key={u.id} value={u.id}>{u.username}</option>
                                    ))
                                }
                            </Form.Control>
                        </Form.Group>
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
                                <option value="0" disabled>Select type</option>
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
                            <Form.Label>Amount (EUR)</Form.Label>
                            <Form.Control type="number" value={transaction.amount} name="amount" placeholder="Amount"
                                          onChange={onChange} isInvalid={!!errors.amount}/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.amount}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" name="categoryId" value={transaction.categoryId}
                                          onChange={onChange} isInvalid={!!errors.categoryId}>
                                <option value="0" disabled>Select category</option>
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
                    <Button size="lg" variant="success" type="submit" onClick={onSubmit}>
                        {props.id ? "Update" : "Save"}
                    </Button>&nbsp;
                    <Button size="lg" variant="outline-secondary" onClick={onCancel}>Cancel</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default TransactionFormForAdmin;