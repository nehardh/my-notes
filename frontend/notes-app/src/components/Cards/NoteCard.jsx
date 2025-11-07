import React from "react";
import { MdOutlinePushPin, MdDelete, MdCreate } from "react-icons/md";
import moment from "moment";
import { motion } from "framer-motion";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative border border-blue-100 bg-white/70 backdrop-blur-md shadow-sm 
                 rounded-2xl p-4 sm:p-5 transition-all duration-300 
                 hover:shadow-lg hover:border-blue-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <h6 className="text-base font-semibold text-gray-800 mb-1">
            {title?.length > 50 ? `${title.slice(0, 50)}...` : title || "Untitled"}
          </h6>
          <span className="text-xs text-gray-500">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>

        {/* Pin button */}
        <button
          onClick={onPinNote}
          className="text-gray-400 hover:text-blue-600 transition-transform duration-200 hover:scale-110"
          title={isPinned ? "Unpin Note" : "Pin Note"}
        >
          <MdOutlinePushPin
            className={`text-xl ${isPinned ? "text-blue-600" : "text-gray-400"}`}
          />
        </button>
      </div>

      {/* Content */}
      <p className="text-sm text-gray-700 mt-3 leading-relaxed line-clamp-3">
        {content || "No content yet..."}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tags?.length > 0 ? (
            tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md font-medium"
              >
                #{tag}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400 italic">No tags</span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 opacity-80 group-hover:opacity-100 transition">
          <button
            onClick={onEdit}
            title="Edit"
            className="text-gray-500 hover:text-green-600 transition-transform hover:scale-110"
          >
            <MdCreate className="text-lg" />
          </button>
          <button
            onClick={onDelete}
            title="Delete"
            className="text-gray-500 hover:text-red-600 transition-transform hover:scale-110"
          >
            <MdDelete className="text-lg" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard;
