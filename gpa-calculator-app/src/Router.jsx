/* Router page */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Introduction from "./pages/Introduction";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Calculator from "./pages/Calculator";

export default function AppRouter() {
  const [conversionTable, setConversionTable] = useState(() => {
    const savedTable = localStorage.getItem("conversionTable");
    const table = savedTable
      ? JSON.parse(savedTable)
      : [{ grade10: 9.0, gradeConverted: 4.0, letter: "A" }];
    // Ensure all grade10 values are numbers
    return table.map((row) => ({ ...row, grade10: Number(row.grade10) }));
  });

  useEffect(() => {
    localStorage.setItem("conversionTable", JSON.stringify(conversionTable));
  }, [conversionTable]);

  const [degreeClassification, setDegreeClassification] = useState(() => {
    const savedClassify = localStorage.getItem("degreeClassification");
    const classify = savedClassify
      ? JSON.parse(savedClassify)
      : [{ grade: 3.2, degree: "Distinction" }];

    return classify.map((row) => ({ ...row, grade: Number(row.grade) }));
  });

  useEffect(() => {
    localStorage.setItem(
      "degreeClassification",
      JSON.stringify(degreeClassification)
    );
  }, [degreeClassification]);

  const [isLinear, setIsLinear] = useState(() => {
    const savedIsLinear = localStorage.getItem("isLinear");
    return savedIsLinear ? JSON.parse(savedIsLinear) : false;
  });
  console.log("isLinear:", isLinear);

  const gradeConversion = (val, isLinear) => {
    if (val > 10 || val < 0) return null;
    if (!isLinear) {
      const sortedTable = [...conversionTable].sort(
        (a, b) => b.grade10 - a.grade10
      );
      const matchingRow = sortedTable.find((row) => val >= row.grade10);

      if (matchingRow) {
        console.log(
          "Stepwise conversion:",
          val,
          "->",
          matchingRow.gradeConverted
        );
        return {
          gradeConverted: matchingRow.gradeConverted,
          letter: matchingRow.letter,
        };
      }
      return null;
    } else {
      // Linear conversion logic, like
      const sortedTable = [...conversionTable].sort(
        (a, b) => a.grade10 - b.grade10
      );
      if (sortedTable.length < 2) return null; // Need at least two points to interpolate

      for (let i = 0; i < sortedTable.length - 1; i++) {
        const lower = sortedTable[i];
        const upper = sortedTable[i + 1];
        if (val >= lower.grade10 && val <= upper.grade10) {
          const range = upper.grade10 - lower.grade10;
          if (range === 0) {
            return {
              gradeConverted: Number(lower.gradeConverted),
              letter: lower.letter ? lower.letter : "N/A",
            };
          }
          const ratio = (val - Number(lower.grade10)) / range;
          const gradeConverted =
            Number(lower.gradeConverted) +
            ratio *
              (Number(upper.gradeConverted) - Number(lower.gradeConverted));
          return {
            gradeConverted: parseFloat(gradeConverted.toFixed(1)),
            letter: lower.letter ? lower.letter : "N/A",
          };
        }
      }
      return null;
    }
  };

  const [gradelist, setGradelist] = useState(() => {
    const savedList = localStorage.getItem("gradelist");
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem("gradelist", JSON.stringify(gradelist));
    console.log("Updated gradelist:", gradelist);
  }, [gradelist]);

  const [direction, setDirection] = useState(() => {
    const savedDirection = localStorage.getItem("classificationDirection");
    return savedDirection ? savedDirection : "up";
  });

  useEffect(() => {
    localStorage.setItem("classificationDirection", direction);
  }, [direction]);

  const getRequiredAvg = (degreeAim) => {
    const sortedClassify =
      direction === "up"
        ? [...degreeClassification].sort((a, b) => b.grade - a.grade)
        : [...degreeClassification].sort((a, b) => a.grade - b.grade);
    const matchingRow = sortedClassify.find(
      (row) => degreeAim.toLowerCase() === row.degree.toLowerCase()
    );
    if (matchingRow) {
      return matchingRow.grade;
    }
    return null;
  };

  const [curriculumCredits, setCurriculumCredits] = useState(() => {
    const savedCredits = localStorage.getItem("curriculumCredits");
    return savedCredits ? Number(savedCredits) : 0;
  });

  useEffect(() => {
    localStorage.setItem("curriculumCredits", curriculumCredits);
  }, [curriculumCredits]);

  return (
    <Router>
      <Routes>
        <Route path="/introduction" element={<Introduction />} />
        <Route
          path="/"
          element={
            <Home
              gradeList={gradelist}
              conversionRule={gradeConversion}
              isLinear={isLinear}
              totalCurriculumCredits={curriculumCredits}
              getRequiredAvg={getRequiredAvg}
            />
          }
        />
        <Route
          path="/settings"
          element={
            <Settings
              conversionTable={conversionTable}
              onUpdateConv={setConversionTable}
              setIsLinear={setIsLinear}
              isLinear={isLinear}
              degreeClassification={degreeClassification}
              setDegreeClassification={setDegreeClassification}
              curriculumCredits={curriculumCredits}
              setCurriculumCredits={setCurriculumCredits}
              direction={direction}
              setDirection={setDirection}
            />
          }
        />
        <Route
          path="/calculator"
          element={
            <Calculator
              gradeList={gradelist}
              setGradelist={setGradelist}
              conversionRule={gradeConversion}
              isLinear={isLinear}
            />
          }
        />
      </Routes>
    </Router>
  );
}
