import React, { useState } from 'react';

const ApplicantDetailsPopup = ({ applicantData, applicationData, leaderboardData, isOpen, onClose }) => {
    const [interviewDate, setInterviewDate] = useState('');
    const [interviewers, setInterviewers] = useState('');

    const handleInterviewSubmit = (e) => {
        e.preventDefault();
        if (!interviewDate || !interviewers) {
            alert("Please fill in all fields to schedule an interview.");
            return;
        }
        // Logic to schedule the interview
        console.log("Interview scheduled on:", interviewDate, "with interviewers:", interviewers);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white p-6 rounded-md w-11/12 md:w-2/3 lg:w-1/2 max-w-3xl shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Applicant Details</h2>

                {/* Applicant Information */}
                <div className="mb-4">
                    <h3 className="font-bold">Personal Information</h3>
                    <p><strong>Name:</strong> {applicantData?.firstName} {applicantData?.lastName}</p>
                    <p><strong>Email:</strong> {applicantData?.email}</p>
                    <p><strong>Phone:</strong> {applicantData?.phone}</p>
                    <p><strong>Location:</strong> {applicantData?.location}</p>
                    <p><strong>Gender:</strong> {applicantData?.gender}</p>
                    <p><strong>Birthday:</strong> {applicantData?.birthday ? new Date(applicantData.birthday).toLocaleDateString() : 'N/A'}</p>
                </div>

                {/* Application Information */}
                <div className="mb-4">
                    <h3 className="font-bold">Application Details</h3>
                    <p><strong>Status:</strong> {applicationData?.status}</p>
                    <p><strong>Cover Letter:</strong> {applicationData?.coverLetter || 'No cover letter provided'}</p>
                    <p><strong>Application Date:</strong> {applicationData?.applicationDate ? new Date(applicationData.applicationDate).toLocaleDateString() : 'N/A'}</p>
                </div>

                {/* Leaderboard Information */}
                <div className="mb-4">
                    <h3 className="font-bold">Leaderboard Information</h3>
                    <p><strong>Score:</strong> {leaderboardData?.score}</p>
                    <p><strong>Hard Skill Match %:</strong> {leaderboardData?.hardSkillMatchPercentage}%</p>
                    <p><strong>Soft Skill Match %:</strong> {leaderboardData?.softSkillMatchPercentage}%</p>
                    <p><strong>Experience Years:</strong> {leaderboardData?.experienceYears}</p>
                    <p><strong>Matched Skills:</strong> {leaderboardData?.matchedHardSkills.join(', ')}, {leaderboardData?.matchedSoftSkills.join(', ')}</p>
                </div>

                {/* Interview Schedule Form */}
                <form onSubmit={handleInterviewSubmit} className="mt-4">
                    <h3 className="font-bold">Schedule Interview</h3>
                    <label className="block mb-2">
                        <span className="text-gray-700">Interview Date:</span>
                        <input
                            type="date"
                            className="block w-full mt-1 border-gray-300 rounded-md"
                            value={interviewDate}
                            onChange={(e) => setInterviewDate(e.target.value)}
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">Interviewers:</span>
                        <input
                            type="text"
                            className="block w-full mt-1 border-gray-300 rounded-md"
                            placeholder="Enter interviewers' names"
                            value={interviewers}
                            onChange={(e) => setInterviewers(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Schedule Interview</button>
                </form>

                <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl">
                    &times;
                </button>
            </div>
        </div>
    );
};

export default ApplicantDetailsPopup;
