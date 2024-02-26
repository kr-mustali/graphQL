const express = require("express");
const { ApolloServer } = require("@apollo/server");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDatabase = require("./db/mongodb");
const { expressMiddleware } = require("@apollo/server/express4");
const { default: axios } = require("axios");
const db = require("./_db");
const { typeDefs } = require("./schema");

const GameModel = require("./models/games.model");
const ReviewModel = require("./models/reviews.model");
const AuthorModel = require("./models/authors.model");

const resolvers = {
  Query: {
    reviews: async () => await ReviewModel.find(),
    review: async (_, args) => await ReviewModel.find({ game_id: args.id }),
    games: async () => await GameModel.find(),
    game: async (parent, args) => await GameModel.findById(args.id),
    authors: async () => await AuthorModel.find(),
    author: async (_, args) => await AuthorModel.findById(args.id),
  },
  Game: {
    reviews: async (parent, args) =>
      await ReviewModel.find({ game_id: parent.id }),
  },
  Review: {
    author: async (parent, args) =>
      await AuthorModel.findById(parent.author_id),
    game: async (parent, args) => await GameModel.findById(parent.game_id),
  },
  Author: {
    reviews: async (parent) => await ReviewModel.find({ author_id: parent.id }),
  },
  Mutation: {
    addGame: async (_, args) => {
      const newGame = new GameModel(args.game);
      return await newGame.save();
    },
    updateGame: async (_, args) => {
      const result = await GameModel.findByIdAndUpdate(args.id, args.edits);
      return result;
    },
    addReview: async (_, args) => {
      const newReview = new ReviewModel(args.review);
      return await newReview.save();
    },
    addAuthor: async (_, args) => {
      const newAuthor = new AuthorModel(args.author);
      return await newAuthor.save();
    },
    deleteGame: async (_, args) => {
      const deletedGame = await GameModel.findByIdAndDelete(args.id);
      if (!deletedGame) {
        throw new Error(`Game with ID ${id} not found`);
      }
      return deletedGame;
    },
  },
};

async function startServer() {
  await connectToDatabase();
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(8000, () => console.log("🚀  Server ready at PORT 8000"));
}

startServer();
