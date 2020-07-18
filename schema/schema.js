const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const db = require("../db");

//Dummy Data
const users = [
  { name: "Tash", role: "Writer", id: "1" },
  { name: "Aneiq", role: "Reader", id: "2" },
  { name: "Shamshul", role: "Writer", id: "3" },
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        //Code to get data from db/other source
        // return users.find((u) => u._id === args._id);
        return db.query(`SELECT * FROM Users WHERE _id = $1`, [args._id]);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        //Code to get data from db/other source
        // return users.find((u) => u._id === args._id);
        console.log(db.query(`SELECT * FROM Users`));
        return db.query(`SELECT * FROM Users`);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        /* INSERT SQL*/
      },
    },
    editUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        role: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        /* INSERT SQL*/
      },
    },
    deleteUser: {
      type: UserType,
      args: {
        _id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        /* INSERT SQL*/
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
