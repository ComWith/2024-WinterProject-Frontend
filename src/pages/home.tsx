import { useEffect, useState } from "react";
import { useAuthStore } from "@/authStore";
import { useRouter } from "next/router";
import NavigationBar from "@/widgets/header";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function Home() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // 로그인 상태
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/"); // 로그인 페이지로 리다이렉트
    }
  }, [isLoggedIn, router]);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "audio/*": [],
    },
  });

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("user_id", "user123"); // 사용자 ID (예시)
    formData.append("file", file);
    formData.append("title", "Example Title"); // 예시 제목
    formData.append("composer", "Composer Name"); // 작곡가
    formData.append("instrument", "Instrument Name"); // 악기
    formData.append("stage", "Stage Name"); // 스테이지

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Uploaded successfully:", response.data.pdf_url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div style={{ paddingTop: "60px" }}>
        <h1>hello, Next!</h1>
        <div
          {...getRootProps()}
          style={{
            border: "2px dashed #ccc",
            padding: "20px",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <input {...getInputProps()} />
          <p>
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        </div>
        {file && <p>Selected file: {file.name}</p>}
        <button onClick={handleUpload} disabled={!file}>
          Upload File
        </button>
      </div>
    </div>
  );
}
