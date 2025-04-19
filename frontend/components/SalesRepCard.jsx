import React from "react";

export default function SalesRepCard({ user, isHighlighted }) {
    return (
        <div
            className={`rounded-xl border shadow-sm p-5 bg-white transition-all duration-200 hover:shadow-md ${isHighlighted ? "border-red-500 ring-2 ring-red-300" : "border-gray-200"
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
                                {client.name} ({client.industry}) — {client.contact}
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <strong>Deals:</strong>
                    <ul className="list-disc list-inside text-gray-600">
                        {user.deals.map((deal, i) => (
                            <li key={i}>
                                {deal.client}: ${deal.value.toLocaleString()} – {deal.status}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
