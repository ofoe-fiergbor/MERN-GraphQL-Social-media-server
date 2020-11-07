const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./graphql/typeDefs");
const { MONGODB } = require("./config");
const resolvers = require('./graphql/resolvers')

const PORT = process.env.PORT || 5000

const server = new ApolloServer({
  cors: true,
  typeDefs,
  resolvers,
  context:({req})=> ({req}),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    return server.listen({ port: PORT });
  })
  .then((res) => console.log(`server running at ${res.url}`))
  .catch((err) => console.log(err));
