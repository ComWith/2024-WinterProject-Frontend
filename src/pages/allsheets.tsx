import NavigationBar from "@/widgets/header";
import { useEffect, useState } from "react";
import style from "@/styles/allsheet.module.css";
import Image from "next/image";

type Score = {
  title: string;
  composer: string;
  sheet_id: string;
};

export default function AllSheet() {
  const [scores, setScores] = useState<Score[]>([]);

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
      console.log(scores);
    }

    fetchScores();
  }, []);

  return (
    <>
      <NavigationBar />
      <div className={style.window}>
        <div className={style.container}>
          <div className={style.container}>
            <h1 className={style.titleContainer}>Uploaded Scores</h1>
            <p className={style.subtitle}>
              View and manage your converted PDF scores.
            </p>
          </div>

          <div className={style.list}>
            {scores.map((score, index) => (
              <div key={index} className={style.row}>
                <div className={style.Item}>
                  <div className={style.frame}>
                    <Image src="/sheet.svg" alt="Icon" width={90} height={90} />
                  </div>
                  <div className={style.Box}>
                    <div className={style.title}>{score.title}</div>
                    <div className={style.subtitle}>{score.composer}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
