import React from "react";
export default function AiLoadingOverlay() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
            <div className="text-lg font-semibold">
                Thinking<span className="animate-pulse">...</span>
            </div>
        </div>
    );
}
