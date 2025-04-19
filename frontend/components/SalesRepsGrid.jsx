import React from "react";
import SalesRepCard from "./SalesRepCard";

export default function SalesRepsGrid({ users, highlightedId }) {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => {
                const isHighlighted = Array.isArray(highlightedId)
                    ? highlightedId.includes(user.id)
                    : highlightedId === user.id;

                return <SalesRepCard key={user.id} user={user} isHighlighted={isHighlighted} />;
            })}
        </div>
    );
}
