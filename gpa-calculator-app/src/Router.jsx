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
    return savedTable
      ? JSON.parse(savedTable)
      : [{ grade10: 9.0, grade4: 4.0, letter: "A", typegrade: "Outstanding" }];
  });

  useEffect(() => {
    localStorage.setItem("conversionTable", JSON.stringify(conversionTable));
  }, [conversionTable]);

  const gradeConversion = (val) => {
    const sortedTable = [...conversionTable].sort(
      (a, b) => b.grade10 - a.grade10
    );
    const matchingRow = sortedTable.find((row) => val >= row.grade10);

    if (matchingRow) {
      return { grade4: matchingRow.grade4, letter: matchingRow.letter };
    }
    return null;
  };

  const [gradelist, setGradelist] = useState(() => {
    const savedList = localStorage.getItem("gradelist");
    return savedList ? JSON.parse(savedList) : [];
  });

  useEffect(() => {
    localStorage.setItem("gradelist", JSON.stringify(gradelist));
    console.log("Updated gradelist:", gradelist);
  }, [gradelist]);

  return (
    <Router>
      <Routes>
        <Route path="/introduction" element={<Introduction />} />
        <Route
          path="/"
          element={
            <Home gradeList={gradelist} conversionRule={gradeConversion} />
          }
        />
        <Route
          path="/settings"
          element={
            <Settings
              conversionTable={conversionTable}
              onUpdateConv={setConversionTable}
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
            />
          }
        />
      </Routes>
    </Router>
  );
}
