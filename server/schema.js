const { buildSchema } = require("graphql");

const schema = buildSchema(`
type User {
    id: ID
    username: String
    age: Int
    posts: [Post]
}
type Post {
    id:ID
    title: String
    content: String
}

input UserInput {
    id: ID
    username: String!
    age: Int!
    posts: [PostInput]
}

input PostInput {
    id: ID
    title: String!
    content: String!
}

type Query {
    getAllUsers:[User]
    getUser(id:ID):User
}

type Mutation {
    createUser(input: UserInput): User
}
`);

module.exports = schema;

//в graphiql: query {getAllUsers{id, username, age} }
//або : mutation {createUser(input:{username:"Brok" age:27 posts:[{id:1, title:"JS", content:"language"}] }){id, username}  }
// запит фрагментом коли нам потрібно отримати якісь данні з усіх:
//fragment userWithoutAge on User {id, username, posts {title, content}} query{getAllUsers{...userWithoutAge}}
