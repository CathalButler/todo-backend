// For clarity in this example we included our typeDefs and resolvers above our test,
// but in a real world situation you'd be importing these in from different files
import {ApolloServer, gql} from "apollo-server";


const typeDefs = gql`
    type Query {
        hello(name: String): String!
    }
`;

const resolvers = {
    Query: {
        hello: (_, { name }) => `Hello ${name}!`,
    },
};

test('returns hello with the provided name', async () => {
    const testServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    const result = await testServer.executeOperation({
        query: 'query SayHelloWorld($name: String) { hello(name: $name) }',
        variables: { name: 'world' },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.hello).toBe('Hello world!');
});