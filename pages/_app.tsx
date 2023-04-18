import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StyledEngineProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Script from "next/script";
import { AuthContextProvider } from "../contexts/auth/authContext";
import RouteGuard from "../contexts/auth/RouteGuard";
import { enqueueSnackbar, SnackbarProvider } from "notistack";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: Infinity, networkMode: "always" },
    mutations: {
      networkMode: "always",
      onError: () => enqueueSnackbar("Something went wrong..."),
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <Script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        type="text/javascript"
      ></Script>
      <SnackbarProvider maxSnack={1} autoHideDuration={3000}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <RouteGuard Component={Component} {...pageProps} />
          </AuthContextProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
