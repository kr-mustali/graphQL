import { gql, useMutation, useQuery } from "@apollo/client";
import { Key, useState } from "react";
import AddGameForm from "./components/AddGameForm";
import AddReviewForm from "./components/AddReviewForm";
import AddAuthor from "./components/AddAuthor";
import EditGame from "./components/EditGame";

interface ReviewInterface {
  map(
    arg0: (r: {
      id: Key | null | undefined;
      content: string;
      rating: number;
      author: { name: string };
    }) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
  id: Key;
  content: string;
  rating: number;
  author: {
    name: string;
  };
}

const query = gql`
  query Query {
    games {
      id
      title
      platform
      reviews {
        id
        content
        rating
        author {
          id
          name
        }
      }
    }
    authors {
      id
      name
    }
  }
`;

function App() {
  const { data, loading, refetch } = useQuery(query);
  const [addGame, setAddGame] = useState(false);
  const [addReview, setAddReview] = useState(false);
  const [addAuthor, setAddAuthor] = useState(false);
  const [editGame, setEditGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>(null);

  const handleAddGame = () => {
    setAddGame(false);
    setAddReview(false);
    setAddAuthor(false);
    refetch();
  };

  const handleEdit = (game: any) => {
    // Updated handleEdit function to accept game data
    setSelectedGame(game); // Set the selected game data
    setEditGame(true);
  };

  const DELETE_GAME = gql`
    mutation Mutation($deleteGameId: ID!) {
      deleteGame(id: $deleteGameId) {
        id
        title
        platform
      }
    }
  `;

  const [deleteGame] = useMutation(DELETE_GAME, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleDelete = (game) => {
    deleteGame({
      variables: {
        deleteGameId: game.id,
      },
    });
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
          padding: "20px",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          data.games.map(
            (game: {
              reviews: ReviewInterface;
              platform: Array<string>;
              title: string;
            }) => (
              <div
                key={game.title}
                style={{
                  color: "#333",
                  border: "2px solid #ddd",
                  borderRadius: "14px",
                  backgroundColor: "#fff",
                  padding: "20px",
                }}
              >
                <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
                  {game.title}
                </h3>
                <h4 style={{ marginBottom: "10px", fontSize: "1.1em" }}>
                  Platforms:
                </h4>
                <p style={{ marginBottom: "20px" }}>
                  {game.platform.join(", ")}
                </p>
                <h4 style={{ marginBottom: "10px", fontSize: "1.1em" }}>
                  Reviews :
                </h4>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {game.reviews.map(
                    (r: {
                      id: Key | null | undefined;
                      content: string;
                      rating: number;
                      author: { name: string };
                    }) => (
                      <li
                        key={r.id}
                        style={{
                          marginBottom: "10px",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <span style={{ fontSize: "0.9em" }}>{r.content}</span>
                          <span style={{ fontSize: "0.9em" }}>
                            Rating: {r.rating}
                          </span>
                        </div>

                        <p style={{ marginBottom: "5px", fontSize: "0.9em" }}>
                          - by {r.author.name}
                        </p>
                      </li>
                    )
                  )}
                </ul>
                <div style={{ display: "flex", gap: 5 }}>
                  <button onClick={() => handleEdit(game)}>Edit</button>
                  <button
                    style={{ color: "red" }}
                    onClick={() => handleDelete(game)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>
      <div
        style={{
          display: "flex",
          padding: "20px",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <button onClick={() => setAddGame(true)}>Add Game</button>
        <button onClick={() => setAddReview(true)}>Add Review</button>
        <button onClick={() => setAddAuthor(true)}>Add Author</button>
      </div>
      {addGame && <AddGameForm onAddGame={handleAddGame} />}
      {addReview && (
        <AddReviewForm
          games={data.games}
          authors={data.authors}
          onAddReview={handleAddGame}
        />
      )}
      {addAuthor && <AddAuthor onAddAuthor={handleAddGame} />}
      {editGame && <EditGame game={selectedGame} />}
    </>
  );
}

export default App;
