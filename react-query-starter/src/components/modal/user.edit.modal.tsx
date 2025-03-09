import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { QUERY_KEY } from "../../config/key";

interface IUser {
  email: string;
  name: string;
}

const UserEditModal = (props: any) => {
  const queryClient = useQueryClient();

  const { isOpenUpdateModal, setIsOpenUpdateModal, dataUser } = props;
  const [id, setId] = useState();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const mutation = useMutation({
    mutationFn: async (payload: IUser) => {
      const res = await fetch(`http://localhost:8000/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          email: payload.email,
          name: payload.name,
        }),
        headers: {
          "Content-Type": " application/json",
        },
      });
      return res.json();
    },
    onSuccess: () => {
      setEmail("");
      setName("");
      toast.success("Updated");
      setIsOpenUpdateModal(false);
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.getAllUsers() });
    },
  });

  useEffect(() => {
    if (dataUser?.id) {
      setId(dataUser?.id);
      setEmail(dataUser?.email);
      setName(dataUser?.name);
    }
  }, [dataUser]);

  const handleSubmit = () => {
    if (!email) {
      alert("email empty");
      return;
    }
    if (!name) {
      alert("name empty");
      return;
    }
    mutation.mutate({ email, name });
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
          <Button
            variant="warning"
            onClick={() => setIsOpenUpdateModal(false)}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button disabled={mutation.isPending} onClick={() => handleSubmit()}>
            {mutation.isPending && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserEditModal;
