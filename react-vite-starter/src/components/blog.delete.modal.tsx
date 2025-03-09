import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { deleteBlog, resetDeleteSuccess } from "../redux/blog/blogSlice";

interface IProps {
  show: boolean;
  handleClose: () => void;
  id: number;
}
const BlogDeleteModal = (props: IProps) => {
  const { show, handleClose, id } = props;
  const isDeleteSuccess = useAppSelector((state) => state.blog.isDeleteSuccess);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success("Blog deleted successfully!");
      dispatch(resetDeleteSuccess());
    }
  }, [isDeleteSuccess]);

  const handleDelete = () => {
    // Simulate deleting user from the API
    dispatch(deleteBlog(id));
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
        <Button variant="primary" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlogDeleteModal;
