import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { useAuth } from "../context/AuthContext";
import { PenLine } from "lucide-react";

function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const [success, setSuccess] = useState(false);

  const {currentUser, toggle} = useAuth();

    const handleSubmit = async (e) => {
     e.preventDefault();
     setError("");
     setSuccess(false);

     if(!title.trim()) {
      return setError("Title is required");
        
     }

     try{
        setLoading(true);
        await addDoc(collection(db, "notes"),{
            title:title.trim(),
            content:content.trim(),
            userId: currentUser.uid,
            createAt: serverTimestamp()

        });

        setTitle("");
        setContent("");
        setSuccess(true);

        setTimeout(() => setSuccess(false), 3000)
     }catch(err){
        setError("Failed to create note" + err.message)
     }finally{
        setLoading(false);
     }
    }


  return (
    <div
      className={
        toggle
          ? "bg-zinc-800 rounded-lg shadow-md p-6 mb-8"
          : "bg-white rounded-lg shadow-md p-6 mb-8"
      }
    >
      <div className="flex items-center mb-4">
        <PenLine className=" h-5  w-5 text-indigo-600 mr-2" />
        <h2
          className={
            toggle
              ? "text-xl font-semibold text-white"
              : "text-xl font-semibold text-gray-800"
          }
        >
          Add a new Note
        </h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 text-green-700 p-2 rounded-md mb-4 text-sm">
          Note created successfully!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className={
              toggle
                ? "block text-sm font-medium text-white mb-1"
                : "block text-sm font-medium text-gray-700 mb-1"
            }
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            placeholder="Note Title"
            className="w-full px-3 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className={
              toggle
                ? "block text-sm font-medium text-white mb-1"
                : "block text-sm font-medium text-gray-700 mb-1"
            }
          >
            Content
          </label>
          <textarea
            id="content"
            type="text"
            value={content}
            placeholder="Write your note here"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 my-4 rounded-md hover:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Note"}
        </button>
      </form>
    </div>
  );
}

export default NoteForm;
