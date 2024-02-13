import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateTransaction } from "../../actions/transactionActions";
import TransactionForm from "./TransactionForm";
import TransactionFormForAdmin from "./admin/TransactionFormForAdmin";

const TransactionEdit = (props) => {
    const {id} = useParams();
    const dispatch = useDispatch();

    const onSubmit = formValues => {
        dispatch(updateTransaction(id, formValues));
    };

    return (
        props.admin ?
            <TransactionFormForAdmin id={id} onSubmit={onSubmit}/> :
            <TransactionForm id={id} onSubmit={onSubmit}/>
    );
}

export default TransactionEdit;
