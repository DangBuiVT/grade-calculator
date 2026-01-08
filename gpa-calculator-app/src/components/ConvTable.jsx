import React, { useState } from "react";

export default function ConversionTable({
  conversionTb,
  setConversions,
  isLinear,
  setIsLinear,
}) {
  // Marking parameters: grade in scale 10, grade in scale 4, letter grade
  const addRow = () => {
    const newRow = { grade10: 0, gradeConverted: 0, letter: "" };
    setConversions((prevConversions) => [...prevConversions, newRow]);
  };
  const handleInputChange = (index, field, value) => {
    const updatedConversions = conversionTb.map((row, i) => {
      if (i === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setConversions(updatedConversions);
  };
  const [lowestPass, setLowestPass] = useState(() => {
    const savedLowestPass = localStorage.getItem("lowestPass");
    return savedLowestPass ? Number(savedLowestPass) : 4.0;
  });
  return (
    <div className="mx-20">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 text-xl space-y-4 lg:space-y-0">
        <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-4">
          <label>Lowest Passing Grade (scale 10):</label>
          <input
            type="number"
            className="bg-white border-2 py px-3"
            value={lowestPass}
            onChange={(e) => {
              setLowestPass(e.target.value);
              localStorage.setItem("lowestPass", e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-start space-x-4 lg:mr-20">
          <label className="">Linear Grading</label>
          <input
            type="checkbox"
            checked={isLinear}
            onChange={() => {
              setIsLinear(!isLinear);
              localStorage.setItem("isLinear", JSON.stringify(!isLinear));
            }}
          />
        </div>
      </div>
      <div className="inline-block min-w-full align-middle pr-20 xl:pr-0">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-gray-50 text-[#050038] uppercase font-bold">
            <tr>
              <th className="px-6 py-4 border text-xl">Grade (Scale 10)</th>
              <th className="px-6 py-4 border-y border-r text-xl">
                Grade (Converted)
              </th>
              <th className="px-6 py-4 border-y border-r text-xl">
                Grade in Letters (Optional)
              </th>
            </tr>
          </thead>
          <tbody>
            {conversionTb.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-x border-b">
                  <input
                    type="number"
                    step="0.1"
                    value={row.grade10}
                    onChange={(e) =>
                      handleInputChange(index, "grade10", e.target.value)
                    }
                    className="bg-white px-3 py-2 text-lg"
                  />
                </td>
                <td className="px-6 py-4 border-r border-b ">
                  <input
                    type="number"
                    step="0.1"
                    value={row.gradeConverted}
                    onChange={(e) =>
                      handleInputChange(index, "gradeConverted", e.target.value)
                    }
                    className="bg-white px-3 py-2 text-lg"
                  />
                </td>
                <td className="px-6 py-4 border-r border-b ">
                  <input
                    type="text"
                    value={row.letter}
                    onChange={(e) =>
                      handleInputChange(index, "letter", e.target.value)
                    }
                    className="bg-white px-3 py-2 text-lg"
                  />
                </td>

                <td className="border-r border-y font-bold text-red-500 text-xl p-0 h-px ">
                  <div className="flex h-full w-full block">
                    <button
                      type="button"
                      onClick={() => {
                        const updatedConversions = conversionTb.filter(
                          (_, i) => i !== index
                        );
                        setConversions(updatedConversions);
                      }}
                      className="cursor-pointer w-full h-full block hover:bg-red-500 hover:text-white transition-colors p-4"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan={3} className="border-x border-b font-bold text-2xl">
                <button
                  onClick={addRow}
                  className="px-6 py-4 cursor-pointer w-full h-full hover:bg-[var(--dark-blue-primary)] hover:text-white transition-colors"
                >
                  Add a row +
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
