import { useEffect, useState } from "react";
import axios from "axios";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<number>(0); // 마지막으로 refresh token을 보낸 시간
  const router = useRouter();

  // Refresh token을 서버에 보내 새로운 access token을 받는 함수
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "http://52.78.134.101:5000/refresh", // 서버의 refresh token API
        {},
        {
          withCredentials: true, // 쿠키에 저장된 refresh token을 자동으로 보내기 위해
        }
      );
      const newAccessToken = response.data.accessToken; // 서버에서 새로운 access token을 받음
      setAccessToken(newAccessToken); // 상태에 새로운 access token 저장
      localStorage.setItem("access_token", newAccessToken); // 로컬 스토리지에도 새로운 access token 저장
      setLastRefresh(Date.now()); // 마지막 갱신 시간 저장
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  // 페이지가 로드될 때, 로그인 상태 확인 후 1시간마다 refresh token을 보내서 access token을 갱신
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      // 로그인되지 않은 상태에서 접근하면 로그인 페이지로 리다이렉트
      console.log("No Login");
      return;
    }

    // 현재 경로가 '/' 또는 '/signup'일 경우 리프레시 토큰 요청을 하지 않음
    const excludedPaths = ["/", "/signup"];
    const currentPath = router.pathname;

    if (excludedPaths.includes(currentPath)) {
      return; // 리프레시 요청을 하지 않음
    }

    // 1시간이 지난 경우에만 refresh token을 보내도록 함
    const now = Date.now();
    if (now - lastRefresh >= 60 * 60 * 1000) {
      refreshAccessToken(); // 새로운 access token을 요청
    }

    // 페이지가 변경될 때마다 (useEffect에 router를 의존성 배열에 추가) refresh token을 갱신
    const handleRouteChange = () => {
      if (now - lastRefresh >= 60 * 60 * 1000) {
        refreshAccessToken(); // 1시간이 지났다면 요청
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router, lastRefresh]);

  return (
    <div>
      {/* 전역적으로 토큰을 사용하거나, 페이지 레벨에서 사용할 수 있습니다. */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
