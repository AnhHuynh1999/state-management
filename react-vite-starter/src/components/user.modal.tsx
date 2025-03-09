import { Button, Form, Modal } from "react-bootstrap";
import {
  createNewUser,
  IUser,
  resetCreateSuccess,
  resetUpdateSuccess,
  updateUser,
} from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface IProps {
  show: boolean;
  handleClose: () => void;
  action: string;
  userSelected: IUser | null;
}

const UserModal = (props: IProps) => {
  const { show, handleClose, action, userSelected } = props;
  const dispatch = useAppDispatch();
  const isCreateSuccess = useAppSelector((state) => state.user.isCreateSuccess);
  const isUpdateSuccess = useAppSelector((state) => state.user.isUpdateSuccess);
  const [user, setUser] = useState<Omit<IUser, "id">>(
    userSelected ?? {
      name: "",
      email: "",
    }
  );

  useEffect(() => {
    if (isCreateSuccess) {
      handleClose();
      toast.success("User saved successfully!");
      setUser({
        name: "",
        email: "",
      });
      dispatch(resetCreateSuccess());
    }
  }, [isCreateSuccess]);

  useEffect(() => {
    if (isUpdateSuccess) {
      handleClose();
      toast.success("User saved successfully!");
      setUser({
        name: "",
        email: "",
      });
      dispatch(resetUpdateSuccess());
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    setUser(
      userSelected ?? {
        name: "",
        email: "",
      }
    );
  }, [userSelected]);

  const handleSave = () => {
    if (!user.name || !user.email) {
      toast.error("Name and Email are required!");
      return;
    }
    if (action === "Edit" && userSelected) {
      dispatch(
        updateUser({
          ...user,
          id: userSelected.id,
        })
      );
    } else {
      dispatch(createNewUser(user));
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> {`${action} User`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={user?.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder="Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
