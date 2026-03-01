import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../App';
import { Upload, FileText, CheckCircle, X, GraduationCap, ArrowLeft } from 'lucide-react';

export default function EducationPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: string; date: string }>>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
        date: new Date().toLocaleDateString(),
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files).map(file => ({
        name: file.name,
        size: (file.size / 1024).toFixed(2) + ' KB',
        date: new Date().toLocaleDateString(),
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen" style={{ background: '#fafbfc' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-lg" style={{ background: 'rgba(255, 255, 255, 0.8)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold text-lg" style={{ background: 'var(--gradient-primary)' }}>
              F
            </div>
            <span className="text-2xl font-semibold" style={{ color: 'var(--foreground)' }}>FutureFlow Hub</span>
          </div>
          <nav className="flex items-center gap-6">
            <button onClick={() => navigate('/dashboard')} className="text-base hover:opacity-70 transition-opacity" style={{ color: 'var(--muted)' }}>
              Dashboard
            </button>
            <button onClick={() => navigate('/career-center')} className="text-base hover:opacity-70 transition-opacity" style={{ color: 'var(--muted)' }}>
              Career Center
            </button>
            <button onClick={() => navigate('/degree-center')} className="text-base hover:opacity-70 transition-opacity" style={{ color: 'var(--muted)' }}>
              Degree Center
            </button>
            <button 
              onClick={() => navigate('/settings')}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold"
              style={{ background: 'var(--gradient-primary)' }}
            >
              {user?.firstName?.charAt(0) || 'U'}
            </button>
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/degree-center')}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl hover:opacity-70 transition-opacity"
          style={{ color: 'var(--primary-blue)' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Degree Center
        </button>

        {/* Page Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-5xl font-bold" style={{ color: 'var(--foreground)' }}>
              Education Transcripts
            </h1>
          </div>
          <p className="text-xl" style={{ color: 'var(--muted)' }}>
            Upload and manage your academic transcripts
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <div 
            className="p-12 rounded-2xl border-2 border-dashed transition-all cursor-pointer"
            style={{ 
              background: isDragging ? 'var(--gradient-subtle)' : 'var(--surface)',
              borderColor: isDragging ? 'var(--primary-blue)' : 'var(--border-light)',
              boxShadow: 'var(--shadow-md)'
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--gradient-subtle)' }}>
                <Upload className="w-8 h-8" style={{ color: 'var(--primary-blue)' }} />
              </div>
              <h3 className="text-2xl font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                Drop your transcripts here
              </h3>
              <p className="mb-4" style={{ color: 'var(--muted)' }}>
                or click to browse your files
              </p>
              <p className="text-sm" style={{ color: 'var(--muted-light)' }}>
                Supports PDF, JPG, PNG (max 10MB)
              </p>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="p-8 rounded-2xl" style={{ background: 'var(--surface)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)' }}>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-6 h-6" style={{ color: 'var(--primary-blue)' }} />
              <h3 className="text-2xl font-semibold" style={{ color: 'var(--foreground)' }}>
                Uploaded Files
              </h3>
            </div>
            <div className="space-y-4">
              {uploadedFiles.map((file, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{ background: 'var(--gradient-subtle)' }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--surface)' }}>
                      <FileText className="w-5 h-5" style={{ color: 'var(--primary-blue)' }} />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'var(--foreground)' }}>{file.name}</p>
                      <p className="text-sm" style={{ color: 'var(--muted)' }}>
                        {file.size} • Uploaded on {file.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" style={{ color: 'var(--success)' }} />
                    <button
                      onClick={() => removeFile(index)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center hover:opacity-70 transition-opacity"
                      style={{ background: 'var(--surface)' }}
                    >
                      <X className="w-4 h-4" style={{ color: 'var(--error)' }} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info Card */}
        <div className="mt-8 p-6 rounded-xl" style={{ background: 'var(--gradient-subtle)', border: '1px solid var(--border-light)' }}>
          <h4 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
            Why upload transcripts?
          </h4>
          <p style={{ color: 'var(--muted)' }}>
            Uploading your transcripts helps us provide more accurate degree progress tracking and personalized course recommendations. Your documents are securely stored and only visible to you.
          </p>
        </div>
      </div>
    </div>
  );
}
