import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer/>
        <Layout>
          <Component {...pageProps} />;
        </Layout>
    </>
  );
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
