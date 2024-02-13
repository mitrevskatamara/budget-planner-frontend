import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router";

const initialState = {
    id: '',
    name: ''
}
const CategoryForm = (props) => {
    const [category, setCategory] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const id = props.id;
    const c = useSelector(state => state.category.categories.find((cat) => cat.id === Number(id)));

    useEffect(() => {
        if(id) {
            setCategoryWithValues();
        }
    }, [dispatch]);

    const setCategoryWithValues = () => {
        setCategory({
            id: c.id,
            name: c.name
        })
    }

    const onChange = (event) => {
        setCategory({
            ...category,
            [event.target.name]: event.target.value
        });
    }

    const onSubmit = () => {
        navigate("/admin",
            {state: {
                    location: location.pathname
                }}
        );
        props.onSubmit(category);
    }

    const onCancel = () => {
        navigate("/admin",
            {state: {
                location: location.pathname
            }}
        );
    };

    const resetForm = () => {
        setCategory(initialState)
    }

    return (
        <Container>
            <h2 className="text-center">{id ? 'Update a category' : 'Create a category'}</h2><br/>
            <Row className="justify-content-md-center">
                <Col xs={3}>
                    <Form onReset={resetForm}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={category.name} onChange={onChange} placeholder="Name"/>
                        </Form.Group>
                    </Form>
                    <hr/>
                </Col>
                <Col className="col-md-12 text-center">
                    <Button className="custom-button-create" type="submit" onClick={onSubmit}>
                        {id ? "Update" : "Save"}
                    </Button>&nbsp;
                    <Button variant="outline-secondary" onClick={onCancel}>Cancel</Button>
                </Col>
            </Row>
        </Container>
    )
}
export default CategoryForm;