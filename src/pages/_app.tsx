import { useEffect, useState } from "react";
import axios from "axios";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<number>(0); // 마지막 refresh 시간
  const router = useRouter();

  // Refresh token을 서버에 보내 새로운 access token을 받는 함수
  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "https://smini.site/refresh",
        {},
        {
          withCredentials: true, // 쿠키 기반 인증을 위해 설정
        }
      );

      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken); // 상태 업데이트

      console.log("새로운 토큰 발급:", newAccessToken); // 업데이트된 토큰 확인
      localStorage.setItem("access_token", newAccessToken); // 로컬 스토리지에 저장
      setLastRefresh(Date.now()); // 마지막 갱신 시간 기록
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  // `accessToken`이 변경될 때마다 로그 확인 (상태 업데이트가 반영되었는지 체크)
  useEffect(() => {
    console.log("업데이트된 accessToken:", accessToken);
  }, [accessToken]);

  // 페이지 로드 시 로그인 상태 확인 후, 주기적으로 토큰 갱신
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");

    if (!storedToken) {
      console.log("No Login");
      return;
    }

    // 특정 경로에서는 refresh 요청을 하지 않음
    const excludedPaths = ["/", "/signup"];
    if (excludedPaths.includes(router.pathname)) {
      return;
    }

    // 1시간이 지난 경우에만 refresh 요청
    const now = Date.now();
    if (now - lastRefresh >= 60 * 60 * 1000) {
      refreshAccessToken();
    }

    // 페이지 변경 시마다 토큰 갱신
    const handleRouteChange = () => {
      if (Date.now() - lastRefresh >= 60 * 60 * 1000) {
        refreshAccessToken();
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [lastRefresh]); // `router.pathname` 제거 → 불필요한 리렌더링 방지

  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
