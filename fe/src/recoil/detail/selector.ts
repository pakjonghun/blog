import { getPost } from "./../../apis/posts";
import { selectorFamily } from "recoil";
export const getPostDeatilQuery = selectorFamily({
  key: "getPostDeatilQuery",
  get: (id: string) => async () => {
    return getPost(id);
  },
});
