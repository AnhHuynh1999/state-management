import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "react-bootstrap";

interface IBlog {
  author: string;
  title: string;
  content: string;
}
const BlogCreateModal = (props: any) => {
  const { isOpenCreateModal, setIsOpenCreateModal } = props;

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: IBlog) => {
      const res = await fetch("http://localhost:8000/blogs", {
        method: "POST",
        body: JSON.stringify({
          ...payload,
        }),
        headers: {
          "Content-Type": " application/json",
        },
      });
      return res.json();
    },
    onSuccess: () => {
      setTitle("");
      setAuthor("");
      setContent("");
      toast.success("Created");
      setIsOpenCreateModal(false);
      queryClient.invalidateQueries({ queryKey: ["fetchUser"] });
    },
  });

  const handleSubmit = () => {
    if (!title) {
      alert("title empty");
      return;
    }
    if (!author) {
      alert("author empty");
      return;
    }
    if (!content) {
      alert("content empty");
      return;
    }
    //call api => call redux
    mutation.mutate({ title, author, content });
  };

  return (
    <>
      <Modal
        show={isOpenCreateModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop={false}
        onHide={() => setIsOpenCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add A New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Title" className="mb-3">
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </FloatingLabel>
          <FloatingLabel label="Author" className="mb-3">
            <Form.Control
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
            />
          </FloatingLabel>
          <FloatingLabel label="Content">
            <Form.Control
              value={content}
              onChange={(e) => setContent(e.target.value)}
              type="text"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => setIsOpenCreateModal(false)}
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
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BlogCreateModal;
