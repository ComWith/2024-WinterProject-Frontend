import NavigationBar from "@/widgets/header";
import { usePdfStore } from "./stores/pdfStore";

const AllSheets = () => {
  // zustand에서 pdfUrls 배열을 가져옴
  const pdfUrls = usePdfStore((state) => state.pdfUrls);
  console.log(pdfUrls);

  return (
    <div>
      <NavigationBar />
      <h1>PDF URLs</h1>
      <div>
        {pdfUrls.length > 0 ? (
          pdfUrls.map((url, index) => (
            <div key={index}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                PDF {index + 1}
              </a>
            </div>
          ))
        ) : (
          <p>No PDFs available.</p>
        )}
      </div>
    </div>
  );
};

export default AllSheets;
