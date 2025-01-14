import { NextApiRequest, NextApiResponse } from "next";

// 가짜 데이터 생성
const mockScores = [
  {
    title: "Moonlight Sonata",
    sheet_id: 1,
  },
  {
    title: "Für Elise",
    sheet_id: 2,
  },
  {
    title: "Canon in D",
    sheet_id: 3,
  },
  {
    title: "The Four Seasons",
    sheet_id: 4,
  },
  {
    title: "왕벌의 비행",
    sheet_id: 5,
  },
  {
    title: "젓가락 행진곡",
    sheet_id: 6,
  },
  {
    title: "환상즉흥곡",
    sheet_id: 7,
  },
  {
    title: "월광",
    sheet_id: 8,
  },
  {
    title: "흑건",
    sheet_id: 9,
  },
  {
    title: "추격",
    sheet_id: 10,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // GET 요청에 대해 mockScores 데이터 반환
    res.status(200).json(mockScores);
  } else {
    // 다른 메서드는 허용하지 않음
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
