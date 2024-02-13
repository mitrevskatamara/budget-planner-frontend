import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {currencies, months, yearList} from "../../../utils";
import {useDispatch, useSelector} from "react-redux";
import {Form, Button, Container, Row, Col} from "react-bootstrap";
import {fetchUsers} from "../../../actions/userActions";

const initialState = {
    id: '',
    month: '',
    year: '',
    budget: '',
    currency: '',
    userId: ''
};

const BudgetFormForAdmin = (props) => {
    const [bud, setBud] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const id = props.id;
    const b = useSelector(state => state.budget.budgets.find((b) => b.id === Number(id)));
    const user = useSelector(state => state.user);
    const [errors, setErrors] = useState(initialState);

    useEffect(() => {
        if (id) {
            setBudgetWithValues();
        }
        dispatch(fetchUsers());
    }, [dispatch])

    const setBudgetWithValues = () => {
        setBud({
            id: id,
            month: b.month,
            year: b.year,
            budget: b.budget,
            currency: b.currency,
            userId: b.user.id
        });
    };

    const onChange = (event) => {
        setBud({
            ...bud,
            [event.target.name]: event.target.value
        });
        if (!!errors[event.target.name]) setErrors({
            ...errors,
            [event.target.name]: null
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
        } else {
            navigate("/admin", {
                state: {
                    location: location.pathname
                }
            });
            props.onSubmit(bud);
        }
    }

    const resetBudget = () => {
        setBud(initialState);
    }

    const findFormErrors = () => {
        const {budget, month, year, currency} = bud;
        const newErrors = {};
        if (!budget || budget === '') newErrors.budget = 'Please input a budget!'
        else if (!month || month === '') newErrors.month = 'Please select a month!'
        else if (!year || year === '') newErrors.year = 'Please select a year!'
        else if (!currency || currency === '') newErrors.currency = 'Please select a currency!'

        return newErrors;
    }

    const onCancel = () => {
        navigate("/admin", {
            state: {
                location: location.pathname
            }
        });
    };

    return (
        <Container>
            <br/>
            <Row className="justify-content-md-center">
                <Col xs={4}>
                    <h2 className="text-center">{props.id ? 'Update a budget' : 'Create a budget'}</h2>
                    <Form onReset={resetBudget}>
                        <Form.Group>
                            <Form.Label>User</Form.Label>
                            <Form.Control as="select" name="userId" value={bud.userId} onChange={onChange}
                            >
                                <option value="0" disabled>Select user</option>
                                {
                                    user.users.map(u => (
                                        <option key={u.id} value={u.id}>{u.username}</option>
                                    ))
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Budget</Form.Label>
                            <Form.Control type="number" name="budget" value={bud.budget} onChange={onChange}
                                          placeholder="Budget" isInvalid={!!errors.budget}/>
                            <Form.Control.Feedback type='invalid'>
                                {errors.budget}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Month</Form.Label>
                            <Form.Control as="select" name="month" value={bud.month} onChange={onChange}
                                          isInvalid={!!errors.month}>
                                <option value="0" disabled>Select month</option>
                                {
                                    months.map(month => (
                                        <option key={month.key} value={month.value}>{month.text}</option>
                                    ))
                                }
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {errors.month}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Year</Form.Label>
                            <Form.Control as="select" type="number" name="year" value={bud.year} onChange={onChange}
                                          isInvalid={!!errors.year}>
                                <option defaultValue disabled>Filter by year</option>
                                {
                                    yearList().map(year => (
                                        <option key={year.key} value={year.value}>{year.text}</option>
                                    ))
                                }
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>
                                {errors.year}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Currency</Form.Label>
                            <Form.Control as="select" name="currency" placeholder="Select currency"
                                          onChange={onChange} value={bud.currency} isInvalid={!!errors.currency}>
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
                        <hr/>
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
};

export default BudgetFormForAdmin;