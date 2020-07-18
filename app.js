const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

dotenv.config();
const app = express();
app.use(cors());
app.use(helmet());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server launched at ${port}`);
});
