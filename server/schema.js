const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews:[Review!]
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    game:Game!
    author:Author!
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews:[Review!]
  }
  type Query {
    games: [Game]
    game(id:ID!):Game
    reviews: [Review]
    review(id:ID!):Review
    authors: [Author]
    author(id:ID!):Author
  }

  type Mutation{
    addGame(game:AddGameInput!):Game
    updateGame(id:ID!,edits:EditGameInput):Game
    addReview(review:AddReviewInput!):Review
    addAuthor(author:AddAuthorInput!):Author
    deleteGame(id:ID!):[Game]
  }

  input AddGameInput{
    title:String!,
    platform:[String!]!
  }
  input EditGameInput{
    title:String,
    platform:[String!]
  }
  input AddReviewInput{
    rating: Int,
    content: String,
    author_id: ID!,
    game_id:ID! 
  }
  input AddAuthorInput{
    name:String!,
    verified:Boolean!,
  }

`;

module.exports = { typeDefs };
