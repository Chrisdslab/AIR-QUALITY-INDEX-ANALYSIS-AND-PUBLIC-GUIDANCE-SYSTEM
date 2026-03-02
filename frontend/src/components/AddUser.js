import axios from "axios";
import { useState } from "react";
import "../styles/global.css";

export default function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    user_type: "",
    health_profile: "",
  });

  const save = async () => {
    await axios.post("http://localhost:5000/users", form);
    alert("User added successfully");
    window.location.reload();
  };

  return (
    <div className="card">
      <h2>Add User</h2>

      <input
        className="input"
        placeholder="Full Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="input"
        placeholder="Email Address"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <select
        className="input"
        onChange={(e) => setForm({ ...form, user_type: e.target.value })}
      >
        <option>Select User Type</option>
        <option value="Public User">Public User</option>
        <option value="Health Professional">Health Professional</option>
        <option value="Environmental Agency">Environmental Agency</option>
        <option value="System Admin">System Admin</option>
      </select>

      <textarea
        className="input"
        placeholder="Health Profile / Conditions"
        rows={3}
        onChange={(e) => setForm({ ...form, health_profile: e.target.value })}
      ></textarea>

      <button onClick={save}>Save User</button>
    </div>
  );
}
