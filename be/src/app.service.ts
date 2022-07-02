import { Injectable, NotFoundException } from '@nestjs/common';
import { GetPostsDto } from './dtos/getPosts.dto';
import { CacheStore } from './cache';

@Injectable()
export class AppService {
  constructor(private readonly cacheStore: CacheStore) {}

  getPosts(getPostQuery: GetPostsDto) {
    const { category, term, page, perPage } = getPostQuery;
    const posts = this.cacheStore.getData({ category, term });

    const skip = (page - 1) * perPage;
    const data = posts.slice(skip, skip + perPage);
    const totalCount = this.cacheStore.getTotalCount({ category, term });

    return { data, totalCount };
  }

  getPost(id: string) {
    const posts = this.cacheStore.getData({ term: '', category: '' });
    const post = posts.find((post) => post.id === id);
    if (!post) throw new NotFoundException('포스트가 존재하지 않습니다.');
    return post;
  }
}
