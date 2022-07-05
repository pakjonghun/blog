import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValueLoadable } from "recoil";
import MyStatus from "../../components/MyStatus";
import Navigator from "../../components/Navigator";
import PostTitle from "../../components/PostTitle";
import { getPostDeatilQuery } from "../../recoil/detail/selector";
import MarkdownIt from "markdown-it";
import Spin from "../../components/Spin";

const Detail = () => {
  const { pathname } = useLocation();
  const path = decodeURI(pathname).replace("/", "");

  const detail = useRecoilValueLoadable(getPostDeatilQuery(path));

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  switch (detail.state) {
    case "loading":
      return (
        <div className='flex items-center justify-center h-screen w-full'>
          <Spin />
        </div>
      );
    case "hasValue": {
      const md = new MarkdownIt();
      const post = md.render(detail.contents.body);
      return (
        <section className='min-h-[100vh] pt-3 pb-10 px-5 space-y-6 mx-auto max-w-screen-lg bg-gray-100'>
          <Navigator canBack={true} />
          <PostTitle postTitle={detail.contents.id.replace(".md", "")} />
          <MyStatus mood='good' date={"asdf"} />
          <div
            className='html pt-3 font-medium text-sm text-gray-500'
            dangerouslySetInnerHTML={{ __html: post }}
          />
        </section>
      );
    }
    default:
      throw new Error("Error on detail");
  }
};

export default Detail;
