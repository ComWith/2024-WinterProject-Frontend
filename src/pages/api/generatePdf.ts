import { NextApiRequest, NextApiResponse } from "next";

// Next.js API Route Configuration
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // 허용되는 본문 크기를 10MB로 설정
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { instrument, title, composer, level, file } = req.body;

    // 입력값 검증
    if (!instrument || !title || !composer || !level || !file) {
      return res.status(400).json({
        error:
          "All fields (instrument, title, composer, level, file) are required.",
      });
    }

    // PDF URL 생성 (여기서는 임시 URL 사용)
    const pdfUrl = `https://example.com/pdf/${encodeURIComponent(
      title
    )}-${encodeURIComponent(composer)}-${encodeURIComponent(
      instrument
    )}-${encodeURIComponent(level)}.pdf`;

    console.log("Generated PDF URL:", pdfUrl);

    // 응답으로 생성된 PDF URL 반환
    return res.status(200).json({ pdf_url: pdfUrl });
  } else {
    // POST 외의 메소드에 대해서는 405 상태 코드 반환
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
