import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from "react-toastify";
import { updateUserPending } from "../../redux/user/user.slide";
import { Spinner } from "react-bootstrap";

const UserEditModal = (props: any) => {
  const { isOpenUpdateModal, setIsOpenUpdateModal, dataUser } = props;
  const [id, setId] = useState<number>();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const isUpdating = useAppSelector((state) => state.user.isUpdating);
  const isUpdateSuccess = useAppSelector((state) => state.user.isUpdateSuccess);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (dataUser?.id) {
      setId(dataUser?.id);
      setEmail(dataUser?.email);
      setName(dataUser?.name);
    }
  }, [dataUser]);

  useEffect(() => {
    if (isUpdateSuccess) {
      setIsOpenUpdateModal(false);
      setEmail("");
      setName("");
      toast.success("User saved successfully!");
    }
  }, [isUpdateSuccess]);

  const handleSubmit = () => {
    if (!email) {
      alert("email empty");
      return;
    }
    if (!name) {
      alert("name empty");
      return;
    }
    if (id) {
      dispatch(updateUserPending({ id, email, name }));
    }
  };

  return (
    <>
      <Modal
        show={isOpenUpdateModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop={false}
        onHide={() => setIsOpenUpdateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update A User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Email" className="mb-3">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </FloatingLabel>
          <FloatingLabel label="Name">
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          {!isUpdating ? (
            <>
              <Button
                variant="warning"
                onClick={() => setIsOpenUpdateModal(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button onClick={() => handleSubmit()}>Confirm</Button>
            </>
          ) : (
            <Button variant="primary" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Loading...
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserEditModal;
