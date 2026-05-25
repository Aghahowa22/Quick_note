import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { PenLine, Trash2, X, Check } from "lucide-react";

function NoteCard({ note }) {
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const formDate = (timestamp) => {
    if (!timestamp) return "Just Now";

    const date = timestamp.toDate();
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);

      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    try {
      setDeleting(true);

      await deleteDoc(doc(db, "notes", note.id));
    } catch (error) {
      console.error("Error deleting notes", error);
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdateError("");
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(note.title);
    setEditContent(note.content);
    setUpdateError("");
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      setUpdateError("Title cannot be empty");
      return;
    }

    try {
      setUpdating(true);
      const notesDoc = doc(db, "notes", note.id);
      await updateDoc(notesDoc, {
        title: editTitle.trim(),
        content: editContent.trim(),
      });
      setIsEditing(false);
      setUpdateError("");
    } catch (error) {
      console.error("Error updating note", error);
      setUpdateError("Failed to update note. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Note title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            rows="4"
            placeholder="Note content"
          />
        </div>

        {updateError && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
            {updateError}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={handleSaveEdit}
            disabled={updating}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Check className="h-4 w-4" />
            {updating ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handleCancelEdit}
            disabled={updating}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-1">
            {note.title}
          </h3>
          <div className="flex flex-row gap-6">
            <button
              onClick={handleEditClick}
              className="text-gray-400 hover:text-indigo-600 transition-colors"
              title="Edit note"
            >
              <PenLine />
            </button>
            <button
              className={`text-sm flex items-center justify-center p-1 rounded-full transition-colors ${
                confirmDelete
                  ? "bg-red-400 text-red-600"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
              disabled={deleting}
              onClick={handleDelete}
              title="Delete note"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div>
          {note.content || (
            <p className="">No content or description for the title</p>
          )}
        </div>

        <div className="text-sm text-gray-400">{formDate(note.createAt)}</div>
      </div>
    </div>
  );
}

export default NoteCard;
