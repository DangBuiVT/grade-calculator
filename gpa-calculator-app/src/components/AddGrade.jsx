import { Icon } from "@iconify/react";
import React, { useState } from "react";

export default function AddGrade({ setPopup, setGradelist }) {
  const [newGrade, setNewGrade] = useState({
    semester: "",
    courseName: "",
    courseCode: "",
    credits: 0,
    grade10: 0,
  });
  const handleConfirm = (newGrade) => {
    // Logic to add the grade would go here
    setGradelist((prevList) => [...prevList, newGrade]);
    setPopup(false);
  };

  const handleInputChange = (field, value) => {
    // Logic to handle input changes would go here
    setNewGrade((prevGrade) => ({ ...prevGrade, [field]: value }));
  };

  const handleCancel = () => {
    setPopup(false);
  };

  return (
    <div className="bg-[var(--dark-blue-primary)]/40 w-full z-50 h-full fixed top-0 left-0 flex items-center justify-center bg-opacity-50">
      <div className="fixed inset-0 bg-[#ECEFF1] border-4 rounded-3xl absolute top-1/2 left-1/2 -translate-1/2 border-[var(--dark-blue-primary)] w-3/5 bg-opacity-50 flex flex-col gap-5 items-center justify-center z-50 p-10 h-3/5">
        {/* Need to input: Course Name, Course code and course grade in scale 10 */}
        {/* Cancel btn */}
        <button className="text-red-500 absolute top-2 right-2">
          <Icon
            icon="ic:round-cancel"
            width="40"
            height="40"
            onClick={handleCancel}
          />
        </button>
        <div className="flex gap-4 items-center justify-between w-3/4">
          <label className="w-48 font-bold text-2xl px-3 py-2 rounded-full text-left">
            Semester:
          </label>
          <input
            type="text"
            value={newGrade.semester}
            onChange={(e) => handleInputChange("semester", e.target.value)}
            className="bg-white border px-3 py-2 text-lg rounded-xl"
          />
        </div>

        <div className="flex gap-4 items-center justify-between w-3/4">
          <label className="w-48 font-bold text-2xl px-3 py-2 rounded-full text-left">
            Course Name:
          </label>
          <input
            type="text"
            value={newGrade.courseName}
            onChange={(e) => handleInputChange("courseName", e.target.value)}
            className="bg-white border px-3 py-2 text-lg rounded-xl"
          />
        </div>

        <div className="flex gap-4 items-center justify-between w-3/4">
          <label className="font-bold text-2xl px-3 py-2 rounded-full text-left">
            Course Code:
          </label>
          <input
            type="text"
            value={newGrade.courseCode === "" ? "N/A" : newGrade.courseCode}
            onChange={(e) => handleInputChange("courseCode", e.target.value)}
            className="ml-auto bg-white border px-3 py-2 text-lg rounded-xl"
          />
        </div>

        <div className="flex gap-4 items-center justify-between w-3/4">
          <label className="font-bold text-2xl px-3 py-2 rounded-full text-left">
            Credits:
          </label>
          <input
            type="number"
            step={1}
            value={newGrade.credits}
            onChange={(e) => handleInputChange("credits", e.target.value)}
            className="bg-white border px-3 py-2 text-lg rounded-xl"
          />
        </div>

        <div className="flex gap-4 items-center justify-between w-3/4">
          <label className="font-bold text-2xl px-3 py-2 rounded-full text-left">
            Grade (out of 10):
          </label>
          <input
            type="number"
            step={0.1}
            value={newGrade.grade10}
            onChange={(e) => handleInputChange("grade10", e.target.value)}
            className="bg-white border px-3 py-2 text-lg rounded-xl"
          />
        </div>

        {/* Confirm btn */}
        <button
          className="bg-[var(--dark-blue-primary)] text-white font-bold py-2 px-4 rounded-full mt-5"
          onClick={() => handleConfirm(newGrade)}
        >
          Add New Grade
        </button>
      </div>
    </div>
  );
}
