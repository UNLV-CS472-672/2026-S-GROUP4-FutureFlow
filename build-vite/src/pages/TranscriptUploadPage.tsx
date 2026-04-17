{/*
  Front end TextScript file for "Resume Upload" page.
*/}

// import React from 'react';
import { AuthHeader } from '../components/AuthHeader';
import { useState } from "react";
import { useRef } from "react";
import { uploadPDF } from "../api/uploads.api"
import { Upload } from "lucide-react"

export default function ResumeUploadPage(): JSX.Element {

  const [selectedFile, setSelectedFile] = useState< File | null >(null);
  const [message, setMessage] = useState< string >("");
  const [loading, setLoading] = useState< boolean >(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleUpload(): Promise<void> {

    if (!selectedFile) {
      setMessage("Please select a PDF.");
      return;
    }

    setLoading(true);
    setMessage("Uploading...");

    try {

      const result = await uploadPDF(selectedFile);

      setMessage("Upload successful!");
      console.log("File URL: ", result.fileUrl);
      
    } catch (error: unknown) {
    
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Upload failed.");
      }

    }

    setLoading(false);

  }

  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <AuthHeader title="Career Center" />

      <h3 className="text-5xl text-center mb-3 text-blue-800 pt-10">
        <strong> Transcript Page </strong>
      </h3>
      
      <div className="p-8">
        <div id = "Transcript-upload-section" className = "bg-white rounded-3xl p-12 shadow-lg">
          <h3 className="text-4xl text-center mb-12 text-blue-800"> Upload Your Transcript </h3>

          <input
            type = "file"
            accept = "application/pdf"
            ref = {fileInputRef}
            style = {{ display: "none" }}
            onChange = {(e) => {
              const file = e.target.files?.[0] ?? null;
              setSelectedFile(file);
            }}
          />

          <button
            onClick = {() => {
              if (!selectedFile) {
                fileInputRef.current?.click();
              } else {
                handleUpload();
              }
            }}
            className = "w-full bg-blue-50 border-2 border-blue-600 rounded-2xl p-10 hover:bg-blue-100 transition flex flex-row items-center justify-center gap-6"
          >
            <Upload size = {100} strokeWidth = {2} className = "text-blue-600 flex-shrink-0"/>
            <span className = "text-2xl text-blue-800 font-semibold whitespace-nowrap">
              { selectedFile ? selectedFile.name : "Click to Upload" }
            </span>
          </button>

        </div>

      </div>
    </div>
  );
}