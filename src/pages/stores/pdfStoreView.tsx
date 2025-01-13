import { usePdfStore } from "./pdfStore"; // 경로를 적절히 수정하세요
import { useEffect } from "react";

const PdfViewer = () => {
  const pdfUrls = usePdfStore((state) => state.pdfUrls);

  useEffect(() => {
    // pdfUrls를 콘솔에 출력
    console.log("Current PDF URLs:", pdfUrls);
  }, [pdfUrls]); // pdfUrls가 변경될 때마다 출력

  return (
    <div>
      <h1>PDF URLs</h1>
      <ul>
        {pdfUrls.map((url, index) => (
          <li key={index}>{url}</li>
        ))}
      </ul>
    </div>
  );
};

export default PdfViewer;
