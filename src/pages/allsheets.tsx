import NavigationBar from "@/widgets/header";
import { useEffect, useState } from "react";
import style from "./allsheets.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

type Score = {
  title: string;
  composer: string;
  sheet_id: string;
};

const ITEMS_PER_PAGE = 8; // 한 페이지에 보여줄 악보 개수

export default function AllSheet() {
  const [scores, setScores] = useState<Score[]>([]);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const router = useRouter();

  useEffect(() => {
    async function fetchScores(): Promise<void> {
      try {
        const response = await fetch("/api/generatePdf");
        if (!response.ok) {
          throw new Error("Failed to fetch scores");
        }
        const data = await response.json();
        console.log(data);

        // 데이터가 배열인지 확인하고, 그렇지 않으면 빈 배열로 설정
        if (Array.isArray(data.musicsheet)) {
          setScores(data.musicsheet);
        } else {
          setScores([]);
        }
      } catch (error) {
        console.error("Failed to load scores:", error);
        setScores([]); // 오류 발생 시 빈 배열로 설정
      }
    }

    fetchScores();
  }, []);

  // 현재 페이지에 표시할 악보 계산
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentScores = scores.slice(startIndex, endIndex);

  const handleImageClick = (sheet_id: string) => {
    router.push(`/allsheets/${sheet_id}`); // 개별 악보 페이지로 이동
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(scores.length / ITEMS_PER_PAGE)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className={style.window}>
        <div className={style.container}>
          <h1 className={style.titleContainer}>Uploaded Scores</h1>
          <p className={style.subtitle}>
            View and manage your converted PDF scores.
          </p>
          <div className={style.list}>
            {currentScores.map((score) => (
              <div
                key={score.sheet_id}
                className={style.Item}
                onClick={() => handleImageClick(score.sheet_id)}
              >
                <div className={style.frame}>
                  <Image
                    src="/sheet.svg"
                    alt={score.title}
                    width={90}
                    height={90}
                  />
                </div>
                <div className={style.Box}>
                  <div className={style.title}>{score.title}</div>
                  <div className={style.subtitle}>{score.composer}</div>
                </div>
              </div>
            ))}
          </div>

          {/* 페이지네이션 버튼 */}
          <div className={style.pagination}>
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={style.pageButton}
            >
              Previous
            </button>
            <span className={style.pageInfo}>
              Page {currentPage} of {Math.ceil(scores.length / ITEMS_PER_PAGE)}
            </span>
            <button
              onClick={handleNextPage}
              disabled={
                currentPage === Math.ceil(scores.length / ITEMS_PER_PAGE)
              }
              className={style.pageButton}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
