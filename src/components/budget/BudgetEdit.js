import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateBudget } from "../../actions/budgetActions";
import BudgetForm from "./BudgetForm";

const BudgetEdit = (props) => {
    const {id} = useParams();
    const dispatch = useDispatch();

    const onSubmit = formValues => {
        dispatch(updateBudget(id, formValues))
    };

    return (
        <BudgetForm id={id} onSubmit={onSubmit} admin={props.admin} />
    )
};

export default BudgetEdit;