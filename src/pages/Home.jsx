import { useState } from "react";
import { useUser } from "../lib/context/User";
import { useIdeas } from "../lib/context/ideas";
import "./home.css";

export function Home() {
  const user = useUser();
  const ideas = useIdeas();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleFormSubmit = () => {
    ideas?.add({ userId: user?.current.$id, title, description });
    // Clear the form fields
    setTitle("");
    setDescription("");
  };

  return (
    <>
      {/* Show the submit form to logged in users. */}
      {user?.current ? (
        <section>
          <h2>Submit Idea</h2>
          <form>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            <button type="button" onClick={handleFormSubmit}>
              Submit
            </button>
          </form>
        </section>
      ) : (
        <section>
          <p>Please login to submit an idea.</p>
        </section>
      )}
      <section>
        <h2>Latest Ideas</h2>
        <p>Refresh once Please</p>
        <ul>
          {ideas?.current.map((idea) => (
            <li key={idea.$id}>
              <strong>{idea.title}</strong>
              <p>{idea.description}</p>
              {/* Show the remove button to idea owner. */}
              {user?.current && user?.current.$id === idea?.userId && (
                <button type="button" onClick={() => ideas?.remove(idea.$id)}>
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
