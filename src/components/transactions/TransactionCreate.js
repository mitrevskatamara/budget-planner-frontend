import { useDispatch } from "react-redux";
import { createTransaction } from "../../actions/transactionActions";
import TransactionForm from "./TransactionForm";
import TransactionFormForAdmin from "./admin/TransactionFormForAdmin";

const TransactionCreate = (props) => {
    const dispatch = useDispatch();

    const onSubmit = formValues => {
        dispatch(createTransaction(formValues));
    };

    return (
        props.admin ? <TransactionFormForAdmin onSubmit={onSubmit}/> : <TransactionForm onSubmit={onSubmit} />
    );

};

export default TransactionCreate;