import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  getPosts() {
    return this.postsService.getPosts()
  }

  @Post()
  createPosts(@Body() body: any) {
    return this.postsService.createPosts(body)
  }

  @Get(':id')
  getDetailsPosts(@Param('id') id: string) {
    return this.postsService.getDetailsPosts(id)
  }

  @Put(':id')
  updatePosts(@Param('id') id: string, @Body() body: any) {
    return this.postsService.updatePosts(id, body)
  }

  @Delete(':id')
  deletePosts(@Param('id') id: string) {
    return this.postsService.deletePosts(id)
  }
}
