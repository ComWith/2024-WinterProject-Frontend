import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

interface SheetData {
  sheet_id: string;
  title: string;
  composer: string;
  instrument: string;
  level: string;
  pdf_url: string;
}

const sheets: { [key: string]: SheetData } = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = formidable({
      multiples: true,
      maxFileSize: 10 * 1024 * 1024,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Form parsing error:", err);
        return res.status(400).json({ error: "Failed to parse form data." });
      }

      const instrument = Array.isArray(fields.instrument)
        ? fields.instrument[0]
        : fields.instrument;
      const title = Array.isArray(fields.title)
        ? fields.title[0]
        : fields.title;
      const composer = Array.isArray(fields.composer)
        ? fields.composer[0]
        : fields.composer;
      const level = Array.isArray(fields.level)
        ? fields.level[0]
        : fields.level;

      const file = files.file;

      if (!instrument || !title || !composer || !level || !file) {
        return res.status(400).json({
          error:
            "All fields (instrument, title, composer, level, file) are required.",
        });
      }

      const sheet_id = uuidv4(); // 고유 sheet_id 생성
      const pdfUrl = `https://example.com/pdf/${encodeURIComponent(
        title as string
      )}-${encodeURIComponent(composer as string)}-${encodeURIComponent(
        instrument as string
      )}-${encodeURIComponent(level as string)}.pdf`;

      const sheetData: SheetData = {
        sheet_id,
        title,
        composer,
        instrument,
        level,
        pdf_url: pdfUrl,
      };

      sheets[sheet_id] = sheetData; // 메모리에 저장

      console.log("Generated PDF URL:", pdfUrl);

      res.status(200).json({ sheet_id, pdf_url: pdfUrl });
    });
  } else if (req.method === "GET") {
    const { sheet_id } = req.query;

    if (sheet_id) {
      // 개별 악보 조회
      if (typeof sheet_id !== "string" || !sheets[sheet_id]) {
        return res.status(404).json({ error: "Sheet not found" });
      }

      const { title, composer } = sheets[sheet_id];
      res.status(200).json({ sheet_id, title, composer });
    } else {
      // 모든 악보 조회
      const allSheets = Object.values(sheets).map((sheet) => ({
        title: sheet.title,
        sheet_id: sheet.sheet_id,
        composer: sheet.composer,
      }));

      res.status(200).json({ musicsheet: allSheets });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
