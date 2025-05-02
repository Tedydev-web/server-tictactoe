/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  getPosts() {
    return this.prismaService.post.findMany()
  }

  createPosts(body: any) {
    const userId = 1
    return this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId
      }
    })
  }

  getDetailsPosts(id: string) {
    return `Post ${id}`
  }

  updatePosts(id: string, body: any) {
    return `Update Post ${id}`
  }

  deletePosts(id: string) {
    return `Delete Post ${id}`
  }
}
