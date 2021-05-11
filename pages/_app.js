import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import AppWrapper from "../components/State";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}

export default MyApp;
