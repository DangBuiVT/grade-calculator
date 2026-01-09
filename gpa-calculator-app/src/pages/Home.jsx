import React, { useState } from "react";
import Header from "../layouts/Header.jsx";
import Profile from "../components/Profile.jsx";
import { useLanguage } from "../LanguageContext.jsx";

export default function Home({
  gradeList,
  conversionRule,
  isLinear,
  totalCurriculumCredits,
  getRequiredAvg,
}) {
  const { language } = useLanguage();

  const gradeColor = (letter) => {
    if (letter == "N/A") return "bg-[var(--dark-blue-primary)]";
    if (letter == "A+" || letter == "A" || letter == "A-")
      return "bg-[var(--a-score-color)]";
    if (letter == "B+" || letter == "B" || letter == "B-")
      return "bg-[var(--b-score-color)]";
    if (letter == "C+" || letter == "C" || letter == "C-")
      return "bg-[var(--c-score-color)]";
    if (letter == "D+" || letter == "D" || letter == "D-")
      return "bg-[var(--d-score-color)]";
    return "bg-[var(--f-score-color)]";
  };

  const [degreeAim, setDegreeAim] = useState(() => {
    const savedAim = localStorage.getItem("degreeAim");
    return savedAim ? savedAim : "";
  });

  const totalGPAtimesCredits = (degreeAim) => {
    const minGPA = getRequiredAvg(degreeAim);
    return minGPA * Number(totalCurriculumCredits);
  };

  const [visibleCount, setVisibleCount] = React.useState(10);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Mobile
        setVisibleCount(3);
      } else if (window.innerWidth < 1024) {
        // Tablet
        setVisibleCount(5);
      } else {
        // Desktop
        setVisibleCount(10);
      }
    };

    // Run once on mount
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Header />
      <div className="mx-20 my-10 space-y-6">
        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GPA Card */}
          <div className="bg-white p-6 rounded shadow-lg flex flex-col sm:flex-row justify-around h-full space-x-6">
            <div className="flex flex-col items-center justify-center m-0">
              <h3 className="text-[var(--dark-blue-primary)] font-bold text-xl text-center mb-2">
                GPA
              </h3>
              <p className="text-6xl font-bold text-yellow-600 text-center mb-6 mt-4">
                {(
                  gradeList.reduce((acc, course) => {
                    const gradeConverted =
                      conversionRule(course.grade10, isLinear)
                        ?.gradeConverted || 0;
                    return acc + gradeConverted * Number(course.credits);
                  }, 0) /
                    gradeList.reduce(
                      (acc, course) => acc + Number(course.credits),
                      0
                    ) || 1
                ).toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <h3 className="text-[var(--dark-blue-primary)] font-bold text-xl text-center mb-2">
                {language === "en" ? "Accumulated credits" : "Tín chỉ tích lũy"}
              </h3>
              <p className="text-6xl font-bold text-yellow-600 text-center mb-6 mt-4">
                {gradeList.reduce((acc, course) => {
                  if (course.grade10 >= 5) {
                    return acc + Number(course.credits);
                  }
                  return acc;
                }, 0)}
              </p>
            </div>
          </div>

          {/* Aiming For Card */}
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-[var(--dark-blue-primary)]  font-bold text-xl">
              {language === "en" ? "Aiming for: " : "Mục tiêu: "}
              <input
                type="text"
                value={degreeAim}
                onChange={(e) => {
                  setDegreeAim(e.target.value);
                  localStorage.setItem("degreeAim", e.target.value);
                }}
                className="text-xl font-bold text-[var(--dark-blue-primary)] border-b-2 w-32 text-center"
              />
            </h3>
            <p className="text-6xl font-bold text-yellow-600 my-4">
              {(
                (totalGPAtimesCredits(degreeAim) -
                  gradeList.reduce((acc, course) => {
                    const gradeConverted =
                      conversionRule(course.grade10, isLinear)
                        ?.gradeConverted || 0;
                    return acc + gradeConverted * Number(course.credits);
                  }, 0)) /
                (Number(totalCurriculumCredits) -
                  gradeList.reduce((acc, course) => {
                    if (course.grade10 >= 5) {
                      return acc + Number(course.credits);
                    }
                    return acc;
                  }, 0))
              ).toFixed(2)}
            </p>
            <p className="text-gray-500 text-sm mb-6">
              {language === "en"
                ? "Needed per credit"
                : "GPA cần đạt mỗi tín chỉ"}
            </p>
            <h4 className="font-bold text-gray-600">
              {language === "en" ? "Remaining credits" : "Số tín chỉ còn lại"}
            </h4>
            <p className="mt-4 text-gray-400">
              {Number(totalCurriculumCredits) -
                gradeList.reduce((acc, course) => {
                  if (course.grade10 >= 5) {
                    return acc + Number(course.credits);
                  }
                  return acc;
                }, 0)}
            </p>
          </div>

          {/* Recent Courses - Spans across the last 2 columns */}
          <div className="md:col-span-2 bg-gray-300 rounded shadow-lg overflow-hidden">
            <div className="bg-gray-400 p-2 text-center font-bold text-[#050038]">
              {language === "en"
                ? "Most recent courses"
                : "Các môn học gần đây"}
            </div>
            <div className="flex h-48">
              {/* Course Bar 1 */}
              {gradeList.slice(0, visibleCount).map((course, index) => (
                <div
                  key={index}
                  className={`flex-1 p-2 ${gradeColor(
                    conversionRule(course.grade10, isLinear).letter
                  )} text-white flex flex-col justify-between items-center space-y-2 py-5 w-1/8`}
                >
                  <span className="text-sm grow mb-auto">
                    {course.courseName}
                  </span>
                  <span className="text-2xl font-bold">
                    {conversionRule(course.grade10, isLinear).gradeConverted}
                  </span>
                  <span className="font-bold text-lg">
                    {conversionRule(course.grade10, isLinear)?.letter !== "N/A"
                      ? conversionRule(course.grade10, isLinear)?.letter
                      : ""}
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
