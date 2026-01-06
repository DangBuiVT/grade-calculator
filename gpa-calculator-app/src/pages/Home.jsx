import React from "react";
import Header from "../layouts/Header.jsx";
import Profile from "../components/Profile.jsx";

export default function Home({ gradeList, conversionRule }) {
  const gradeColor = (grade) => {
    if (grade == 4.0) return "bg-[var(--a-score-color)]";
    if (grade >= 3.0) return "bg-[var(--b-score-color)]";
    if (grade >= 2.0) return "bg-[var(--c-score-color)]";
    if (grade >= 1.0) return "bg-[var(--d-score-color)]";
    return "bg-[var(--f-score-color)]";
  };
  console.log(conversionRule(8.5));
  console.log(gradeList[0].grade10);
  return (
    <div>
      <Header />
      <div className="mx-20 my-10 space-y-6">
        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Profile />

          {/* GPA Card */}
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-[var(--dark-blue-primary)] font-bold text-xl text-center mb-2">
              GPA
            </h3>
            <p className="text-6xl font-bold text-yellow-600 text-center mb-6 mt-4">
              4.0
            </p>
            <div className="space-y-4 px-4 flex flex-col gap-5">
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span className="font-bold text-gray-600">
                  Last semester's credits
                </span>
                <span className="text-gray-400">----</span>
              </div>
              <div className="flex justify-between border-b border-gray-300 pb-1">
                <span className="font-bold text-gray-600">
                  Accumulated Credits
                </span>
                <span className="text-gray-400">
                  {gradeList.reduce((acc, ele) => {
                    return acc + Number(ele.credits);
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Aiming For Card */}
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-[var(--dark-blue-primary)]  font-bold text-xl">
              Aiming for: Good
            </h3>
            <p className="text-6xl font-bold text-yellow-600 my-4">2.0</p>
            <p className="text-gray-500 text-sm mb-6">Needed per credit</p>
            <h4 className="font-bold text-gray-600">Remaining Credits</h4>
            <p className="mt-4 text-gray-400">----</p>
          </div>

          {/* Recent Courses - Spans across the last 2 columns */}
          <div className="md:col-span-2 bg-gray-300 rounded shadow-lg overflow-hidden">
            <div className="bg-gray-400 p-2 text-center font-bold text-[#050038]">
              Most recent courses
            </div>
            <div className="flex h-48">
              {/* Course Bar 1 */}
              {gradeList.slice(0, 8).map((course, index) => (
                <div
                  key={index}
                  className={`flex-1 p-2 ${gradeColor(
                    conversionRule(course.grade10)?.grade4
                  )} text-white flex flex-col justify-between items-center space-y-2 py-5 w-1/8`}
                >
                  <span className="text-md font-bold">{course.courseName}</span>
                  <span className="text-2xl font-bold">
                    {conversionRule(course.grade10)?.grade4}
                  </span>
                  <span className="font-bold text-lg">
                    {conversionRule(course.grade10)?.letter}
                  </span>
                  <span className="text-md">{course.grade10}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
