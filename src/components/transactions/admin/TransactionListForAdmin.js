import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {
    filterByYearAndMonth,
    deleteTransaction, fetchTransactions, filterByDate
} from "../../../actions/transactionActions";
import {months, types, yearList} from "../../../utils";
import {Container, Button, Form, Col, Row} from "react-bootstrap";
import ToolkitProvider, {Search, CSVExport} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import '../../assets/css/transactionList.css';
import pagination from "../../pagination";
import {actionsFormatter, dateFormatter, indexFormatter, userFormatter} from "../../formatters";

const filterDto = {
    year: '',
    month: '',
    username: '',
    type: ''
};

const TransactionListForAdmin = () => {
    const dispatch = useDispatch();
    const transaction = useSelector(state => state.transaction);
    const user = useSelector(state => state.user);
    const [filter, setFilter] = useState(filterDto);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const transactionDelete = (id) => {
        dispatch(deleteTransaction(id));
    };

    const transactionEdit = (id) => {
        navigate('/admin/transactions/update/' + id);
    };

    const onFilterChange = (event) => {
        setFilter({
            ...filter,
            [event.target.name]: event.target.value
        });
    }

    const filterTransactionsByYearAndMonth = () => {
        dispatch(filterByYearAndMonth(filter));
    };

    const clearFilter = () => {
        setFilter(filterDto);
        dispatch(fetchTransactions());
    };

    const onClickCreateButton = () => {
        navigate("/admin/transactions/create");
    }

    const onDateChange = (event) => {
        setTimeout(() => {
            dispatch(filterByDate('admin', event.target.value))
        }, 1500)
    };

    const {SearchBar} = Search;
    const { ExportCSVButton } = CSVExport;

    const columns = [
        {dataField: 'id', text: 'Id', hidden: true, csvExport: false},
        {dataField: 'number', text: 'No.', csvExport: false, formatter: (cell, row, rowIndex) => indexFormatter(cell, row, rowIndex), headerStyle: {width: "45px"}},
        {dataField: 'user.username', text: 'User', sort: true, formatter: (cell, row) => userFormatter(cell, row)},
        {dataField: 'name', text: 'Transaction name', sort: true},
        {dataField: 'transactionType.type', text: 'Transaction type', sort: true},
        {dataField: 'amount', text: 'Amount', sort: true},
        {dataField: 'currency', text: 'Currency', sort: false},
        {dataField: 'date', text: 'Date', sort: true, formatter: (cell, row) => dateFormatter(cell)},
        {dataField: 'transactionType.category.name', text: 'Category', sort: true},
        {
            dataField: 'edit', text: 'Actions', csvExport: false, formatter: () => actionsFormatter({ name: "transaction"}),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    if (e.target.id === 'editButton') {
                        transactionEdit(row.id)
                    } else if (e.target.id === 'deleteButton') {
                        setShow(true)
                    } else if (e.target.id === 'yesButton') {
                        transactionDelete(row.id);
                        setShow(false);
                    } else if (e.target.id === 'cancelButton') {
                        setShow(false);
                    }
                },
            }
        }];


    const defaultSorted = [{
        dataField: 'date',
        order: 'desc'
    }];

    return (
        <Container style={{height: "2000px"}}>
            <br/>
            <ToolkitProvider bootstrap4 keyField="id" data={transaction.transactions} columns={columns} search exportCSV>
                {
                    props => (
                        <div>
                            <Row>
                                <Col xs={2}>

                                    <SearchBar className="search-label" {...props.searchProps} />
                                </Col>
                                <Col xs={2}>
                                    <Form.Group>
                                        <Form.Control type="date" name="date" onChange={onDateChange}/>
                                    </Form.Group>
                                </Col>
                                <Col xs={1}>
                                    <Form>
                                        <Form.Control className="form-inline" as="select" name="username" value={filter.username}
                                                      onChange={onFilterChange}>
                                            <option value="" disabled={true}>USER</option>
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
                                        <Form.Control className="form-inline" as="select" name="month" value={filter.month}
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
                                <Col xs={1}>
                                    <Form>
                                        <Form.Control as="select" name="type" value={filter.type}
                                                      onChange={onFilterChange}>
                                            <option value="" disabled>TYPE</option>
                                            {
                                                types.map(type => (
                                                    <option key={type.key} value={type.value}>{type.text}</option>
                                                ))
                                            }
                                        </Form.Control>
                                    </Form>
                                </Col>
                                <Col>
                                    <Button variant="outline-primary" onClick={filterTransactionsByYearAndMonth}>
                                        Filter
                                    </Button>&nbsp;
                                    <Button variant="outline-secondary" onClick={clearFilter}>Clear</Button>
                                </Col>
                                <Col xs={1}>
                                    <Button variant="outline-primary" onClick={onClickCreateButton}>
                                        Create
                                    </Button>
                                </Col>
                            </Row>
                            <hr/>
                            <BootstrapTable striped hover defaultSorted={defaultSorted} pagination={pagination}
                                            {...props.baseProps}/>
                            <Row>
                                <Col>
                                    <ExportCSVButton { ...props.csvProps }>Export CSV</ExportCSVButton>
                                </Col>
                            </Row>
                        </div>
                    )
                }
            </ToolkitProvider>
        </Container>
    );
};

export default TransactionListForAdmin;