import React from "react";
import { useRecoilValueLoadable } from "recoil";
import Spin from "../../components/Spin";
import { getPostsQuery } from "../../recoil/home/selector";
import PostsPerPage from "./PostPerPage";

const Posts = () => {
  const postList = useRecoilValueLoadable(getPostsQuery);
  switch (postList.state) {
    case "loading":
      return (
        <div className='flex justify-center items-center w-full h-full'>
          <Spin />
        </div>
      );

    case "hasValue":
      return (
        <>
          {postList.contents.map((loadablePosts, index) => (
            <PostsPerPage
              key={index}
              index={index}
              loadablePosts={loadablePosts}
            />
          ))}
        </>
      );

    default:
      throw new Error("error on posts");
  }
};

export default Posts;
