{/*
  Front end TextScript file for "Resume Upload" page.
*/}

// import React from 'react';
import { AuthHeader } from '../components/AuthHeader';
import { Upload } from 'lucide-react';
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
// import { Logo } from '../components/Logo';

export default function ResumeHandler() {

  const [file, setFile] = useState<File | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (file && !loading) {
      handleResumeUpload();
    }
  }, [file])

  const handleClick = () => {
    fileInputRef.current?.click();
  }

  const handleResumeUpload = async() => {

    if (!file) return;

    setLoading(true);

    try {

      const formData = new FormData();
      formData.append("File", file);

      const res = await fetch("https://your-api-url.amazonaws.com/EXAMPLE", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Upload successful.", data);

    } catch (err) {
      console.error("Upload error.", err);
    }

    setLoading(false);

};

  const handleResumeRec = async() => {

      if (!file) {
        alert("Upload a resume first.");
        return;
      }

      setLoading(true);

      try {
        
        const formData = new FormData();
        formData.append("resume", file);

        const res = await fetch("https://your-api-url.amazonaws.com/EXAMPLE", {
          method: "POST",
          body: formData,
        });
        
        const data = await res.json();

        setRecommendations(data.recommendations);

      } catch (err) {
        console.error("Unexpected error occurred.");
      }

      setLoading(false);

  }

  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <AuthHeader title="Career Center" />
      
      <div className="p-8">

        <div className = "bg-white rounded-3xl p-12 shadow-lg">
          <h3 className="text-4xl text-center mb-12 text-blue-800">
            FutureTools for Resume
          </h3>

          <div className = "grid grid-cols-2 gap-16 max-w-5xl mx-auto">

            {/* LEFT: Resume Upload */}
            <div id="resume-upload-section" className="bg-white rounded-3xl p-12 shadow-lg">
              <h3 className="text-4xl text-center mb-12 text-blue-800"> Upload Your Resume </h3>
              <button onClick={handleClick}
                      style = {{
                        margin: "0 auto",
                        backgroundColor: "#eff6ff", // bg-blue-50
                        borderWidth: "2px",         // border-2
                        borderStyle: "solid",
                        borderColor: "#2563eb",     // border-blue-600
                        borderRadius: "1rem",       // rounded-2xl
                        padding: "3rem",            // p-12
                        display: "flex",            // flex
                        alignItems: "center",       // items-center
                        justifyContent: "center",   // justify-center
                        minHeight: "200px",         // min-h-[200px]
                        cursor: "pointer",          // cursor-pointer
                        transition: "background-color 0.2s ease-in-out", // transition-colors
                        outline: "none",
                      }}>
                {file ? file.name : "Upload Resume" }
              </button>
              <input
                type = "file"
                ref = {fileInputRef}
                style = {{ display: "none" }}
                onChange = {(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </div>

            {/* RIGHT: Resume Recommender */}
            <div id="resume-recommender-section" className="bg-white rounded-3xl p-12 shadow-lg">
              <h3 className="text-4xl text-center mb-12 text-blue-800"> Resume Recommender </h3>
              <button onClick = {handleResumeRec}
                      style = {{
                        margin: "0 auto",
                        backgroundColor: "#eff6ff",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        borderColor: "#2563eb",
                        borderRadius: "1rem",
                        padding: "3rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "200px",
                        cursor: "pointer",
                        transition: "background-color 0.2s ease-in-out",
                      }}> Resume Recommender </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}