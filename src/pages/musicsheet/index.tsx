import NavigationBar from "@/widgets/header";
import { useEffect, useState } from "react";
import style from "./index.module.css";

interface MusicSheet {
  sheet_id: number;
  title: string;
}

const ITEMS_PER_PAGE = 8; // 페이지당 표시할 항목 수

export default function MusicSheetList() {
  const [musicSheets, setMusicSheets] = useState<MusicSheet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMusicSheets = async () => {
      try {
        const response = await fetch("/api/allsheets");
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        const data = await response.json();
        setMusicSheets(data.musicsheet);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMusicSheets();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = musicSheets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(musicSheets.length / ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={style.container}>
      <NavigationBar />
      <div className={style.header}>
        <h1>Uploaded Scores</h1>
        <p>View and manage your converted PDF scores.</p>
      </div>
      <div className={style.sheet_list}>
        {currentItems.map((sheet) => (
          <div key={sheet.sheet_id} className={style.sheet_card}>
            <div className={style.sheet_info}>
              <h2>{sheet.title}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className={style.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}
