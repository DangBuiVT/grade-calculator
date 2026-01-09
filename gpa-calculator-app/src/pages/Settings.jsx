import React from "react";
import ConversionTable from "../components/ConvTable";
import Header from "../layouts/Header.jsx";
import DegClassify from "../components/DegClassify.jsx";
import { useLanguage } from "../LanguageContext.jsx";

export default function Settings({
  conversionTable,
  onUpdateConv,
  isLinear,
  setIsLinear,
  degreeClassification,
  setDegreeClassification,
  curriculumCredits,
  setCurriculumCredits,
  direction,
  setDirection,
}) {
  const { language } = useLanguage();
  // Marking parameters: grade in scale 10, grade in scale 4, letter grade
  return (
    <div>
      <Header />
      <h1 className="text-4xl !my-10">
        {language === "en" ? "Setting Page" : "Trang thiết lập"}
      </h1>

      <div className="shadow-lg border-2 rounded-2xl p-10 pb-20 mx-20 my-10 overflow-x-auto">
        <h2 className="text-3xl !mb-10">
          {language === "en" ? "Conversion Scale" : "Thang chuyển đổi"}
        </h2>
        <ConversionTable
          conversionTb={conversionTable}
          setConversions={onUpdateConv}
          isLinear={isLinear}
          setIsLinear={setIsLinear}
        />
      </div>
      <div className="shadow-lg border-2 rounded-2xl relative p-10 pb-20 mx-20 overflow-x-auto">
        <h2 className="text-3xl !mb-10">
          {language === "en" ? "Degree Classification" : "Xếp loại học lực"}
        </h2>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 text-xl space-y-4 lg:space-y-0">
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
            <label>
              {language === "en"
                ? "Total Curriculum Credits: "
                : "Tổng số tín chỉ khóa học: "}
            </label>
            <input
              type="number"
              step={1}
              className="bg-white border-2 py px-3"
              value={curriculumCredits}
              onChange={(e) => {
                setCurriculumCredits(e.target.value);
                localStorage.setItem("curriculumCredits", e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-start space-x-4 lg:mr-20">
            <label>
              {language === "en"
                ? "Direction of Classification"
                : "Chiều xếp loại cao dần theo số điểm: "}
            </label>
            <select
              className="bg-white border-2 py px-3 text-lg"
              value={direction}
              onChange={(e) => setDirection(e.target.value)}
            >
              <option value="up">
                {language === "en" ? "Aiming Upwards" : "Cao dần"}
              </option>
              <option value="down">
                {language === "en" ? "Aiming Downwards" : "Thấp dần"}
              </option>
            </select>
          </div>
        </div>

        <DegClassify
          degreeClassification={degreeClassification}
          setDegreeClassification={setDegreeClassification}
        />
      </div>
      <button
        onClick={() => {
          window.location.href = "/";
        }}
        className="bg-[var(--dark-blue-primary)] px-4 py-2 rounded-full cursor-pointer text-white text-xl font-bold my-10 hover:bg-[var(--dark-blue-primary)]/90 transition-opacity"
      >
        {language === "en" ? "Finishing Changes" : "Hoàn thành thay đổi"}
      </button>
    </div>
  );
}
