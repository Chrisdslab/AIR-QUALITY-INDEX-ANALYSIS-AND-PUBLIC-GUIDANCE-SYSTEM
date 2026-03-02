import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/global.css";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className="card">
      <h2>User Accounts</h2>

      {users.length === 0 && <p>No users found.</p>}

      {users.map((u) => (
        <div key={u.user_id} className="list-item">
          <b>{u.name}</b><br />
          {u.email}<br />
          <span style={{ color: "#444" }}>{u.user_type}</span>
          {u.health_profile && (
            <div style={{ fontSize: "12px", color: "#777" }}>
              Health: {u.health_profile}
            </div>
          )}
          <div style={{ fontSize: "11px", color: "gray" }}>
            Registered: {u.registration_date}
          </div>
        </div>
      ))}
    </div>
  );
}
