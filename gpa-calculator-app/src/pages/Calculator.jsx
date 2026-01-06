import React, { useState } from "react";
import Header from "../layouts/Header";
import { Icon } from "@iconify/react";
import AddGrade from "../components/AddGrade";

export default function Calculator({
  gradeList,
  setGradelist,
  conversionRule,
}) {
  const groupCoursesBySemester = gradeList.reduce((acc, course) => {
    if (!acc[course.semester]) {
      acc[course.semester] = [];
    }

    acc[course.semester].push(course);
    return acc;
  }, {});

  const [addRowPopup, setAddRowPopup] = useState(false);

  const removeGrade = (code) => {
    setGradelist((prevList) =>
      prevList.filter((course) => course.code !== code)
    );
  };

  return (
    <div>
      <Header />
      {/* Add row pop up */}
      {addRowPopup && (
        <AddGrade setPopup={setAddRowPopup} setGradelist={setGradelist} />
      )}
      <div className="space-y-8">
        {Object.keys(groupCoursesBySemester).map((semester) => (
          <div
            key={semester}
            className="mx-20 my-10 rounded-2xl py-6 px-10 bg-white shadow-lg"
          >
            <h3 className="text-3xl font-bold text-[var(--dark-blue-primary)]">
              Semester {semester}
            </h3>
            <div className="mt-5 flex gap-10 justify-center ">
              <div className="ml-4 px-4 py-2 text-lg font-bold border-x border-t rounded-t-2xl">
                Semester GPA:
                <span className="ml-2 text-xl">
                  {(
                    groupCoursesBySemester[semester].reduce((acc, course) => {
                      const grade4 =
                        conversionRule(course.grade10)?.grade4 || 0;
                      return acc + grade4 * course.credits;
                    }, 0) /
                    (groupCoursesBySemester[semester].reduce(
                      (acc, course) => acc + course.credits,
                      0
                    ) || 1)
                  ).toFixed(2)}
                </span>
              </div>
              <div className="ml-4 px-4 py-2 text-lg  font-bold border-x border-t rounded-t-2xl">
                Semester credits:
                <span className="ml-2 text-xl">
                  {groupCoursesBySemester[semester].reduce((acc, course) => {
                    if (conversionRule(course.grade10)?.grade4 >= 1.0) {
                      return acc + course.credits;
                    }
                    return acc;
                  }, 0)}
                </span>
              </div>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Course</th>
                  <th className="p-2 border">Code</th>
                  <th className="p-2 border">Credits</th>
                  <th className="p-2 border">Grade (out of 10)</th>
                  <th className="p-2 border">Grade (out of 4)</th>
                  <th className="p-2 border">Grade in Letters</th>
                  <th className="p-2 border">Passed</th>
                  <th className="p-2 border">Remove</th>
                </tr>
              </thead>
              <tbody>
                {groupCoursesBySemester[semester].map((course) => (
                  <tr key={course.courseCode} className="text-center">
                    <td className="p-2 border">{course.courseName}</td>
                    <td className="p-2 border">{course.courseCode}</td>
                    <td className="p-2 border">{course.credits}</td>
                    <td className="p-2 border">{course.grade10}</td>
                    <td className="p-2 border">
                      {conversionRule(course.grade10)?.grade4 || "N/A"}
                    </td>
                    <td className="p-2 border">
                      {conversionRule(course.grade10)?.letter || "N/A"}
                    </td>
                    <td className="p-2 border">
                      {conversionRule(course.grade10)
                        ? conversionRule(course.grade10).grade4 >= 1.0
                          ? "Yes"
                          : "No"
                        : "N/A"}
                    </td>
                    <td className="p-2 border">
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => removeGrade(course.code)}
                      >
                        Remove
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
        Add new grade +
      </button>
    </div>
  );
}
