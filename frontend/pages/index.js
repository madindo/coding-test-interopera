import { useState, useEffect } from "react";
import React from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [highlightedId, setHighlightedId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/data")
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
      const response = await fetch("http://localhost:8000/api/ai", {
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
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-white shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900">Sales Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Powered by Next.js + FastAPI + Tailwind
        </p>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-12">
        {/* AI Loading Overlay */}
        {aiLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
            <div className="text-lg font-semibold">
              Thinking<span className="animate-pulse">...</span>
            </div>
          </div>
        )}

        {/* Sales Rep Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Sales Representatives</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => {
                const isHighlighted = Array.isArray(highlightedId)
                  ? highlightedId.includes(user.id)
                  : highlightedId === user.id;

                return (
                  <div
                    key={user.id}
                    className={`rounded-xl border shadow-sm p-5 bg-white transition-all duration-200 hover:shadow-md ${
                      isHighlighted
                        ? "border-red-500 ring-2 ring-red-300"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      className="w-16 h-16 mx-auto mb-3"
                      src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(
                        user.name
                      )}&randomizeIds=true`}
                      alt={`${user.name} avatar`}
                    />
                    <div className="text-center">
                      <h3 className="text-lg font-bold">{user.name}</h3>
                      <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                    <div className="mt-4 space-y-2 text-sm">
                      <p>
                        <strong>Region:</strong> {user.region}
                      </p>
                      <p>
                        <strong>Skills:</strong> {user.skills.join(", ")}
                      </p>

                      <div>
                        <strong>Clients:</strong>
                        <ul className="list-disc list-inside text-gray-600">
                          {user.clients.map((client, i) => (
                            <li key={i}>
                              {client.name} ({client.industry}) —{" "}
                              {client.contact}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <strong>Deals:</strong>
                        <ul className="list-disc list-inside text-gray-600">
                          {user.deals.map((deal, i) => (
                            <li key={i}>
                              {deal.client}: ${deal.value.toLocaleString()} –{" "}
                              {deal.status}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Floating AI Q&A Section */}
        <div className="fixed bottom-6 right-6 max-w-md w-full bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
          <h2 className="text-lg font-semibold mb-2">Ask AI a Question</h2>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="e.g. Who closed won the highest project?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && question.trim()) {
                  handleAskQuestion();
                }
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm"
            />
            <button
              onClick={handleAskQuestion}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700"
            >
              Ask
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
