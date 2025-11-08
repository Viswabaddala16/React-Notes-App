import React from "react";

export default function NoteCard({ note, onDelete, onEdit }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-brandBlue rounded-2xl p-4 shadow-soft hover:shadow-lg transition">
      <h3 className="font-semibold text-lg text-brandBlue mb-1">{note.title}</h3>
      <p className="text-softText text-sm mb-3">
        {note.content.slice(0, 120)}
        {note.content.length > 120 ? "..." : ""}
      </p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
        <div className="space-x-2">
          <button
            onClick={() => onEdit(note)}
            className="text-brandMint hover:text-green-700 font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="text-brandPink hover:text-red-700 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
