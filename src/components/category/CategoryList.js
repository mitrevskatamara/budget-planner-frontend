import {Button, Col, Container, Row} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import pagination from "../pagination";
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteCategory, fetchCategories} from "../../actions/categoryActions";
import {useNavigate} from "react-router";
import {actionsFormatter, indexFormatter} from "../formatters";

const CategoryList = () => {
    const dispatch = useDispatch();
    const category = useSelector(state => state.category);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const {SearchBar} = Search;

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    const defaultSorted = [{
        dataField: 'name',
        order: 'desc'
    }];

    const categoryEdit = (id) => {
        navigate('/categories/update/' + id)
    }
    const categoryDelete = (id) => {
        dispatch(deleteCategory(id));
    }

    const [id, setId] = useState('');

    const columns = [
        {dataField: 'id', text: 'Id', hidden: true},
        {dataField: 'number', text: 'No.', formatter: (cell, row, rowIndex) => indexFormatter(cell, row, rowIndex), headerStyle: {width: "45px"}},
        {dataField: 'name', text: 'Name', sort: true},
        {dataField: 'actions', text: 'Actions', formatter: () => actionsFormatter({show, name: "category"}),
            events: {
                onClick: (e, column, columnIndex, row) => {
                    if (e.target.id === 'editButton') {
                        categoryEdit(row.id)
                    } else if (e.target.id === 'deleteButton') {
                        setShow(true)
                        setId(row.id);
                    } else if (e.target.id === 'yesButton') {
                        categoryDelete(id);
                        setShow(false);
                    } else if (e.target.id === 'cancelButton') {
                        setShow(false);
                    }
                },
            }
        }
    ];

    return (
        <Container>
            <br/>
            <ToolkitProvider bootstrap4 keyField="id" data={category.categories} columns={columns} search>
                {
                    props => (
                        <div>
                            <Row>
                                <Col xs={2}>
                                    <SearchBar className="search-label" { ...props.searchProps } />
                                </Col>

                                <Col xs={2}>
                                    <Button className="custom-button-create" onClick={() => navigate('/categories/create')}>
                                        Create category
                                    </Button>
                                </Col>
                            </Row>
                            <hr/>
                            <BootstrapTable striped hover defaultSorted={defaultSorted} pagination={pagination}
                                            { ...props.baseProps } />
                        </div>
                    )
                }
            </ToolkitProvider>
        </Container>
    )
};

export default CategoryList;