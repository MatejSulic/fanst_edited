import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StyledEngineProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Script from "next/script";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <Script
          src="https://widget.cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></Script>
        <Component {...pageProps} />
      </QueryClientProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
