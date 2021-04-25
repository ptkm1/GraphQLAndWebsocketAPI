import Message from "../../../entities/Message";
import User from "../../../entities/User";
import { MENSAGEM } from "../users/channel";

export default {
  Message: {
    user: (usr:any) => User.findById(usr.user)
  },
  Query: {
    users: () => Message.find(),
    user: (_: any, { id }: any) => Message.findById(id)
  },
  Mutation: {
    createMessage: async (_: any, {data}: any, { pubsub }: any) => {
      const message = await Message.create(data)

      pubsub.publish(MENSAGEM, { mensagem: message })

      return message
    },
    updatePost: (_: any, { id, data }: any) => Message.findOneAndUpdate(id, data, { new: true }),
    deleteMessage: async (_: any, { id }: any) => {
      const deleted = await Message.findOneAndDelete(id)
      return !!deleted
    }
  },
  Subscription: {
    mensagem: {
      subscribe: (obj:any, args: any, { pubsub }: any) => pubsub.asyncIterator(MENSAGEM),
    }
  }
}