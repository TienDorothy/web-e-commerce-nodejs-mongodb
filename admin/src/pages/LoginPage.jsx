import React from "react";

import Login from "../components/Login";

const LoginPage = () => {
  return (
    <>
      <section
        id="login"
        className="flex justify-center items-start bg-cover bg-center w-full h-screen "
      >
        <Login />
      </section>
    </>
  );
};
export default LoginPage;
