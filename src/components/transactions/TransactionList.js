import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {
    filterByYearAndMonth,
    deleteTransaction, fetchTransactionsByUser, filterByDate
} from "../../actions/transactionActions";
import {months, types, yearList} from "../../utils";
import {Container, Button, Form, Col, Row} from "react-bootstrap";
import ToolkitProvider, {Search, CSVExport} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapTable from "react-bootstrap-table-next";
import '../assets/css/transactionList.css';
import pagination from "../pagination";
import {actionsFormatter, dateFormatter, indexFormatter} from "../formatters";
import Moment from "moment";

const TransactionList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const transaction = useSelector(state => state.transaction);
    const auth = useSelector(state => state.auth);
    const initialState = {
        year: '',
        month: '',
        type: '',
        username: auth.user.username,
        date: ''
    }
    const [filter, setFilter] = useState(initialState);
    const [show, setShow] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [date, setDate] = useState(Moment().format('YYYY-MM-DD'));

    useEffect(() => {
        dispatch(fetchTransactionsByUser(filter));
    }, [dispatch]);

    const transactionDelete = (id) => {
        dispatch(deleteTransaction(id));
    };

    const transactionEdit = (id) => {
        navigate('/transactions/update/' + id);
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
        setFilter(initialState)
        dispatch(fetchTransactionsByUser(filter));
    };

    const onClickCreateButton = () => {
        navigate("/transactions/create")
    };

    const onDateChange = (event) => {
        setDate(event.target.value)
        dispatch(filterByDate(auth.user.username, event.target.value))
    };

    const [id, setId] = useState('');

    const columns = [
        {dataField: 'id', text: 'Id', hidden: true, csvExport: false},
        {dataField: 'number', text: 'No.', formatter: (cell, row, rowIndex) => indexFormatter(cell, row,rowIndex), headerStyle: {width: "45px"}, csvExport: false},
        {dataField: 'date', text: 'Date', headerStyle: {width: "130px"}, sort: true, formatter: (cell, row) => dateFormatter(cell)},
        {dataField: 'name', text: 'Transaction name', sort: true},
        {dataField: 'transactionType.type', text: 'Transaction type', sort: true},
        {dataField: 'amount', text: 'Amount', headerStyle: {width: "120px"}, sort: true},
        {dataField: 'currency', text: 'Currency', headerStyle: {width: "120px"}, sort: true},
        {dataField: 'transactionType.category.name', headerStyle: {width: "150px"}, text: 'Category', sort: true},
        {
            dataField: 'edit', text: 'Actions', headerStyle: {width: "90px"}, csvExport: false, formatter: () => actionsFormatter({show, name: "transaction"}),
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    if (e.target.id === 'editImg') {
                        transactionEdit(row.id)
                    } else if (e.target.id === 'deleteImg') {
                        setShow(true)
                        setId(row.id)
                    } else if (e.target.id === 'yesButton') {
                        transactionDelete(id);
                        setShow(false);
                    } else if (e.target.id === 'cancelButton') {
                        setShow(false);
                    }
                },
            }
        }];

    const {SearchBar} = Search;
    const { ExportCSVButton } = CSVExport;

    const defaultSorted = [{
        dataField: 'date',
        order: 'desc'
    }];

    return (
        <Container className="transaction-list-container">
            <div style={{marginLeft: '15px', marginRight: '15px'}}>
                <h3 style={{marginBottom: '13px', marginTop: '15px'}}>Transactions</h3>
                <ToolkitProvider bootstrap4 keyField="id" data={transaction.transactions} columns={columns} search>
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
                                            Create new transaction
                                        </Button>
                                    </Col>
                                </Row>
                                <Row hidden={!showFilters} style={{marginTop: '10px'}}>
                                    <br/>
                                    <Col xs={2}>
                                        <Form.Group>
                                            <Form.Control type="date" name="date" value={date} onChange={onDateChange}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2} style={{width: '136px'}}>
                                        <Form.Group>
                                            <Form.Control className="form-inline" as="select" name="month"
                                                          value={filter.month}
                                                          onChange={onFilterChange}>
                                                <option value="" disabled>Month</option>
                                                {
                                                    months.map(month => (
                                                        <option key={month.key}
                                                                value={month.value}>{month.text}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={1}>
                                        <Form.Group>
                                            <Form.Control as="select" name="year" value={filter.year}
                                                          onChange={onFilterChange}>
                                                <option value="" disabled>Year</option>
                                                {
                                                    yearList().map(year => (
                                                        <option key={year.key} value={year.value}>{year.text}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={1}>
                                        <Form.Group>
                                            <Form.Control as="select" name="type" value={filter.type}
                                                          onChange={onFilterChange}>
                                                <option value="" disabled>Type</option>
                                                {
                                                    types.map(type => (
                                                        <option key={type.key} value={type.value}>{type.text}</option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Button variant="outline-primary" onClick={filterTransactionsByYearAndMonth}>
                                            Filter
                                        </Button>&nbsp;&nbsp;
                                        <Button variant="outline-secondary" onClick={clearFilter}>Clear</Button>
                                    </Col>
                                </Row>
                                <hr/>
                                <BootstrapTable bordered={false} striped hover defaultSorted={defaultSorted}
                                                pagination={pagination}
                                                {...props.baseProps}/>
                                <br/>
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        </Container>
    );
};

export default TransactionList;