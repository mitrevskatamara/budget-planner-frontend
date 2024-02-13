import {Button, ButtonGroup, Col, Container, Form, Row} from "react-bootstrap";
import {yearList} from "../../utils";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Moment from "moment";
import {months} from "../../utils";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend, BarElement, ArcElement,
} from 'chart.js';
import {Bar, Pie} from 'react-chartjs-2';
import {fetchCategories} from "../../actions/categoryActions";
import {
    getStatisticsByCategory,
    getStatisticsByYear,
    getStatisticsForIncomesByCategory
} from "../../actions/statisticsActions";
import '../assets/css/statisticsPage.css';

const StatisticsPage = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const initialStateFilter = {
        year: Moment().year(),
        username: auth.user.username
    };

    const initialStateStatisticsDto = {
        year: Moment().year(),
        username: auth.user.username,
        month: Moment().format('MMMM').toUpperCase()
    };

    const [filter, setFilter] = useState(initialStateFilter);
    const [statisticsDto, setStatisticsDto] = useState(initialStateStatisticsDto);
    const statistics = useSelector(state => state.statistics);
    const user = useSelector(state => state.user);
    const category = useSelector(state => state.category);
    const admin = props.admin;

    useEffect(() => {
        dispatch(getStatisticsByYear(Moment().year()));
        dispatch(fetchCategories());
        dispatch(getStatisticsByCategory(statisticsDto));
        dispatch(getStatisticsForIncomesByCategory(statisticsDto));
    }, [dispatch]);

    const onFilterChange = (event) => {
        dispatch(getStatisticsByYear(event.target.value))
        setFilter({
            ...filter,
            [event.target.name]: event.target.value
        });
    }

    const onStatisticsChange = (event) => {
        setStatisticsDto({
            ...statisticsDto,
            [event.target.name]: event.target.value
        });
    }

    const statisticsByCategory = () => {
        dispatch(getStatisticsByCategory(statisticsDto))
        dispatch(getStatisticsForIncomesByCategory(statisticsDto))
    }

    const dataForBarWithNumberOfExpensesAndIncomes = {
        labels: months.map(m => m.text),
        datasets: [
            {
                label: 'Number of expenses',
                data: statistics.statisticsByYear.map(s => s.numberOfExpenses),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Number of incomes',
                data: statistics.statisticsByYear.map(s => s.numberOfIncomes),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const dataForBarWithTotalAmounts = {
        labels: months.map(m => m.text),
        datasets: [
            {
                label: 'Total sum of expenses',
                data: statistics.statisticsByYear.map(s => s.expense),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Total sum of incomes',
                data: statistics.statisticsByYear.map(s => s.income),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const dataForPieWithStatisticsByCategory = {
        labels: category.categories.map(c => c.name),
        datasets: [
            {
                label: '# of Votes',
                data: statistics.statisticsByCategory,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(245,66,71,0.86)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(253,145,41,0.2)',
                    'rgba(245,140,119,0.86)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(201,43,48,0.86)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgb(102,72,50)',
                    'rgba(183,72,51,0.86)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataForPieWithStatisticsForIncomesByCategory = {
        labels: category.categories.map(c => c.name),
        datasets: [
            {
                label: '# of Votes',
                data: statistics.statisticsForIncomesByCategory,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(245,66,71,0.86)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(253,145,41,0.2)',
                    'rgba(245,140,119,0.86)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(201,43,48,0.86)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgb(173,122,88)',
                    'rgba(183,72,51,0.86)',
                ],
                borderWidth: 1,
            },
        ],
    };

    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    ChartJS.register(ArcElement, Tooltip, Legend);
    ChartJS.register(ArcElement, Tooltip, Legend);

    return (
        <Container className="statistics-container">
            <h3 className="statistics-heading">Statistics</h3>
            <Row xs={4} className="justify-content-center" style={{marginTop: '-4px'}}>
                <Col xs={1} hidden={!admin}>
                    <Form>
                        <Form.Control className="form-inline" as="select" name="username"
                                      onChange={onFilterChange}>
                            <option defaultValue disabled>USER</option>
                            {
                                user.users.map(u => (
                                    <option key={u.id} value={u.username}>{u.username}</option>
                                ))
                            }
                        </Form.Control>
                    </Form>
                </Col>
                <ButtonGroup style={{marginLeft: '20px', marginBottom: '5px'}}>
                    {
                        yearList().map(year => (
                            <Button key={year.key} name="year" value={year.key} onClick={onFilterChange}
                                    variant={filter.year === year.value ? "secondary" : "outline-secondary"}>{year.text}</Button>
                        ))
                    }
                </ButtonGroup>
            </Row>
            <div>
                <div hidden={!admin}>
                    <br/>
                    <h4>{filter.username}'s Statistics
                        for {filter.year}</h4>
                </div>
                <Row className="custom-row">
                    <Col xs={5} className="custom-col">
                        <h4>Difference between <b>number</b> of expenses and incomes for {filter.year}</h4>
                        <Bar data={dataForBarWithNumberOfExpensesAndIncomes}/>
                    </Col>
                    <Col xs={1}/>
                    <Col xs={5} className="custom-col">
                        <h4>Difference between <b>sum</b> of expenses and incomes for {filter.year}</h4>
                        <Bar data={dataForBarWithTotalAmounts}/>
                    </Col>
                </Row>
                <hr style={{margin: '30px'}}/>
                <Row style={{marginLeft: '15px'}} className="justify-content-center">
                    <Col xs={1} hidden={!admin}>
                        <Form>
                            <Form.Control className="form-inline" as="select" name="username"
                                          onChange={onStatisticsChange}>
                                <option defaultValue disabled>USER</option>
                                {
                                    user.users.map(u => (
                                        <option key={u.id} value={u.username}>{u.username}</option>
                                    ))
                                }
                            </Form.Control>
                        </Form>
                    </Col>
                    <Col xs={1}>
                        <Form.Group>
                            <Form.Control style={{backgroundColor: 'transparent', width: '100px'}}
                                          className="form-inline" as="select" value={statisticsDto.month} name="month"
                                          onChange={onStatisticsChange}>px
                                <option value="" disabled>Month</option>
                                {
                                    months.map(month => (
                                        <option key={month.key} value={month.value}>{month.text}</option>
                                    ))
                                }
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col xs={4}>
                        <ButtonGroup style={{marginLeft: '20px', marginBottom: '10px'}}>
                            {
                                yearList().map(year => (
                                    <Button key={year.key} name="year" value={year.key} onClick={onStatisticsChange}
                                            variant={statisticsDto.year === year.value ? "secondary" : "outline-secondary"}>{year.text}</Button>
                                ))
                            }
                        </ButtonGroup>
                    </Col>
                    <Col xs={1}>
                        <Button variant="outline-primary" onClick={statisticsByCategory}>
                            Search
                        </Button>
                    </Col>
                </Row>
                <Row className="custom-row">
                    <Col xs={5} className="custom-col">
                        <h4>
                            Statistics for Expenses
                            by <b>Category</b> for {statisticsDto.month.toLowerCase() + ", " + statisticsDto.year}
                        </h4>
                        <Pie data={dataForPieWithStatisticsByCategory}/>
                    </Col>
                    <Col xs={1}/>
                    <Col xs={5} className="custom-col">
                        <h4>
                            Statistics for Incomes
                            by <b>Category</b> for {statisticsDto.month.toLowerCase() + ", " + statisticsDto.year}
                        </h4>
                        <Pie data={dataForPieWithStatisticsForIncomesByCategory}/>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default StatisticsPage;