import React from "react";
import Navbar from "../components/Navbar";
import "../app/globals.css";
import AuthChecker from "../components/AuthChecker";

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex w-screen h-screen">
      <AuthChecker>
        <Navbar />
        <Component {...pageProps} />
      </AuthChecker>
    </div>
  );
}

export default MyApp;
