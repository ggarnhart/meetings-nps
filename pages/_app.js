import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import AppWrapper from "../components/State";
import AuthWrapper from "../AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <AuthWrapper>
        <Component {...pageProps} />
      </AuthWrapper>
    </AppWrapper>
  );
}

export default MyApp;
