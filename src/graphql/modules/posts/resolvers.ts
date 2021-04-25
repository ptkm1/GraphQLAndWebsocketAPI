import Post from '../../../entities/Post'
import User from '../../../entities/User'

export default {
  Post: {
    author: (post:any) => User.findById(post.author)
  },
  Query: {
    posts: () => Post.find(),
    post: (_: any, { id }: any) => Post.findById(id)
  },
  Mutation: {
    createPost: (_: any, { data }: any) => Post.create(data),
    updatePost: (_: any, { id, data }: any) => Post.findOneAndUpdate(id, data, { new: true }),
    deletePost: async (_: any, { id }: any) => {
      const deleted = await Post.findOneAndDelete(id)
      return !!deleted
    }
  }
}