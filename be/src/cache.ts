import { readdirSync, readFileSync } from 'fs';
import { Injectable } from '@nestjs/common';
import { Post, PostFileData, PostHead } from './Interfaces';
import { resolve } from 'path';
import * as matter from 'gray-matter';

@Injectable()
export class CacheStore {
  private postPath = resolve(__dirname, '..', 'posts');
  private fileList: string[] = [];
  private postList: Record<string, Post[]> = {};

  private getFilesFromFile() {
    if (this.fileList.length) return this.fileList;
    else {
      const files = readdirSync(this.postPath).sort((a, b) => {
        if (a > b) return -1;
        else return 1;
      });

      this.fileList = files;
      return files;
    }
  }

  private getPostsForm({ file, data, content }: PostFileData) {
    const post: Post = {
      id: file,
      head: data as PostHead,
      body: content,
    };

    return post;
  }

  private getPostByTerm(term: string) {
    if (this.postList[term]) return this.postList[term];
    else {
      const files = this.getFilesFromFile();
      const posts: Post[] = [];
      for (const file of files) {
        const readFile = readFileSync(`${this.postPath}/${file}`);
        const { data, content } = matter(readFile);

        if (
          data.category.includes(term) ||
          content.includes(term) ||
          file.includes(term)
        ) {
          const post = this.getPostsForm({ file, data, content });
          posts.push(post);
        }
      }
      this.postList[term] = posts;
      return posts;
    }
  }

  private getPosts() {
    if (this.postList?.raw) return this.postList.raw;
    else {
      const files = this.getFilesFromFile();
      const posts: Post[] = [];
      for (const file of files) {
        const readFile = readFileSync(`${this.postPath}/${file}`);
        const { data, content } = matter(readFile);
        const post = this.getPostsForm({ file, data, content });
        posts.push(post);
      }
      this.postList.raw = posts;
      return posts;
    }
  }

  private getPostByCategory(category: string) {
    if (this.postList[category]) return this.postList[category];
    else {
      const files = this.getFilesFromFile();
      const posts: Post[] = [];
      for (const file of files) {
        const readFile = readFileSync(`${this.postPath}/${file}`);
        const { data, content } = matter(readFile);

        if (data.category.includes(category)) {
          const post = this.getPostsForm({ file, data, content });
          posts.push(post);
        }
      }
      this.postList[category] = posts;
      return posts;
    }
  }

  getData({ term, category }: { term?: string; category?: string }) {
    let data: Post[] = this.getPosts();
    if (term) data = this.getPostByTerm(term);
    if (category) data = this.getPostByCategory(category);
    return data;
  }

  getTotalCount({ term, category }: { term?: string; category?: string }) {
    let data: Post[] = this.getPosts();
    if (term) data = this.getPostByTerm(term);
    if (category) data = this.getPostByCategory(category);
    return data.length;
  }
}
