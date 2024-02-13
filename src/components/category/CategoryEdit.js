import {useDispatch} from "react-redux";
import {updateCategory} from "../../actions/categoryActions";
import CategoryForm from "./CategoryForm";
import {useParams} from "react-router-dom";

const CategoryEdit = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    const onSubmit = (name) => {
        dispatch(updateCategory(id, name));
    }

    return (
        <CategoryForm id={id} onSubmit={onSubmit} />
    );
}

export default CategoryEdit;