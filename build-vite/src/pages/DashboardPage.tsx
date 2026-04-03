// import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../App';
import { AuthHeader } from '../components/AuthHeader';
import { useState, useEffect } from 'react';

type Job = {
  id: number;
  title: string;
  status: string;
  notes: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const progress = 45; // Mock progress percentage
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('jobs');
    if (saved) setJobs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  return (
    <div className="min-h-screen bg-gray-50 pt-5">
      <AuthHeader title="FutureFlow Hub" />

      <div className="grid grid-cols-3 gap-8 p-8">
        {/* Left Column - Centers */}
        <div className="space-y-8 flex flex-col items-center">
          {/* Degree Center */}
          <div className="bg-white border-2 border-blue-700 rounded-3xl p-8 shadow-lg w-full max-w-sm">
            <h2 className="text-3xl mb-4 text-blue-800 text-center">Degree Center</h2>
            <p className="text-center mb-6 text-gray-700">
              "Small explanation/purpose of this box/list of bullet points."
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/degree-center')}
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-full transition-colors"
              >
                Degree Center
              </button>
            </div>
          </div>

          {/* Job Center */}
          <div className="bg-white border-2 border-teal-600 rounded-3xl p-8 shadow-lg w-full max-w-sm">
            <h2 className="text-3xl mb-4 text-teal-600 text-center">Job Center</h2>
            <p className="text-center mb-6 text-gray-700">
              "Small explanation/purpose of this box/list of bullet points."
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/job-center')}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full transition-colors"
              >
                Job Center
              </button>
            </div>
          </div>

          {/* Career Center */}
          <div className="bg-white border-2 border-green-600 rounded-3xl p-8 shadow-lg w-full max-w-sm">
            <h2 className="text-3xl mb-4 text-green-700 text-center">Career Center</h2>
            <p className="text-center mb-6 text-gray-700">
              "Small explanation/purpose of this box/list of bullet points."
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/career-center')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition-colors"
              >
                Career Center
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Welcome and Progress */}
        <div className="col-span-2 bg-white rounded-3xl p-12 shadow-lg">
          <h2 className="text-6xl mb-8 text-blue-900">
            Welcome back,
            <br />
            {user?.name}!
          </h2>

          {/* Daily Recommendation */}
          <div className="mb-12">
            <h3 className="text-4xl mb-4 text-gray-800">Daily Recommendation</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8 text-center">
              &lt;show a career/some sort of listing&gt;
            </div>
          </div>

          {/* Degree Progress */}
          <div>
            <h3 className="text-4xl mb-4 text-gray-800">Degree Progress</h3>
            
            {/* Percentage Label */}
            <p className="text-right mb-2 text-lg font-semibold text-gray-700">{progress}% Complete</p>
            
            <div className="relative h-16 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-700 to-green-600 rounded-full transition-all flex items-center justify-center text-white font-bold"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
          </div>

          {/* Application Tracker Section */}
          <div className="mt-12">
            <h3 className="text-4xl mb-4 text-gray-800">Application Tracker</h3>

            {/* Add Job Button */}
            <button
              onClick={() => {
                const newJob = {
                  id: Date.now(),
                  title: "New Job",
                  status: "Saved",
                  notes: "",
                  updatedAt: new Date().toLocaleString()
                };
                setJobs([newJob, ...jobs]);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full mb-6"
            >
              + Add Job
            </button>

            {/* Status Summary */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-xl text-center">
                Saved: {jobs.filter(j => j.status === 'Saved').length}
              </div>
              <div className="bg-yellow-100 p-4 rounded-xl text-center">
                Applied: {jobs.filter(j => j.status === 'Applied').length}
              </div>
              <div className="bg-purple-100 p-4 rounded-xl text-center">
                Interview: {jobs.filter(j => j.status === 'Interview').length}
              </div>
              <div className="bg-green-100 p-4 rounded-xl text-center">
                Offers: {jobs.filter(j => j.status === 'Offer').length}
              </div>
            </div>

            {/* Job List */}
            <div className="bg-gray-50 border rounded-3xl p-6 space-y-4 max-h-96 overflow-y-auto">
              {jobs.length === 0 ? (
                <p className="text-gray-500">No saved jobs yet.</p>
              ) : (
                jobs.map(job => (
                  <div key={job.id} className="bg-white p-4 rounded-xl shadow relative">

                    {/* DELETE BUTTON (TOP RIGHT) */}
                    <button
                      onClick={() => {
                        const confirmDelete = window.confirm(`Delete "${job.title}"?`);
                        if (!confirmDelete) return;

                        const filtered = jobs.filter(j => j.id !== job.id);
                        setJobs(filtered);
                      }}
                      className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full shadow"
                      title="Delete job"
                    >
                      <span className="text-xl leading-none font-extrabold -translate-y-[10px]">_</span>
                    </button>

                    {/* EDITABLE TITLE */}
                    <input
                      type="text"
                      value={job.title}
                      onChange={(e) => {
                        const updated = jobs.map(j =>
                          j.id === job.id
                            ? {
                                ...j,
                                title: e.target.value,
                                updatedAt: new Date().toLocaleString()
                              }
                            : j
                        );
                        setJobs(updated);
                      }}
                      className="text-xl font-semibold w-full border-b focus:outline-none pr-8"
                    />

                    {/* STATUS DROPDOWN */}
                    <select
                      value={job.status}
                      onChange={(e) => {
                        const updated = jobs.map(j =>
                          j.id === job.id
                            ? {
                                ...j,
                                status: e.target.value,
                                updatedAt: new Date().toLocaleString()
                              }
                            : j
                        );
                        setJobs(updated);
                      }}
                      className="mt-2 border rounded px-2 py-1"
                    >
                      <option>Saved</option>
                      <option>Applied</option>
                      <option>Interview</option>
                      <option>Offer</option>
                      <option>Rejected</option>
                    </select>

                    {/* NOTES */}
                    <textarea
                      value={job.notes}
                      onChange={(e) => {
                        const updated = jobs.map(j =>
                          j.id === job.id
                            ? {
                                ...j,
                                notes: e.target.value,
                                updatedAt: new Date().toLocaleString()
                              }
                            : j
                        );
                        setJobs(updated);
                      }}
                      placeholder="Add notes..."
                      className="w-full mt-2 border rounded p-2"
                    />

                    <p className="text-sm text-gray-500 mt-2">
                      Last updated: {job.updatedAt}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}