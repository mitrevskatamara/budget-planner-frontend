import {Container, Tab, Tabs} from "react-bootstrap";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {fetchTransactions} from "../../actions/transactionActions";
import UserList from "../user/UserList";
import CategoryList from "../category/CategoryList";
import {useLocation} from "react-router";
import StatisticsPage from "../statistics/StatisticsPage";
import TransactionListForAdmin from "../transactions/admin/TransactionListForAdmin";
import BudgetListForAdmin from "../budget/admin/BudgetListForAdmin";

const AdminPage = () => {
    const dispatch = useDispatch();
    const { state } = useLocation();

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    const checkPreviousLocation = (location) => {
        if (location.includes("categories")) return "categories"
        else if (location.includes("users")) return "users"
        else if (location.includes("budgets")) return "budgets"
        else if (location.includes("transactions")) return "transactions"
    };

    return (
        <Container>
            <h2 className="text-center">Admin Panel</h2>
            <Tabs className="mb-3" defaultActiveKey={state === null ? "users" :  checkPreviousLocation(state.location)}>
                <Tab eventKey="users" title="Users">
                    <UserList/>
                </Tab>
                <Tab eventKey="budgets" title="Budgets">
                    <BudgetListForAdmin/>
                </Tab>
                <Tab eventKey="transactions" title="Transactions">
                    <TransactionListForAdmin/>
                </Tab>
                <Tab eventKey="categories" title="Categories">
                    <CategoryList/>
                </Tab>
                <Tab eventKey="statistics" title="Statistics">
                    <StatisticsPage admin={true}/>
                </Tab>
            </Tabs>
        </Container>
    )
};

export default AdminPage;