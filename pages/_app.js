import Layout from "components/Layout/Layout";
import AuthProvider from "providers/AuthProvider";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <ToastContainer />
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
