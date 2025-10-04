import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // <-- set loading before fetching
    setUser(null);

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false); // <-- turn off loading after data arrives
      })
      .catch(() => setLoading(false));
  }, [id]);

  // ✅ Render loading state first
  if (loading) return <div>Loading...</div>;

  if (!user)
    return (
      <div>
        <h1>User not found</h1>
        <Link to="/">Back</Link>
      </div>
    );

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>
      <Link to="/">Back</Link>
    </div>
  );
}
