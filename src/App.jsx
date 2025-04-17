import React, { useState } from "react";

const data = [
  { name: "PSSW_Adhikari", category: "General Topic", keyword: "Resilient built environment" },
  { name: "PSSW_Adhikari", category: "Tools & Methodologies", keyword: "Modelica-based building system modeling" },
  { name: "PSSW_Tutt", category: "Science Projects & Concepts", keyword: "tREXS and OGRE soft X-ray spectrometers" },
  { name: "PSSW_Gonzales", category: "Science Projects & Concepts", keyword: "Self-deploying radiator for thermal control" },
  { name: "PSSW_Ni", category: "General Topic", keyword: "Meta-optics and metalens technology" },
  { name: "PSSW_Falcone", category: "Science Projects & Concepts", keyword: "BlackCAT CubeSat X-ray transient monitoring" },
];

export default function KeywordSearch() {
  const [query, setQuery] = useState("");

  const filtered = data.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      item.keyword.toLowerCase().includes(query.toLowerCase())
  );

  const highlight = (text) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i}>{part}</mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Keyword Search</h1>
      <input
        type="text"
        placeholder="Search by keyword, category, or presentation..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6"
      />
      <div className="grid gap-4">
        {filtered.map((item, index) => (
          <div className="card" key={index}>
            <div className="text-sm font-semibold">{highlight(item.name)}</div>
            <div className="text-sm text-blue-700 font-medium">{highlight(item.category)}</div>
            <div className="mt-1 text-base">{highlight(item.keyword)}</div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-gray-500">No results found.</div>}
      </div>
    </div>
  );
}
