import React from "react";
import Navigator from "../../components/Navigator";
import Categories from "./Categories";
import LeftMenu from "./LeftMenu";
import Posts from "./Posts";
import Search from "./Search";

const Home = () => {
  return (
    <section className='px-10 mx-auto h-full max-w-screen-lg bg-gray-100'>
      <LeftMenu />
      <div className='sticky top-0 pt-3 pb-10 bg-gray-100 z-10'>
        <Navigator />
        <Search />
        <Categories
          categoriyList={["algo", "sql", "tailwind", "webpack", "javascript"]}
        />
      </div>
      <div className='min-h-[75vh]'>
        <Posts />
      </div>
    </section>
  );
};

export default Home;
