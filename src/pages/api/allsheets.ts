import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // HTTP 메서드에 따라 동작을 다르게 설정 가능
  if (req.method === "GET") {
    // 예시 데이터
    const musicsheet = [
      { title: "사계", sheet_id: 1 },
      { title: "왕벌의 비행", sheet_id: 2 },
      { title: "젓가락 행진곡", sheet_id: 3 },
      { title: "환상즉흥곡", sheet_id: 4 },
      { title: "월광", sheet_id: 5 },
      { title: "흑건", sheet_id: 6 },
      { title: "추격", sheet_id: 7 },
      { title: "신세계 교향곡", sheet_id: 8 },
      { title: "작은 별", sheet_id: 9 },
      { title: "운명", sheet_id: 10 },
      { title: "환희의 송가", sheet_id: 11 },
      { title: "레퀴엠", sheet_id: 12 },
    ];

    // JSON 형태로 데이터 반환
    res.status(200).json({ musicsheet });
  } else {
    // 허용되지 않은 메서드에 대한 처리
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
