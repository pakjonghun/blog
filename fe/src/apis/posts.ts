import { getFetch } from "./apisUtils";
import { RequestGetPosts } from "./apisTypes";

export const getPosts = async (args: RequestGetPosts) => {
  return getFetch({ requestUrl: "", params: args });
};

export const getPost = async (args: string) => {
  return getFetch({ requestUrl: args });
};
