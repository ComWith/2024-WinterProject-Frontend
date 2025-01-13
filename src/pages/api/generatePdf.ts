import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

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

      // 배열인지 확인하고 첫 번째 요소 가져오기
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

      const pdfUrl = `https://example.com/pdf/${encodeURIComponent(
        title as string
      )}-${encodeURIComponent(composer as string)}-${encodeURIComponent(
        instrument as string
      )}-${encodeURIComponent(level as string)}.pdf`;

      console.log("Generated PDF URL:", pdfUrl);

      res.status(200).json({ pdf_url: pdfUrl });
    });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
