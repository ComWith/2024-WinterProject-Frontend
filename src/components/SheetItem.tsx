import type { musicSheetData } from "@/type";
import Link from "next/link";

export default function SheetItem({
  title,
  instrument,
  composer,
  stage,
  url,
}: musicSheetData) {
  return (
    <Link href={`allsheets/${url}`}>
      <div>
        <div>{title}</div>
        <div>{composer}</div>
        <div>{instrument}</div>
        <div>{stage}</div>
      </div>
    </Link>
  );
}
