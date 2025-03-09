import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchUser, IUser } from "../redux/user/userSlice";
import { Button } from "react-bootstrap";
import UserModal from "./user.modal";
import UserDeleteModal from "./user.delete.modal";
function UsersTable() {
  //   const [users, setUsers] = useState<IUser[]>([]);

  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       const res = await fetch("http://localhost:8000/users");
  //       const data = await res.json();
  //       setUsers(data);
  //     };
  //     fetchUsers();
  //   }, []);

  const users = useAppSelector((state) => state.user.listUsers);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
        className="mb-3"
      >
        <h2>Users</h2>
        <Button
          variant="success"
          onClick={() => {
            setShowModal(true);
            setSelectedUser(null);
          }}
        >
          Add User
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name </th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => {
                    setShowModal(true);
                    setSelectedUser(user);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="m-2"
                  variant="danger"
                  onClick={() => {
                    setShowDeleteModal(true);
                    setSelectedUser(user);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <UserModal
          show={showModal}
          action={selectedUser ? "Edit" : "Add"}
          userSelected={selectedUser}
          handleClose={() => setShowModal(false)}
        />
        <UserDeleteModal
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          id={selectedUser?.id ?? 0}
        />
      </Table>
    </div>
  );
}

export default UsersTable;
