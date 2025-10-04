import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Always start in a loading state when the effect runs
    setLoading(true);

    // Create a promise that resolves after a minimum delay (e.g., 300ms)
    // This gives Cypress plenty of time to see the "Loading..." state.
    const timer = new Promise((resolve) => setTimeout(resolve, 300));

    // Fetch the actual user data
    const fetcher = fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    ).then((res) => {
      if (!res.ok) {
        // Throw an error if the user ID is not found
        throw new Error("User not found");
      }
      return res.json();
    });

    // Wait for BOTH the fetch and the minimum delay to complete
    Promise.all([fetcher, timer])
      .then(([data]) => {
        // Once both are done, set the user data
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // On error, set user to null to show the "not found" message
        setUser(null);
      })
      .finally(() => {
        // No matter what, turn off the loading state at the very end
        setLoading(false);
      });
  }, [id]);

  // 1. Render the loading state. This is now guaranteed to be visible.
  if (loading) {
    return <div>Loading...</div>;
  }

  // 2. Render the "not found" state if the user is null after loading.
  if (!user) {
    return (
      <div>
        <h1>User not found</h1>
        <Link to="/">Back</Link>
      </div>
    );
  }

  // 3. Render the user details.
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
