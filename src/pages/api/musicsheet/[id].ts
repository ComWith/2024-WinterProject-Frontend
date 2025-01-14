import { NextApiRequest, NextApiResponse } from "next";

const mockData = [
  {
    id: 1,
    instrument: "Piano",
    stage: "Intermediate",
    pdf_url: "/example-piano.pdf",
  },
  {
    id: 2,
    instrument: "Violin",
    stage: "Beginner",
    pdf_url: "/example-violin.pdf",
  },
  {
    id: 3,
    instrument: "Guitar",
    stage: "Advanced",
    pdf_url: "/example-guitar.pdf",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    const musicsheet = mockData.find((item) => item.id === Number(id));
    if (musicsheet) {
      res.status(200).json({ musicsheet });
    } else {
      res.status(404).json({ error: "Music sheet not found" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
