import { useLanguage } from "../LanguageContext";

export default function DegClassify({
  degreeClassification,
  setDegreeClassification,
}) {
  // Modify degree classification settings here
  // Where should lies the lowest grade for each degree classification
  // We have: High distinction, Distinction, Credit, Average and Fail to graduate
  const { language } = useLanguage();
  const addRow = () => {
    const newRow = { grade: 0, degree: "" };
    setDegreeClassification((prevClassifications) => [
      ...prevClassifications,
      newRow,
    ]);
  };
  const handleInputChange = (index, field, value) => {
    const updatedClassifications = degreeClassification.map((row, i) => {
      if (i === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setDegreeClassification(updatedClassifications);
  };
  return (
    <div className="mx-20 inline-block min-w-full lg:min-w-0 align-middle">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-50 text-[#050038] uppercase font-bold">
          <tr>
            <th className="px-6 py-4 border text-xl">
              {language === "en"
                ? "Lowest grade (converted scale)"
                : "Điểm chuẩn (thang đã chuyển đổi)"}
            </th>
            <th className="px-6 py-4 border-y border-r text-xl">
              {language === "en" ? "Degree classification" : "Xếp loại học lực"}
            </th>
          </tr>
        </thead>
        <tbody>
          {degreeClassification.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-6 py-4 border-x border-b">
                <input
                  type="number"
                  step="0.1"
                  value={row.grade}
                  onChange={(e) =>
                    handleInputChange(index, "grade", e.target.value)
                  }
                  className="bg-white px-3 py-2 text-lg"
                />
              </td>
              <td className="px-6 py-4 border-r border-b ">
                <input
                  type="text"
                  value={row.degree}
                  onChange={(e) =>
                    handleInputChange(index, "degree", e.target.value)
                  }
                  className="bg-white px-3 py-2 text-lg"
                />
              </td>

              <td className="border-r border-y font-bold text-red-500 text-xl p-0 h-px ">
                <div className="flex h-full w-full block">
                  <button
                    type="button"
                    onClick={() => {
                      const updatedClassify = degreeClassification.filter(
                        (_, i) => i !== index
                      );
                      setDegreeClassification(updatedClassify);
                    }}
                    className="cursor-pointer w-full h-full block hover:bg-red-500 hover:text-white transition-colors p-4"
                  >
                    {language === "en" ? "Delete" : "Xóa"}
                  </button>
                </div>
              </td>
            </tr>
          ))}

          <tr>
            <td colSpan={2} className="border-x border-b font-bold text-2xl">
              <button
                onClick={addRow}
                className="px-6 py-4 cursor-pointer w-full h-full hover:bg-[var(--dark-blue-primary)] hover:text-white transition-colors"
              >
                {language === "en" ? "Add a row +" : "Thêm hàng +"}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
