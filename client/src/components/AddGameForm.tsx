import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
interface ButtonProps {
  onAddGame: (message: string) => void;
}
export default function AddGameForm({ onAddGame }: ButtonProps) {
  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState("");
  const ADD_GAME = gql`
    mutation AddGame($game: AddGameInput!) {
      addGame(game: $game) {
        id
        title
        platform
      }
    }
  `;
  const [addGame] = useMutation(ADD_GAME, {
    onCompleted: (data) => {
      onAddGame(data.addGame);
      setTitle("");
      setPlatform("");
    },
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addGame({ variables: { game: { title, platform: platform.split(",") } } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Platform (comma-separated)"
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      />
      <button type="submit">Add Game</button>
    </form>
  );
}
