import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const EditGame = ({ game }) => {
  const [editTitle, setEditTitle] = useState("");
  const [editPlatform, setEditPlatform] = useState("");

  const UPDATE_GAME = gql`
    mutation Mutation($updateGameId: ID!, $edits: EditGameInput) {
      updateGame(id: $updateGameId, edits: $edits) {
        id
        title
        platform
      }
    }
  `;

  const [updateGame] = useMutation(UPDATE_GAME);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateGame({
      variables: {
        updateGameId: game.id,
        edits: {
          title: editTitle ? editTitle : game.title,
          platform: editPlatform ? editPlatform.split(",") : game.platform,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{game.title}</h1>
      <input
        type="text"
        placeholder="Title"
        value={editTitle ? editTitle : game.title}
        onChange={(e) => setEditTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Platform (comma-separated)"
        value={editPlatform ? editPlatform : game.platform}
        onChange={(e) => setEditPlatform(e.target.value)}
      />
      <button type="submit">Edit Game</button>
    </form>
  );
};

export default EditGame;
