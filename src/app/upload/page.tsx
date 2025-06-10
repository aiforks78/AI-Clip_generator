"use client";

import { useState } from "react";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setVideoUrl(data.path);
    setIsUploading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10 space-y-6">
      <h1 className="text-2xl font-bold">Upload a Video</h1>

      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={isUploading}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>

      {videoUrl && (
        <div className="mt-6 w-full max-w-2xl">
          <video controls className="w-full rounded-lg shadow">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </main>
  );
}
