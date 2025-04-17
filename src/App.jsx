import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import groupedData from "./grouped_keyword_data"; // assuming you save it as a module

export default function KeywordSearch() {
  const [query, setQuery] = useState("");

  const highlight = (text) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300 text-black">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const filteredEntries = Object.entries(groupedData).filter(([presentation, categories]) => {
    const lowerQuery = query.toLowerCase();
    return (
      presentation.toLowerCase().includes(lowerQuery) ||
      Object.entries(categories).some(([cat, keywords]) =>
        cat.toLowerCase().includes(lowerQuery) ||
        keywords.some((kw) => kw.toLowerCase().includes(lowerQuery))
      )
    );
  });

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Keyword Search (Grouped)</h1>
      <Input
        placeholder="Search by presentation, keyword, or category..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-6"
      />
      <div className="grid gap-4">
        {filteredEntries.map(([presentation, categories]) => (
          <Card key={presentation}>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">{highlight(presentation)}</h2>
              {Object.entries(categories).map(([category, keywords]) => (
                <div key={category} className="mb-2">
                  <Badge variant="outline" className="mr-2 mb-1 inline-block">
                    {highlight(category)}
                  </Badge>
                  <span className="text-sm">
                    {keywords.map((kw, i) => (
                      <span key={i}>{highlight(kw)}{i < keywords.length - 1 ? ", " : ""}</span>
                    ))}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
        {filteredEntries.length === 0 && <div className="text-gray-500">No results found.</div>}
      </div>
    </div>
  );
}
