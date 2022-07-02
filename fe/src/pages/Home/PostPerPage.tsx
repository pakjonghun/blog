import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loadable, useRecoilState } from "recoil";
import { ResponseGetPosts } from "../../apis/apisTypes";
import MyStatus, { Mood } from "../../components/MyStatus";
import PostTitle from "../../components/PostTitle";
import Spin from "../../components/Spin";
import VirtualizedItem from "../../components/VirtualizedItem";
import useInfinityScroll from "../../hooks/useInfinityScroll";
import {
  memoryScrollState,
  postPageState,
  showNoResultMessageState,
} from "../../recoil/home/atom";

import MarkdownIt from "markdown-it";

interface props {
  loadablePosts: Loadable<ResponseGetPosts>;
  index: number;
}

const PostsPerPage: React.FC<props> = ({ index, loadablePosts }) => {
  const [page, setPage] = useRecoilState(postPageState);
  const [scrollTop, setScrollTop] = useRecoilState(memoryScrollState);
  const [isNoResult, setIsNoResult] = useRecoilState(showNoResultMessageState);

  const onScroll: IntersectionObserverCallback = useCallback(
    (extras) => {
      if (extras[0].isIntersecting) {
        setScrollTop(document.documentElement.scrollTop);
        setPage((pre) => pre + 1);
      }
    },
    [setScrollTop, setPage]
  );

  useEffect(() => {
    window.scrollTo({ top: scrollTop, left: 0 });
  }, [scrollTop]);

  const ref = useInfinityScroll({
    callback: onScroll,
    shouldObserve: page - 1 === index,
  });

  const onAnimationEnd = useCallback(() => {
    setIsNoResult(false);
  }, [setIsNoResult]);

  switch (loadablePosts.state) {
    case "loading":
      return (
        <ul
          className='relative flex flex-col justify-center items-center mt-10
     md:space-y-0 md:grid md:grid-cols-2 md:place-items-center md:gap-9 pb-16'
        >
          {Array((page - 1) * 10)
            .fill(0)
            .map((_, index) => (
              <VirtualizedItem isLoading={true} key={index} height={333}>
                <></>
              </VirtualizedItem>
            ))}
          {page - 1 === index && (
            <li className='absolute bottom-0 flex justify-center items-center h-10'>
              <Spin />
            </li>
          )}
        </ul>
      );
    case "hasValue": {
      const md = new MarkdownIt();

      return (
        <ul
          className='relative flex flex-col justify-center items-center mt-10 space-y-9
         md:space-y-0 md:grid md:grid-cols-2 md:place-items-center md:gap-9'
        >
          {loadablePosts.contents.data.map(({ id, head, body }) => {
            let mood: Mood;
            if (head.category.includes("algo")) mood = "embarassed";
            else if (head.category.includes("aws")) mood = "annoyed";
            else if (head.category.includes("type")) mood = "interesting";
            else if (head.category.includes("til")) mood = "good";
            else mood = "good";

            const post = md.render(body);

            return (
              <VirtualizedItem isLoading={false} key={id} height={333}>
                <div className='flex flex-col px-5 py-5 space-y-2 max-w-[384px] shadow-md rounded-md bg-gray-50'>
                  <MyStatus mood={mood} date={head.date} />
                  <div className='h-[1px] bg-gray-200' />
                  <PostTitle postTitle={id} />
                  <span
                    className='html h-[10rem] text-sm text-gray-800 overflow-hidden'
                    dangerouslySetInnerHTML={{
                      __html: `${post.substring(0, 300)}...`,
                    }}
                  />

                  <Link
                    to={`/${id}`}
                    className='text-center py-2 px-3 bg-gray-600 rounded-md shadow-md text-xs font-medium text-gray-50 scale-xs transition-all duration-75'
                  >
                    Read More
                  </Link>
                </div>
              </VirtualizedItem>
            );
          })}
          {page - 1 === index && (
            <li
              ref={loadablePosts.contents.data.length ? ref : null}
              className='absolute bottom-0 flex justify-center items-center h-10'
            >
              {loadablePosts.contents.data.length === 0 && isNoResult && (
                <span
                  onAnimationEnd={onAnimationEnd}
                  className='text-gray-800 font-medium text-sm animate-[fadeOut_5s_ease-in] origin-bottom'
                >
                  더 이상 겁색 결과가 없습니다.
                </span>
              )}
            </li>
          )}
        </ul>
      );
    }

    default:
      throw new Error("error on posts");
  }
};

export default PostsPerPage;
