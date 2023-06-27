import React from "react";
import Navbar from "../components/Navbar";
import "../app/globals.css";
import AuthChecker from "../components/AuthChecker";
import WhatsAppButton from "../components/whatsappBtn";

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex ">
      <AuthChecker>
        <Navbar />
        <Component {...pageProps} />
        <WhatsAppButton />
      </AuthChecker>
    </div>
  );
}

export default MyApp;
