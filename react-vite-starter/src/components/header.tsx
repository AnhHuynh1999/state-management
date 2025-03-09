import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { changeMode } from "../redux/app/appSlice";

function Header() {
  const users = useAppSelector((state) => state.user.listUsers);
  const mode = useAppSelector((state) => state.app.mode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const body = document.querySelector("body");
    if (body) body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  return (
    <Container>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            Bảo Anh IT Redux {users.length}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Form.Check // prettier-ignore
              type="switch"
              defaultChecked={mode === "light"? false : true} // prettier-ignore
              onChange={(e) => {
                dispatch(changeMode(e.target.checked ? "dark" : "light"));
              }}
              id="custom-switch"
              label={mode === "light" ? "Light mode" : "Dark mode"}
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default Header;
