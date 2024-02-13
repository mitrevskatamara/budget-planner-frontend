import {Routes} from "react-router";
import {Route} from "react-router-dom";
import App from "./components/App";
import TransactionList from "./components/transactions/TransactionList";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import TransactionCreate from "./components/transactions/TransactionCreate";
import TransactionEdit from "./components/transactions/TransactionEdit";
import BudgetCreate from "./components/budget/BudgetCreate";
import BudgetList from "./components/budget/BudgetList";
import BudgetEdit from "./components/budget/BudgetEdit";
import AdminPage from "./components/admin/AdminPage";
import CategoryCreate from "./components/category/CategoryCreate";
import CategoryEdit from "./components/category/CategoryEdit";
import UserList from "./components/user/UserList";
import CategoryList from "./components/category/CategoryList";
import StatisticsPage from "./components/statistics/StatisticsPage";
import UserDetails from "./components/user/UserDetails";
import ForgotPassword from "./components/auth/ForgotPassword";
import ErrorPage from "./components/error/ErrorPage";
import EmailSent from "./components/auth/EmailSent";
import CheckToken from "./components/auth/CheckToken";
import ExpireToken from "./components/auth/ExpireToken";
import VerifyEmailSent from "./components/auth/VerifyEmailSent";
import CheckVerifyEmailToken from "./components/auth/CheckVerifyEmailToken";
import ConverterPage from "./components/converter/ConverterPage";
import NotificationList from "./components/notification/NotificationList";

const routes = () => {
    return (
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="transactions" element={<TransactionList/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/transactions/create" element={<TransactionCreate admin={false}/>}/>
            <Route path="/transactions/update/:id" element={<TransactionEdit/>}/>
            <Route path="/budgets/create" element={<BudgetCreate/>}/>
            <Route path="/budgets" element={<BudgetList/>}/>
            <Route path="/budgets/update/:id" element={<BudgetEdit/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            <Route path="/categories" element={<CategoryList/>}/>
            <Route path="/categories/create" element={<CategoryCreate/>}/>
            <Route path="/categories/update/:id" element={<CategoryEdit/>}/>
            <Route path="/admin/users" element={<UserList/>}/>
            <Route path="/admin/budgets/create" element={<BudgetCreate admin={true}/>}/>
            <Route path="/admin/budgets/update/:id" element={<BudgetEdit/>}/>
            <Route path="/admin/transactions/update/:id" element={<TransactionEdit/>}/>
            <Route path="/admin/transactions/create" element={<TransactionCreate admin={true}/>}/>
            <Route path="/statistics" element={<StatisticsPage admin={false}/>}/>
            <Route path="/user/:username" element={<UserDetails/>}/>
            <Route path="/forgotPassword" element={<ForgotPassword/>}/>
            <Route path="/error" element={<ErrorPage/>}/>
            <Route path="/emailSent/:email" element={<EmailSent/>}/>
            <Route path="/changePassword" element={<CheckToken/>}/>
            <Route path="/invalidToken" element={<ExpireToken/>}/>
            <Route path="/verifyEmail" element={<CheckVerifyEmailToken/>}/>
            <Route path="/verifyEmailSent/:email" element={<VerifyEmailSent/>}/>
            <Route path="/converter" element={<ConverterPage/>}/>
            <Route path="/notifications" element={<NotificationList/>}/>
        </Routes>
    )
};

export default routes;