import { ApolloServer, PubSub } from 'apollo-server'
import mongoose from 'mongoose'

function startServer({ typeDefs, resolvers }: any) {
  mongoose.connect("mongodb+srv://ptk:87127186ab@cluster0.odhte.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  const pubsub = new PubSub()
  const server = new ApolloServer({ typeDefs, resolvers, context: { pubsub } })
  server.listen().then( ({ url }: any) => console.log(url))
}

export default startServer