export interface FetchPayload {
  requestUrl: string;
  params?: any;
}

export interface RequestGetPosts {
  term?: string;
  category?: string;
  page: number;
  perPage: number;
}

export interface ResponseGetPosts {
  data: Post[];
  totalCoount: number;
}

export interface Post {
  id: string;
  head: { date: string; category: string };
  body: string;
}

export interface PostHead {
  category: string;
  date: string;
}

export interface PostFileData {
  file: string;
  data: any;
  content: string;
}
