import {useDispatch} from "react-redux";
import {createCategory} from "../../actions/categoryActions";
import CategoryForm from "./CategoryForm";

const CategoryCreate = () => {
    const dispatch = useDispatch();

    const onSubmit = (category) => {
        dispatch(createCategory(category));
    }

    return (
        <CategoryForm onSubmit={onSubmit} />
    );
}

export default CategoryCreate;