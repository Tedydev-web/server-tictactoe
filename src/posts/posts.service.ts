import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  getPosts() {
    return 'All Post';
  }

  createPosts(body: any) {
    return body;
  }

  getDetailsPosts(id: string) {
    return `Post ${id}`;
  }

  updatePosts(id: string, body: any) {
    return `Update Post ${id}`;
  }

  deletePosts(id: string) {
    return `Delete Post ${id}`;
  }
}
