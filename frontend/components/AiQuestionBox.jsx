import React from "react";

export default function AiQuestionBox({ question, setQuestion, handleAskQuestion }) {
    return (
        <div className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
            <h2 className="text-lg font-semibold mb-2">Ask AI a Question</h2>
            <div className="flex gap-2 mb-2">
                <input
                    type="text"
                    placeholder="e.g. Who closed won the highest project? or Who are the top 3 closed won?"
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
    );
}
