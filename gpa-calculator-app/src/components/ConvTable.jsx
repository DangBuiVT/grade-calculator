import React from "react";

export default function ConversionTable({ conversionTb, setConversions }) {
  // Marking parameters: grade in scale 10, grade in scale 4, letter grade
  const addRow = () => {
    const newRow = { grade10: 0, grade4: 0, letter: "" };
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
  return (
    <div className="mx-20">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-50 text-[#050038] uppercase font-bold">
          <tr>
            <th className="px-6 py-4 border text-xl">Grade (Scale 10)</th>
            <th className="px-6 py-4 border-y border-r text-xl">
              Grade (Scale 4)
            </th>
            <th className="px-6 py-4 border-y border-r text-xl">
              Grade in Letters
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
                  value={row.grade4}
                  onChange={(e) =>
                    handleInputChange(index, "grade4", e.target.value)
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
                    className="cursor-pointer w-full h-full block hover:bg-red-500 hover:text-white transition-colors"
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
      <button
        onClick={() => {
          window.location.href = "/home";
        }}
        className="bg-[var(--dark-blue-primary)] px-4 py-2 rounded-full cursor-pointer text-white text-xl font-bold my-10 hover:bg-[var(--dark-blue-primary)]/90 transition-opacity"
      >
        Finish changes
      </button>
    </div>
  );
}
