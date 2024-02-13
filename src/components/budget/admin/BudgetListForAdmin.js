import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {fetchBudgets, deleteBudget, filterByMonthAndYear} from "../../../actions/budgetActions";
import {months, yearList} from "../../../utils";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import ToolkitProvider, {Search, CSVExport} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import '../../assets/css/budgetList.css';
import pagination from "../../pagination";
import {actionsFormatter, indexFormatter, userFormatter} from "../../formatters";

const filterDto = {
    month: '',
    year: '',
    username: ''
};

const BudgetListForAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const budget = useSelector(state => state.budget);
    const user = useSelector(state => state.user);
    const [filter, setFilter] = useState(filterDto);
    const [show, setShow] = useState(false);
    const {SearchBar} = Search;
    const { ExportCSVButton } = CSVExport;

    useEffect(() => {
        dispatch(fetchBudgets());
    }, [dispatch]);

    const budgetDelete = (id) => {
        dispatch(deleteBudget(id));
    };

    const budgetEdit = (id) => {
        navigate("/admin/budgets/update/" + id);
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
        dispatch(fetchBudgets());
    };

    const onClickCreateButton = () => {
        navigate("/admin/budgets/create");
    };

    const defaultSorted = [{
        dataField: 'year',
        order: 'desc'
    }];

    const [id, setId] = useState('');

    const columns = [
        {dataField: 'id', text: 'Id', hidden: true, csvExport: false},
        {dataField: 'number', text: 'No.', formatter: (cell, row, rowIndex) => indexFormatter(cell, row, rowIndex), headerStyle: {width: "45px"}, csvExport: false},
        {dataField: 'user.username', text: 'User', sort: true, formatter: (cell, row) => userFormatter(cell, row)},
        {dataField: 'month', text: 'Month', sort: true,
            sortFunc: (a, b, order, dataField) => {
                let months = ["january", "february", "march", "april", "may", "june",
                    "july", "august", "september", "october", "november", "december"];
                if (order === 'asc') {
                    return months.indexOf(a.toString().toLowerCase()) - months.indexOf(b.toString().toLowerCase());
                }
                return months.indexOf(b.toString().toLowerCase()) - months.indexOf(a.toString().toLowerCase());
            }
        },
        {dataField: 'year', text: 'Year', sort: true},
        {dataField: 'budget', text: 'Monthly budget', sort: true},
        {dataField: 'balance', text: 'Current balance', sort: true},
        {dataField: 'currency', text: 'Currency', sort: false},
        {dataField: 'actions', text: 'Actions', csvExport: false, formatter: () => actionsFormatter({show}),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    if (e.target.id === 'editButton') {
                        budgetEdit(row.id)
                    } else if (e.target.id === 'deleteButton') {
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
        <Container>
            <br/>
            <ToolkitProvider bootstrap4 keyField="id" data={budget.budgets} columns={columns} search>
                {
                    props => (
                        <div>
                            <Row>
                                <Col xs={2}>
                                    <SearchBar className="search-label" { ...props.searchProps } />
                                </Col>
                                <Col xs={1}>
                                    <Form>
                                        <Form.Control className="form-inline" as="select" name="username"
                                                      value={filter.username}
                                                      onChange={onFilterChange}>
                                            <option value="" disabled>USER</option>
                                            {
                                                user.users.map(u => (
                                                    <option key={u.id} value={u.username}>{u.username}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Form>
                                </Col>
                                <Col xs={1}>
                                    <Form>
                                        <Form.Control className="form-inline" as="select" name="month"
                                                      value={filter.month}
                                                      onChange={onFilterChange}>
                                            <option value="" disabled>MONTH</option>
                                            {
                                                months.map(month => (
                                                    <option key={month.key} value={month.value}>{month.text}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Form>
                                </Col>
                                <Col xs={1}>
                                    <Form>
                                        <Form.Control as="select" name="year" value={filter.year}
                                                      onChange={onFilterChange}>
                                            <option value="" disabled>YEAR</option>
                                            {
                                                yearList().map(year => (
                                                    <option key={year.key} value={year.value}>{year.text}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Form>
                                </Col>
                                <Col>
                                    <Button variant="outline-primary" onClick={filterBudgetsByMonthAndYear}>
                                        Filter</Button>&nbsp;

                                    <Button onClick={clearFilter} variant="outline-secondary">
                                        Clear
                                    </Button>
                                </Col>

                                <Col xs={1}>
                                    <Button variant="outline-primary" onClick={onClickCreateButton}>Create
                                    </Button>
                                </Col>
                            </Row>
                            <hr/>
                            <BootstrapTable striped hover defaultSorted={defaultSorted} pagination={pagination}
                                            { ...props.baseProps } />
                            <Row>
                                <Col>
                                    <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                                </Col>
                            </Row>
                            <br/>
                        </div>
                    )
                }
            </ToolkitProvider>
        </Container>
    )
}

export default BudgetListForAdmin;