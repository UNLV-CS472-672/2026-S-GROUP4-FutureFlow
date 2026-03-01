{/*
  Front end TextScript file for "Career Quiz" page.
*/}

import React from 'react';
import { AuthHeader } from '../components/AuthHeader';
import { Logo } from '../components/Logo';

export default function CareerQuiz() {
  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <AuthHeader title="Career Quiz" />
      
      <div className="p-8">
        <div className="bg-white rounded-3xl p-12 shadow-lg max-w-4xl mx-auto">
          <h3 className="text-4xl text-center mb-12 text-blue-800">Career Quiz</h3>
          <div className="text-center">
            <p className="text-xl mb-8 text-gray-700">
              Discover your ideal career path by taking our comprehensive quiz.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-full text-lg transition-colors">
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}