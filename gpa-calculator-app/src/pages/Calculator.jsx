import React, { useState, useMemo } from "react";
import Header from "../layouts/Header";
import { Icon } from "@iconify/react";
import AddGrade from "../components/AddGrade";
import { useLanguage } from "../LanguageContext.jsx";

export default function Calculator({
  gradeList,
  setGradelist,
  conversionRule,
  isLinear,
}) {
  const { language } = useLanguage();
  var lowestPass = Number(localStorage.getItem("lowestPass")) || 4.0;
  const groupCoursesBySemester = gradeList.reduce((acc, course) => {
    if (!acc[course.semester]) {
      acc[course.semester] = [];
    }

    acc[course.semester].push(course);
    return acc;
  }, {});

  const [addRowPopup, setAddRowPopup] = useState(false);

  const removeGrade = (name, code, semester) => {
    setGradelist((prevList) =>
      prevList.filter(
        (course) =>
          course.courseName !== name ||
          course.courseCode !== code ||
          course.semester !== semester
      )
    );
  };

  const uniqueCourseList = useMemo(() => {
    return gradeList.reduce((acc, current) => {
      // Check if we already found this course code
      const existing = acc.find(
        (item) => item.courseName === current.courseName
      );

      if (!existing) {
        // If not found, add it to our accumulator
        acc.push(current);
      } else if (current.grade10 > existing.grade10) {
        // If found but the new one has a higher grade, replace the old one
        const index = acc.indexOf(existing);
        acc[index] = current;
      }

      return acc;
    }, []);
  }, [gradeList]); // Only runs when gradeList updates

  const [bonusCredits, setBonusCredits] = useState(() => {
    const savedBonus = localStorage.getItem("bonusCredits");
    return savedBonus ? JSON.parse(savedBonus) : 0;
  });

  return (
    <div>
      <Header />
      {/* Add row pop up */}
      {addRowPopup && (
        <AddGrade setPopup={setAddRowPopup} setGradelist={setGradelist} />
      )}
      <div className="space-y-8">
        <div className="flex flex-wrap justify-center gap-10 mx-20">
          {/* Cumulative GPA and credits Calculation */}
          <div className="mt-10 rounded-2xl py-6 px-10 bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-[var(--dark-blue-primary)]">
              {language === "en" ? "GPA (scale 10): " : "GPA (thang 10): "}
              {(
                uniqueCourseList.reduce((acc, course) => {
                  return acc + course.grade10 * Number(course.credits);
                }, 0) /
                (uniqueCourseList.reduce(
                  (acc, course) => acc + Number(course.credits),
                  0
                ) || 1)
              ).toFixed(2)}
            </h3>
          </div>

          <div className="mt-10 rounded-2xl py-6 px-10 bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-[var(--dark-blue-primary)]">
              {language === "en"
                ? "GPA (converted): "
                : "GPA (đã chuyển đổi): "}
              {(
                uniqueCourseList.reduce((acc, course) => {
                  const gradeConverted =
                    conversionRule(course.grade10, isLinear)?.gradeConverted ||
                    0;
                  return acc + gradeConverted * Number(course.credits);
                }, 0) /
                (uniqueCourseList.reduce(
                  (acc, course) => acc + Number(course.credits),
                  0
                ) || 1)
              ).toFixed(2)}
            </h3>
          </div>
          <div className="mt-10 rounded-2xl py-6 px-10 bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-[var(--dark-blue-primary)]">
              {language === "en"
                ? "Total credits earned: "
                : "Tín chỉ tích lũy: "}
              {uniqueCourseList.reduce((acc, course) => {
                if (course.grade10 >= lowestPass) {
                  return acc + Number(course.credits);
                }
                return acc;
              }, 0) + Number(bonusCredits)}
            </h3>
          </div>
        </div>
        <div className="mt-10 rounded-2xl py-6 px-10 bg-white shadow-lg flex justify-between items-center gap-5 mx-20">
          <h3 className="text-2xl font-bold text-[var(--dark-blue-primary)]">
            {language === "en"
              ? "Bonus credits earned: "
              : "Tín chỉ được miễn: "}
          </h3>
          <input
            type="number"
            step={1}
            value={bonusCredits}
            onChange={(e) => {
              setBonusCredits(e.target.value);
              localStorage.setItem(
                "bonusCredits",
                JSON.stringify(e.target.value)
              );
            }}
            className="text-2xl font-bold text-[var(--dark-blue-primary)] border-b-2 w-32 text-center"
          />
        </div>
        {Object.keys(groupCoursesBySemester).map((semester) => (
          <div
            key={semester}
            className="mx-20 mt-10 rounded-2xl py-6 px-10 bg-white shadow-lg overflow-x-auto"
          >
            <h3 className="text-3xl font-bold text-[var(--dark-blue-primary)]">
              {language === "en" ? "Semester: " : "Học kỳ: "} {semester}
            </h3>
            <div className="mt-5 flex gap-10 md:justify-center ">
              <div className="ml-4 px-4 py-2 text-lg font-bold border-x border-t rounded-t-2xl">
                {language === "en"
                  ? "Semester GPA (scale 10): "
                  : "Điểm trung bình học kỳ (thang 10): "}
                <span className="ml-2 text-xl">
                  {(
                    groupCoursesBySemester[semester].reduce((acc, course) => {
                      return acc + course.grade10 * Number(course.credits);
                    }, 0) /
                    (groupCoursesBySemester[semester].reduce(
                      (acc, course) => acc + Number(course.credits),
                      0
                    ) || 1)
                  ).toFixed(2)}
                </span>
              </div>
              <div className="ml-4 px-4 py-2 text-lg font-bold border-x border-t rounded-t-2xl">
                {language === "en"
                  ? "Semester GPA (converted): "
                  : "Điểm trung bình học kỳ (đã chuyển đổi): "}
                <span className="ml-2 text-xl">
                  {(
                    groupCoursesBySemester[semester].reduce((acc, course) => {
                      const gradeConverted =
                        conversionRule(course.grade10, isLinear)
                          ?.gradeConverted || 0;
                      return acc + gradeConverted * Number(course.credits);
                    }, 0) /
                    (groupCoursesBySemester[semester].reduce(
                      (acc, course) => acc + Number(course.credits),
                      0
                    ) || 1)
                  ).toFixed(2)}
                </span>
              </div>
              <div className="ml-4 px-4 py-2 text-lg  font-bold border-x border-t rounded-t-2xl">
                {language === "en"
                  ? "Semester credits: "
                  : "Tín chỉ tích luỹ học kỳ: "}
                <span className="ml-2 text-xl">
                  {groupCoursesBySemester[semester].reduce((acc, course) => {
                    if (course.grade10 >= lowestPass) {
                      return acc + Number(course.credits);
                    }
                    return acc;
                  }, 0)}
                </span>
              </div>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">
                    {language === "en" ? "Course" : "Môn học"}
                  </th>
                  <th className="p-2 border">
                    {language === "en" ? "Code" : "Mã môn học"}
                  </th>
                  <th className="p-2 border">
                    {language === "en" ? "Credits" : "Tín chỉ"}
                  </th>
                  <th className="p-2 border">
                    {language === "en"
                      ? "Grade (scale 10)"
                      : "Điểm trung bình (thang 10)"}
                  </th>
                  <th className="p-2 border">
                    {language === "en"
                      ? "Grade (converted)"
                      : "Điểm trung bình (đã chuyển đổi): "}
                  </th>
                  <th className="p-2 border">
                    {language === "en" ? "Grade in Letter" : "Điểm chữ"}
                  </th>
                  <th className="p-2 border">
                    {language === "en" ? "Passed" : "Tình trạng"}
                  </th>
                  <th className="p-2 border">
                    {language === "en" ? "Remove" : "Xóa"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {groupCoursesBySemester[semester].map((course) => (
                  <tr key={course.courseName} className="text-center">
                    <td className="p-2 border">{course.courseName}</td>
                    <td className="p-2 border">{course.courseCode}</td>
                    <td className="p-2 border">{course.credits}</td>
                    <td className="p-2 border">{course.grade10}</td>
                    <td className="p-2 border">
                      {conversionRule(course.grade10, isLinear)?.gradeConverted}
                    </td>
                    <td className="p-2 border">
                      {conversionRule(course.grade10, isLinear)?.letter}
                    </td>
                    <td className="p-2 border">
                      {course.grade10 >= lowestPass
                        ? language === "en"
                          ? "Yes"
                          : "Đạt"
                        : language === "en"
                        ? "No"
                        : "Không đạt"}
                    </td>
                    <td className="p-2 border">
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() =>
                          removeGrade(
                            course.courseName,
                            course.courseCode,
                            semester
                          )
                        }
                      >
                        {language === "en" ? "Remove" : "Xóa"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <button
        className="bg-[var(--dark-blue-primary)] text-white rounded-xl my-10 py-4 px-6 text-2xl font-bold relative cursor-pointer"
        onClick={() => setAddRowPopup(true)}
      >
        {language === "en" ? "Add new grade +" : "Thêm môn học +"}
      </button>
    </div>
  );
}
