import {Button, Modal} from "react-bootstrap";

const DeleteNotificationModal = ({ show, onClose, onDeleteClick }) => {
    return (
        <Modal show={show} centered={true}>
            <h5 className="text-center">Are you sure you want to delete this notification?</h5>
            <Modal.Footer>
                <Button id="cancelButton" variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button id="yesButton" variant="success" onClick={onDeleteClick}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteNotificationModal;