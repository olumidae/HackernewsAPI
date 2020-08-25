const { PrismaClient } = require('@prisma/client');
const { GraphQLServer } = require('graphql-yoga');

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => await context.prisma.link.findMany()
  },
  Mutation: {
    post: async (parent, args) => {
      const newPost = await context.prisma.link.create({
        data: {
          description: args.description,
          url: args.url,
        }
      })
      return newPost;
    }
  },
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma
  }
})
server.start(() => console.log(`GraphQL server is running on http://localhost:4000`));
