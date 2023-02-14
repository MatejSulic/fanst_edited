import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StyledEngineProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Script from "next/script";
import { AuthContextProvider } from "../contexts/auth/authContext";
import RouteGuard from "../contexts/auth/RouteGuard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: Infinity, networkMode: "always" },
    mutations: { networkMode: "always" },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <Script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        type="text/javascript"
      ></Script>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <RouteGuard Component={Component} {...pageProps} />
        </AuthContextProvider>
      </QueryClientProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
