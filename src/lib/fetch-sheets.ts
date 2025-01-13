import { musicSheetData } from "@/type";

export default async function fecthSheets(
  q?: string
): Promise<musicSheetData[]> {
  let url = `/api/generatePdf`;

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}
