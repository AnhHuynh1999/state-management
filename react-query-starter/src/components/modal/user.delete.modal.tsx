import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { QUERY_KEY } from "../../config/key";

const UserDeleteModal = (props: any) => {
  const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: { id: string }) => {
      const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": " application/json",
        },
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success("Deleted");
      setIsOpenDeleteModal(false);
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.getAllUsers() });
    },
  });

  const handleSubmit = () => {
    mutation.mutate({ id: dataUser?.id });
  };

  return (
    <Modal
      show={isOpenDeleteModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={false}
      onHide={() => setIsOpenDeleteModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete A User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Delete the user: {dataUser?.email ?? ""}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="warning"
          onClick={() => setIsOpenDeleteModal(false)}
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
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDeleteModal;
