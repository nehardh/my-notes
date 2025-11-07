import React, { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstance";
import { motion } from "framer-motion";

const AddEditNotes = ({
  noteData,
  type,
  getAllNotes,
  onClose,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);

  // Add new note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data?.notes) {
        showToastMessage("Note Added!");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };

  // Edit existing note
  const editNote = async () => {
    try {
      const response = await axiosInstance.put(`/edit-note/${noteData._id}`, {
        title,
        content,
        tags,
      });
      if (response.data?.notes) {
        showToastMessage("Note Updated!");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
    }
  };

  const handleAddNote = () => {
    if (!title.trim()) return setError("Please enter a title");
    if (!content.trim()) return setError("Please enter the content");
    setError("");

    type === "add" ? addNewNote() : editNote();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative bg-white/70 backdrop-blur-lg border border-blue-100 rounded-2xl p-6 sm:p-8 shadow-xl max-w-lg mx-auto"
    >
      {/* Close Button */}
      <button
        className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full hover:bg-blue-50 transition"
        onClick={onClose}
      >
        <MdClose className="text-2xl text-gray-500 hover:text-blue-600 transition" />
      </button>

      {/* Title */}
      <div className="flex flex-col gap-2 mt-1">
        <label className="text-sm font-semibold text-gray-700 tracking-tight">
          Title
        </label>
        <input
          type="text"
          className="text-lg sm:text-xl font-medium text-gray-900 bg-transparent border border-blue-100 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
          placeholder="Complete React project"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-sm font-semibold text-gray-700 tracking-tight">
          Content
        </label>
        <textarea
          className="text-sm sm:text-base text-gray-800 bg-white/60 border border-blue-100 rounded-lg p-3 h-36 resize-none focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
          placeholder="Write your note content here..."
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      {/* Tags */}
      <div className="mt-4">
        <label className="text-sm font-semibold text-gray-700 tracking-tight">
          Tags
        </label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {/* Error message */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-xs mt-3 font-medium"
        >
          {error}
        </motion.p>
      )}

      {/* CTA Button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        onClick={handleAddNote}
        className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 
                   text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all"
      >
        {type === "edit" ? "Update Note" : "Add Note"}
      </motion.button>
    </motion.div>
  );
};

export default AddEditNotes;
