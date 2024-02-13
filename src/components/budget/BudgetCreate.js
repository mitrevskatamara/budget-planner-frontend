import { useDispatch } from "react-redux";
import BudgetForm from "./BudgetForm";
import { createBudget } from "../../actions/budgetActions";
import BudgetFormForAdmin from "./admin/BudgetFormForAdmin";

const BudgetCreate = (props) => {
    const dispatch = useDispatch();

    const onSubmit = formValues => {
        dispatch(createBudget(formValues));
    };

    return (
        props.admin ? <BudgetFormForAdmin onSubmit={onSubmit} /> : <BudgetForm onSubmit={onSubmit} />
    );
};

export default BudgetCreate;