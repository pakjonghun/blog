import React from "react";

interface props {
  postTitle: string;
}

const PostTitle: React.FC<props> = ({ postTitle }) => {
  return <h1 className='pt-2 font-bold text-gray-800'>{postTitle}</h1>;
};

export default PostTitle;
