import {Button, Modal} from "react-bootstrap";
import Moment from "moment";
import {Link} from "react-router-dom";
import deleteIcon from '../components/img/delete-icon.png';
import editIcon from './img/edit-icon.png';

export const actionsFormatter = (props) => {
    return (
        <>
            <img id="editImg" alt="Edit" src={editIcon} style={{width: '30px'}}/>&nbsp;
            <img id="deleteImg" alt="Delete" src={deleteIcon} style={{width: '30px'}}/>
            <Modal show={props.show} centered>
                <br/>
                <h5 className="text-center">Are you sure you want to delete this {props.name}?</h5>
                <br/>
                <Modal.Footer>
                    <Button id="cancelButton" variant="secondary">
                        Cancel
                    </Button>
                    <Button id="yesButton" className="custom-primary-button">
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export const dateFormatter = (cell) => {
    return Moment(cell).format('DD.MM.YYYY');
}

export const userFormatter = (cell,row) => {
    return (
        <Link to={'/user/' + row.user.username}>{row.user.username}</Link>
    )
};

export const indexFormatter = (cell, row, rowIndex) => {
    return rowIndex+1;
};

export const changingStatusFormatter = (row) => {
    return (
        <>
            <Button
                variant={row.status ? "outline-danger" : "outline-success"}>
                {!row.status  ? 'Activate' : 'Deactivate'}
            </Button>
        </>
    );
};

export const fullNameFormatter = (cell, row) => {
    return row.firstName + " " + row.lastName;
};

export const statusFormatter = (cell, row) => {
    if (row.status) {
        return 'Active'
    }
    return 'Inactive'
};

export const rolesFormatter = (cell) => {
    return cell.map(c => c.name + " ")
};