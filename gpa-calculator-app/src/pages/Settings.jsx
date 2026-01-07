import React from "react";
import ConversionTable from "../components/ConvTable";
import Header from "../layouts/Header.jsx";

export default function Settings({
  conversionTable,
  onUpdateConv,
  isLinear,
  setIsLinear,
}) {
  // Marking parameters: grade in scale 10, grade in scale 4, letter grade
  return (
    <div>
      <Header />
      <h1 className="text-4xl !my-10">Settings Page</h1>
      <ConversionTable
        conversionTb={conversionTable}
        setConversions={onUpdateConv}
        isLinear={isLinear}
        setIsLinear={setIsLinear}
      />
    </div>
  );
}
