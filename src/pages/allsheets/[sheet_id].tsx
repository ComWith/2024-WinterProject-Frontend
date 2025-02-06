import { useState, useEffect } from "react";
import NavigationBar from "@/widgets/header";
import Image from "next/image";
import style from "./[sheet_id].module.css";
import axios from "axios";
import { useRouter } from "next/router";

type MusicSheet = {
  instrument: string;
  stage: string;
  pdf_url: string;
};

export default function MusicSheetPage() {
  const [musicsheet, setMusicsheet] = useState<MusicSheet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();
  const { sheet_id } = router.query;

  useEffect(() => {
    if (!sheet_id) return;

    // 더미 데이터 처리
    if (sheet_id === "dummy_id") {
      setMusicsheet({
        instrument: "Piano",
        stage: "Beginner",
        pdf_url: "/dummy.pdf",
      });
      return;
    }

    const fetchMusicSheet = async () => {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        setError("No access token found.");
        return;
      }

      try {
        const response = await axios.get<MusicSheet>(
          `https://smini.site/musicsheets/${sheet_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        setMusicsheet(response.data);
      } catch (error) {
        console.error("Error fetching music sheet:", error);
        setError("Failed to load music sheet");
      }
    };

    fetchMusicSheet();
  }, [sheet_id]);

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  if (error) {
    return (
      <div className={style.error}>
        <h1>Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  if (!musicsheet) {
    return (
      <div className={style.error}>
        <h1>Music Sheet Not Found</h1>
        <p>The requested music sheet could not be found.</p>
      </div>
    );
  }

  return (
    <>
      <NavigationBar />
      <div className={style.window}>
        <h1 className={style.title}>Music Scores</h1>
        <div className={style.content}>
          <div className={style.icon}>
            <Image
              src="/sheet.svg"
              alt="Music Sheet Icon"
              width={90}
              height={90}
            />
          </div>
          <h2 className={style.subtitle}>{musicsheet.instrument}</h2>
          <p className={style.description}>
            Difficulty Level: {musicsheet.stage}
          </p>
          <div className={style.buttons}>
            <button onClick={handlePreview} className={style.button}>
              {showPreview ? "Close Preview" : "Preview PDF"}
            </button>
            <a
              href={musicsheet.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className={style.button}
            >
              Download PDF
            </a>
          </div>
        </div>

        {showPreview && musicsheet.pdf_url && (
          <div className={style.preview}>
            <iframe
              src={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
                musicsheet.pdf_url
              )}`}
              width="100%"
              height="600px"
              className={style.iframe}
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
}
