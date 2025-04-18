import React, { useState } from "react";
import groupedData from "./grouped_keyword_data";

export default function KeywordSearch() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allCategories = Array.from(
    new Set(
      Object.values(groupedData).flatMap((entry) => Object.keys(entry))
    )
  ).sort();

  const highlight = (text) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} style={{ backgroundColor: "#fef08a", color: "black" }}>
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const filteredEntries = Object.entries(groupedData).filter(([presentation, categories]) => {
    const cleanName = presentation
      .replace(/^PSSW_/i, '')
      .replace('YamamotoRadlinska', 'Yamamoto/Radlinska')
      .replace('KravetBilen', 'Kravet/Bilen');

    const lowerQuery = query.toLowerCase();
    const matchesQuery =
      cleanName.toLowerCase().includes(lowerQuery) ||
      Object.entries(categories).some(([cat, keywords]) =>
        cat.toLowerCase().includes(lowerQuery) ||
        keywords.some((kw) => kw.toLowerCase().includes(lowerQuery))
      );

    const matchesCategory =
      selectedCategory === "All" || Object.keys(categories).includes(selectedCategory);

    return matchesQuery && matchesCategory;
  });

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Keyword Search (Grouped)
      </h1>
      <input
        type="text"
        placeholder="Search by presentation, keyword, or category..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", fontSize: "1rem" }}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{ width: "100%", padding: "0.5rem", marginBottom: "1.5rem", fontSize: "1rem" }}
      >
        <option value="All">All Categories</option>
        {allCategories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <div style={{ display: "grid", gap: "1rem" }}>
        {filteredEntries.map(([presentation, categories]) => {
          const cleanName = presentation
            .replace(/^PSSW_/i, '')
            .replace('YamamotoRadlinska', 'Yamamoto/Radlinska')
            .replace('KravetBilen', 'Kravet/Bilen');
          return (
            <div key={presentation} style={{ background: "white", borderRadius: "0.5rem", padding: "1rem", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.5rem" }}>
                {highlight(cleanName)}
              </h2>
              {Object.entries(categories)
                .filter(([category]) => selectedCategory === "All" || category === selectedCategory)
                .map(([category, keywords]) => (
                <div key={category} style={{ marginBottom: "0.5rem" }}>
                  <span style={{ border: "1px solid #ccc", borderRadius: "0.25rem", padding: "0.25rem 0.5rem", marginRight: "0.5rem", display: "inline-block", fontSize: "0.875rem" }}>
                    {highlight(category)}
                  </span>
                  <span style={{ fontSize: "0.875rem" }}>
                    {keywords.map((kw, i) => (
                      <span key={i}>{highlight(kw)}{i < keywords.length - 1 ? ", " : ""}</span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          );
        })}
        {filteredEntries.length === 0 && <div style={{ color: "gray" }}>No results found.</div>}
      </div>
    </div>
  );
}
