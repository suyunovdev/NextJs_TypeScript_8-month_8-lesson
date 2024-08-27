import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header flex items-center justify-between px-10 py-5 bg-red-500">
      <div className="left flex items-center gap-5 text-3xl font-semibold text-white">
        <FaGithub />
        <h1 className="text-3xl xl:text-1xl"> Github Finder</h1>
      </div>
      <div className="right text-white flex items-center justify-center gap-5">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </div>
    </div>
  );
};

export default Header;
