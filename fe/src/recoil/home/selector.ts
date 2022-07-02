import { Post, ResponseGetPosts } from "./../../apis/apisTypes";
import {
  constSelector,
  Loadable,
  selector,
  selectorFamily,
  waitForAll,
  waitForNone,
} from "recoil";
import { getPosts } from "../../apis/posts";
import { searchTermState, searchCategoryState, postPageState } from "./atom";

export const PerPageConst = constSelector(10);

export const getCurrentPostsQuery = selectorFamily({
  key: "getCurrentPostsQuery",
  get:
    (page: number) =>
    ({ get }) => {
      const perPage = get(PerPageConst);
      const term = get(searchTermState);
      const category = get(searchCategoryState);

      return getPosts({ term, page, perPage, category });
    },
});

export const getPostsQuery = selector<Loadable<ResponseGetPosts>[]>({
  key: "getPostsQuery",
  get: async ({ get }) => {
    const page = get(postPageState);
    const postList = Array.from({ length: page }, (_, index) => index + 1);

    return get(waitForNone(postList.map((page) => getCurrentPostsQuery(page))));
  },
});
