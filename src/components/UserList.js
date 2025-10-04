import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => setUsers(json))
      .catch(() => setUsers([]));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <Link to={`/users/${u.id}`}>{u.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
