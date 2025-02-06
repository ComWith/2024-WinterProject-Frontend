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
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]); // 업로드된 영상 URL 배열
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { sheet_id } = router.query; // sheet_id를 URL 파라미터에서 가져옵니다.

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

  const handleVideoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const response = await axios.post(
        `https://smini.site//musicsheets/${sheet_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadedVideos((prev) => [...prev, response.data.video_path]); // 서버에서 반환된 영상 URL 추가
    } catch (error) {
      console.error("Error uploading video:", error);
      setError("Failed to upload video");
    } finally {
      setUploading(false);
    }
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

        {showPreview && (
          <div className={style.preview}>
            <iframe
              src={`${musicsheet.pdf_url}#toolbar=0`}
              width="100%"
              height="600px"
              className={style.iframe}
            ></iframe>
          </div>
        )}

        <div className={style.uploadSection}>
          <h3>Upload Your Performance</h3>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            disabled={uploading}
          />
          {uploading && <p>Uploading...</p>}
        </div>

        <div className={style.videoList}>
          <h3>Uploaded Videos</h3>
          {uploadedVideos.length > 0 ? (
            uploadedVideos.map((videoUrl, index) => (
              <div key={index} className={style.videoItem}>
                <video controls width="100%">
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))
          ) : (
            <p>No videos uploaded yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
