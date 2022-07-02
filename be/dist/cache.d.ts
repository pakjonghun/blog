import { Post } from './Interfaces';
export declare class CacheStore {
    private postPath;
    private fileList;
    private postList;
    private getFilesFromFile;
    private getPostsForm;
    private getPostByTerm;
    private getPosts;
    private getPostByCategory;
    getData({ term, category }: {
        term?: string;
        category?: string;
    }): Post[];
    getTotalCount({ term, category }: {
        term?: string;
        category?: string;
    }): number;
}
