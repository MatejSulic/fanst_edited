import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthContext } from "./authContext";
import { AUTH_ROUTES, UNPROTECTED_ROUTES_BASE_PATH } from "./routes";

const RouteGuard = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const authContext = useAuthContext();

  const isAuthRoute = () => AUTH_ROUTES.includes(router.pathname);

  const isRoutePublic = () =>
    router.pathname.startsWith(UNPROTECTED_ROUTES_BASE_PATH);

  // console.log(isRoutePublic());
  // console.log(!!(authContext?.user !== null && !isRoutePublic()));
  // console.log(isAuthRoute());

  const isRouteAllowed = () =>
    isRoutePublic() ||
    !!(authContext?.user !== null && !isRoutePublic()) ||
    isAuthRoute();
  // console.log(isRouteAllowed());

  useEffect(() => {
    if (!isRouteAllowed()) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (!isRouteAllowed()) {
      router.push("/login");
    }
  }, [router.pathname]);

  if (!isRouteAllowed()) {
    return null;
  } else {
    return <Component {...pageProps} />;
  }
};

export default RouteGuard;
