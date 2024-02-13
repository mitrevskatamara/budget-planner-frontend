import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {deleteBudget, filterByMonthAndYear, fetchBudgetsByUser} from "../../actions/budgetActions";
import {months, yearList} from "../../utils";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import ToolkitProvider, {Search,CSVExport} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import '../assets/css/budgetList.css';
import pagination from "../pagination";
import {actionsFormatter, indexFormatter} from "../formatters";
import {ERROR_SET_FALSE} from "../../actions/types";

const BudgetList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector(state => state.auth);
    const filterDto = {
        month: '',
        year: '',
        username: auth.user.username
    };
    const budget = useSelector(state => state.budget);
    const [filter, setFilter] = useState(filterDto);
    const [show, setShow] = useState(false);
    const {SearchBar} = Search;
    const { ExportCSVButton } = CSVExport;
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        dispatch(fetchBudgetsByUser(filter));
    }, [dispatch, fetchBudgetsByUser, filter]);

    // useEffect(() => {
    //     if (budget.error) {
    //         navigate('/error');
    //         dispatch({
    //             type: ERROR_SET_FALSE
    //         })
    //     }
    // }, [dispatch, navigate, budget.error]);


    const budgetDelete = (id) => {
        dispatch(deleteBudget(id));
    };

    const budgetEdit = (id) => {
        navigate("/budgets/update/" + id);
    }

    const onFilterChange = (event) => {
        setFilter({
            ...filter,
            [event.target.name]: event.target.value
        });
    };

    const filterBudgetsByMonthAndYear = () => {
        dispatch(filterByMonthAndYear(filter));
    }

    const clearFilter = () => {
        setFilter(filterDto);
        dispatch(fetchBudgetsByUser(filter));
    };

    const onClickCreateButton = () => {
        navigate("/budgets/create")
    };

    const defaultSorted = [{
        dataField: 'year',
        order: 'desc'
    }];

    const [id, setId] = useState('');

    const columns = [
        {dataField: 'id', text: 'Id', hidden: true, csvExport: false},
        {dataField: 'number', text: 'No.', formatter: (cell, row, rowIndex) => indexFormatter(cell,row, rowIndex), headerStyle: {width: "45px"}, csvExport: false},
        {dataField: 'month', text: 'Month', sort: true,
            sortFunc: (a, b, order, dataField) => {
                let months = ["january", "february", "march", "april", "may", "june",
                    "july", "august", "september", "october", "november", "december"];
                if (order === 'asc') {
                    return months.indexOf(a.toString().toLowerCase()) - months.indexOf(b.toString().toLowerCase());
                }
                return months.indexOf(b.toString().toLowerCase()) - months.indexOf(a.toString().toLowerCase());

            }},
        {dataField: 'year', text: 'Year', sort: true},
        {dataField: 'budget', text: 'Initial budget', sort: true},
        {dataField: 'balance', text: 'Current balance', sort: true},
        {dataField: 'currency', text: 'Currency', headerStyle: {width: "120px"}, sort: false},
        {dataField: 'actions', text: 'Actions', headerStyle: {width: "90px"}, csvExport: false, formatter: () => actionsFormatter({show, name: "budget"}),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    if (e.target.id === 'editImg') {
                        budgetEdit(row.id)
                    } else if (e.target.id === 'deleteImg') {
                        setShow(true)
                        setId(row.id);
                    } else if (e.target.id === 'yesButton') {
                        budgetDelete(id);
                        setShow(false);
                    } else if (e.target.id === 'cancelButton') {
                        setShow(false);
                    }
                },
            }
        }];

    return (
        <Container className="budget-list-container">
            <div style={{marginLeft: '15px', marginRight: '15px'}}>
                <h3 style={{marginBottom: '13px', marginTop: '15px'}}>Budgets</h3>
                <ToolkitProvider bootstrap4 keyField="id" data={budget.budgets} columns={columns} search>
                    {
                        props => (
                            <div>
                                <Row>
                                    <Col xs={6} md={2}>
                                        <SearchBar className="search-label" {...props.searchProps} />
                                    </Col>
                                    <Col xs={6} md={2}>
                                        <Button onClick={() => setShowFilters(!showFilters)}
                                                variant="outline-secondary">
                                            {
                                                showFilters ? 'Hide filters' : 'Filters'
                                            }
                                        </Button>
                                    </Col>
                                    <Col xs={6} md={5}>
                                        <ExportCSVButton {...props.csvProps}>Export CSV</ExportCSVButton>
                                    </Col>
                                    <Col xs={6} md={3} className="d-flex justify-content-end">
                                        <Button className="custom-button-create" onClick={onClickCreateButton}>
                                            Create new budget
                                        </Button>
                                    </Col>
                                </Row>
                                <Row hidden={!showFilters} style={{marginTop: '10px'}}>
                                    <Col xs={1}>
                                        <Form.Control style={{width: "100px"}} className="form-inline" as="select"
                                                      name="month" value={filter.month}
                                                      onChange={onFilterChange}>
                                            <option value="" disabled>Month</option>
                                            {
                                                months.map(month => (
                                                    <option key={month.key} value={month.value}>{month.text}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    &nbsp; &nbsp; &nbsp;
                                    <Col xs={1}>
                                        <Form.Control as="select" name="year" value={filter.year}
                                                      onChange={onFilterChange}>
                                            <option value="" disabled>Year</option>
                                            {
                                                yearList().map(year => (
                                                    <option key={year.key} value={year.value}>{year.text}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Button variant="outline-primary" onClick={filterBudgetsByMonthAndYear}>
                                            Filter</Button>&nbsp;

                                        <Button type="reset" value="Reset" onClick={clearFilter}
                                                variant="outline-secondary">
                                            Clear
                                        </Button>
                                    </Col>
                                </Row>
                                <hr/>
                                <BootstrapTable bordered={false} rowStyle={{backgroundColor: 'white'}} striped hover
                                                defaultSorted={defaultSorted} pagination={pagination}
                                                {...props.baseProps} />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>

        </Container>
    )
}

export default BudgetList;