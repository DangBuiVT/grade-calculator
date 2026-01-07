import React, { useState, useMemo } from "react";
import Header from "../layouts/Header";
import { Icon } from "@iconify/react";
import AddGrade from "../components/AddGrade";

export default function Calculator({
  gradeList,
  setGradelist,
  conversionRule,
  isLinear,
}) {
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
        <div className="flex justify-center space-x-16">
          {/* Cumulative GPA and credits Calculation */}
          <div className="mt-10 rounded-2xl py-6 px-10 bg-white shadow-lg">
            <h3 className="text-2xl font-bold text-[var(--dark-blue-primary)]">
              GPA (scale 10):{" "}
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
              GPA (converted):{" "}
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
              Total Credits Earned:{" "}
              {uniqueCourseList.reduce((acc, course) => {
                if (course.grade10 >= lowestPass) {
                  return acc + Number(course.credits);
                }
                return acc;
              }, 0) + Number(bonusCredits)}
            </h3>
          </div>
        </div>
        <div className="mt-10 rounded-2xl py-6 px-10 bg-white shadow-lg flex justify-between items-center w-1/3 relative left-1/2 -translate-x-1/2">
          <h3 className="text-2xl font-bold text-[var(--dark-blue-primary)]">
            Bonus credits earned:{" "}
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
            className="mx-20 mt-10 rounded-2xl py-6 px-10 bg-white shadow-lg"
          >
            <h3 className="text-3xl font-bold text-[var(--dark-blue-primary)]">
              Semester {semester}
            </h3>
            <div className="mt-5 flex gap-10 justify-center ">
              <div className="ml-4 px-4 py-2 text-lg font-bold border-x border-t rounded-t-2xl">
                Semester GPA (scale 10):
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
                Semester GPA (converted):
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
                Semester credits:
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
                  <th className="p-2 border">Course</th>
                  <th className="p-2 border">Code</th>
                  <th className="p-2 border">Credits</th>
                  <th className="p-2 border">Grade (out of 10)</th>
                  <th className="p-2 border">Grade (converted)</th>
                  <th className="p-2 border">Grade in Letters</th>
                  <th className="p-2 border">Passed</th>
                  <th className="p-2 border">Remove</th>
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
                      {course.grade10 >= lowestPass ? "Yes" : "No"}
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
