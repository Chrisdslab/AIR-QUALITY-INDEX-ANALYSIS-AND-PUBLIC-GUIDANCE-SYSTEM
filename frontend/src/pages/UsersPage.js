import AddUser from "../components/AddUser";
import UserList from "../components/UserList";

export default function UsersPage() {
  return (
    <>
      <h1>User Management</h1>
      <AddUser />
      <UserList />
    </>
  );
}
