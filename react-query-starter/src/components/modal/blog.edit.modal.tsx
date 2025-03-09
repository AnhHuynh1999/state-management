import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

interface IBlog {
  title: string;
  author: string;
  content: string;
}
const BlogEditModal = (props: any) => {
  const { isOpenUpdateModal, setIsOpenUpdateModal, dataBlog } = props;
  const [id, setId] = useState();

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: IBlog) => {
      const res = await fetch(`http://localhost:8000/blogs/${id}`, {
        method: "PUT",
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
      setAuthor("");
      setContent("");
      setTitle("");
      toast.success("Updated");
      setIsOpenUpdateModal(false);
      queryClient.invalidateQueries({ queryKey: ["fetchBlog"] });
    },
  });

  useEffect(() => {
    if (dataBlog?.id) {
      setId(dataBlog?.id);
      setTitle(dataBlog?.title);
      setAuthor(dataBlog?.author);
      setContent(dataBlog?.content);
    }
  }, [dataBlog]);

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
    mutation.mutate({ title, author, content });
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
          <Modal.Title>Update A Blog</Modal.Title>
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
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BlogEditModal;
