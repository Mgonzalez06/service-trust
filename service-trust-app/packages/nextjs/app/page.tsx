"use client";

import Link from "next/link";
import type { NextPage } from "next";
import Login from "./login/page";

const Home: NextPage = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default Home;
