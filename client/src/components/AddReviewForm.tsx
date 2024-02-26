import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_REVIEW = gql`
  mutation Mutation($review: AddReviewInput!) {
    addReview(review: $review) {
      id
      rating
      content
    }
  }
`;

export default function AddReviewForm({ games, authors, onAddReview }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [authorId, setAuthorId] = useState("");
  const [gameId, setGameId] = useState("");

  const [addReview] = useMutation(ADD_REVIEW, {
    onCompleted: (data) => {
      onAddReview(data.addReview);
      setContent("");
      setRating(0);
      setAuthorId(0);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview({
      variables: {
        review: { game_id: gameId, content, rating, author_id: authorId },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={gameId} onChange={(e) => setGameId(e.target.value)}>
        <option value="">Select Game</option>
        {games.map((game) => (
          <option key={game.id} value={game.id}>
            {game.title}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Review Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
      />
      <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
        <option value="">Select Author</option>
        {authors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Review</button>
    </form>
  );
}
