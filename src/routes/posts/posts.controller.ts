import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { PostsService } from './posts.service'
import { AccessTokenGuard } from 'src/shared/guards/access-token.guard'
import { APIKeyGuard } from 'src/shared/guards/api-key.guard'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AccessTokenGuard)
  @UseGuards(APIKeyGuard)
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
