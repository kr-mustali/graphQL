import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
const ADD_AUTHOR = gql`
  mutation Mutation($author: AddAuthorInput!) {
    addAuthor(author: $author) {
      id
      name
      verified
    }
  }
`;
interface ButtonProps {
  onAddAuthor: (message: string) => void;
}
export default function AddAuthor({ onAddAuthor }: ButtonProps) {
  const [name, setName] = useState("");
  const [verified, setVerified] = useState(false);

  const [addAuthor] = useMutation(ADD_AUTHOR, {
    onCompleted: (data) => {
      onAddAuthor(data.addAuthor);
    },
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addAuthor({
      variables: {
        author: {
          name,
          verified,
        },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        value={verified ? "true" : "false"}
        onChange={(e) => setVerified(e.target.value === "true")}
      >
        <option value="false">False</option>
        <option value="true">True</option>
      </select>
      <button type="submit">Add Author</button>
    </form>
  );
}
