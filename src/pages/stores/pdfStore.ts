// stores/pdfStore.ts
import { create } from "zustand";

interface PdfStore {
  pdfUrls: string[]; // 배열로 변경
  addPdfUrl: (url: string) => void;
}

export const usePdfStore = create<PdfStore>((set) => ({
  pdfUrls: [], // 초기값을 빈 배열로 설정
  addPdfUrl: (url) =>
    set((state) => ({
      pdfUrls: [...state.pdfUrls, url], // 기존 URL에 새 URL 추가
    })),
}));
