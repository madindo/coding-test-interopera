import React from "react";
import { useState, useEffect } from "react";
import SalesRepsGrid from "../components/SalesRepsGrid";
import AiQuestionBox from "../components/AiQuestionBox";
import Navbar from "../components/Navbar";
import AiLoadingOverlay from "../components/AiLoadingOverlay";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [highlightedId, setHighlightedId] = useState(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE}/api/data`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.salesReps || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  }, []);

  const handleAskQuestion = async () => {
    setAiLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();

      let result = data;
      if (typeof result === "string") {
        try {
          result = JSON.parse(result);
        } catch {
          console.warn("Couldn't parse JSON answer:", result);
        }
      }

      if (result?.id) {
        setHighlightedId(result.id);
      } else if (result?.ids) {
        setHighlightedId(result.ids);
      }

      setAnswer(result.answer);
    } catch (error) {
      console.error("Error in AI request:", error);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 pb-40">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6 space-y-12">
        {aiLoading && <AiLoadingOverlay />}

        <section>
          <h2 className="text-2xl font-semibold mb-4">Sales Representatives</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <SalesRepsGrid users={users} highlightedId={highlightedId} />
          )}
        </section>

        <AiQuestionBox
          question={question}
          setQuestion={setQuestion}
          handleAskQuestion={handleAskQuestion}
        />
      </main>
    </div>
  );
}
