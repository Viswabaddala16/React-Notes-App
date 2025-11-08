import React, { useEffect, useState } from "react";
import api from "../api";
import NoteCard from "../components/NoteCard";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    try {
      const res = await api.getNotes({ search });
      setNotes(res.data);
    } catch (err) {
      console.error("Error loading notes:", err);
    }
  }

  async function addOrEditNote(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setMsg("⚠️ Title required!");
      return;
    }

    try {
      if (editing) {
        await api.updateNote(editing, form);
        setMsg("✅ Note updated!");
      } else {
        await api.createNote(form);
        setMsg("📝 Note added!");
      }
      setForm({ title: "", content: "" });
      setEditing(null);
      loadNotes();
    } catch (err) {
      console.error("Error adding/editing note:", err);
      setMsg("❌ Something went wrong!");
    }
  }

  async function deleteNote(id) {
    try {
      await api.deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      setMsg("🗑️ Note deleted!");
    } catch (err) {
      console.error("Error deleting note:", err);
      setMsg("❌ Failed to delete note");
    }
  }

  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-extrabold text-brandBlue">My Notes</h2>
        <div className="flex gap-2">
          <input
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-brandBlue rounded-lg bg-white/80 focus:ring-2 focus:ring-brandBlue"
          />
          <button
            onClick={loadNotes}
            className="bg-brandBlue text-white px-4 py-2 rounded-lg hover:bg-brandBlue/90 transition shadow-soft"
          >
            Search
          </button>
        </div>
      </div>

      <form
        onSubmit={addOrEditNote}
        className="bg-white/80 backdrop-blur-md border border-brandBlue shadow-soft p-6 rounded-2xl space-y-3"
      >
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border border-brandBlue rounded-lg focus:ring-2 focus:ring-brandBlue"
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full p-2 border border-brandBlue rounded-lg focus:ring-2 focus:ring-brandBlue"
          rows="4"
        />
        <button
          type="submit"
          className="bg-brandMint text-white px-4 py-2 rounded-lg hover:bg-brandMint/90 transition shadow-soft"
        >
          {editing ? "Update Note" : "Add Note"}
        </button>
      </form>

      {msg && (
        <div className="p-3 bg-brandYellow/30 text-yellow-900 rounded-lg text-center font-medium">
          {msg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((n) => (
          <NoteCard
            key={n._id}
            note={n}
            onEdit={(note) => {
              setEditing(note._id);
              setForm({ title: note.title, content: note.content });
            }}
            onDelete={deleteNote}
          />
        ))}
      </div>
    </div>
  );
}
