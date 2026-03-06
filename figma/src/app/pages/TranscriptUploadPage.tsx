{/*
  Front end TextScript file for "Resume Upload" page.
*/}

import React from 'react';
import { AuthHeader } from '../components/AuthHeader';
import { Upload } from 'lucide-react';
import { Logo } from '../components/Logo';

export default function TranscriptUploadPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <AuthHeader title="Degree Center" />
      
      <div className="p-8">
        
        {/* Transcript Upload Section */}
        <div id="resume-upload-section" className="bg-white rounded-3xl p-12 shadow-lg">
          <h3 className="text-4xl text-center mb-12 text-blue-800">Upload Transcript</h3>
          <div className="grid grid-cols-2 gap-16 max-w-4xl mx-auto">
            
            {/* Have transcript */}
            <div className="text-center">
              <p className="text-xl mb-6 text-blue-700">Have a transcript? Drop it below!</p>
              <div className="bg-blue-50 border-2 border-blue-600 rounded-2xl p-12 flex items-center justify-center min-h-[200px] hover:bg-blue-100 transition-colors cursor-pointer">
                <Upload className="w-24 h-24 text-blue-700" />
              </div>
            </div>
      
            {/* No transcript */}
            <div className="text-center">
              <p className="text-xl mb-6 text-blue-700">"This is tentative."</p>
              <div className="bg-gray-100 border-2 border-gray-300 rounded-2xl p-12 flex items-center justify-center min-h-[200px]">
                <span className="text-gray-500">Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}