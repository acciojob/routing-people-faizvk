import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();
  // We'll use a single state variable. It can be 'loading', null, or the user object.
  const [user, setUser] = useState("loading");

  useEffect(() => {
    // Set state to 'loading' when the component mounts or the id changes.
    setUser("loading");

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // If data is valid, set the user object.
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // On error, set user to null to show the "not found" message.
        setUser(null);
      });
  }, [id]);

  // 1. Check for the loading state first.
  if (user === "loading") {
    return <div>Loading...</div>;
  }

  // 2. Check for the user not found / error state.
  // We check for a truthy value and the existence of an 'id' to be safe.
  if (!user || !user.id) {
    return (
      <div>
        <h1>User not found</h1>
        <Link to="/">Back</Link>
      </div>
    );
  }

  // 3. If everything is fine, render the user's details.
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
