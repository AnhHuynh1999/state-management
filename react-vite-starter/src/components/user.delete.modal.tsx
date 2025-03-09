import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { deleteUser, resetDeleteSuccess } from "../redux/user/userSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface IProps {
  show: boolean;
  handleClose: () => void;
  id: number;
}
const UserDeleteModal = (props: IProps) => {
  const { show, handleClose, id } = props;
  const isDeleteSuccess = useAppSelector((state) => state.user.isDeleteSuccess);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("User deleted successfully!");
      dispatch(resetDeleteSuccess());
    }
  }, [isDeleteSuccess]);

  const handleDeleteUser = () => {
    // Simulate deleting user from the API
    dispatch(deleteUser(id));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> {`Delete User`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this user with id {id}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDeleteUser}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDeleteModal;
