import React, { useState } from 'react'
import TagInput from '../../components/Input/TagInput'
import { MdClose } from 'react-icons/md'

const AddEditNotes = ({ noteData, type, onClose }) => {
 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  const [error, setError] = useState(null);

  //Add Note
  const addNewNote = async () => {};

  //Edit Note 
  const editNote = async () => {};

  const handleAddNote = () => {
    if(!title) {
      setError("Please enter a title");
      return;
    }

    if(!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if(type === 'edit') {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button className="w-8 h-8 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-200" onClick={onClose}>
        <MdClose className="text-xl text-slate-400"/>
      </button>
      <div className="flex flex-col gap-2">
          <label className="input-label">Title</label>
          <input 
              type="text" 
              className="text-2xl text-slate-950 outline-none"
              placeholder='Complete React project'
              value={ title }
              onChange={({ target }) => {setTitle(target.value)}}
              />
      </div>

      <div className="flex flex-col gap-2 mt-4">
          <label className="input-label">Content</label>
          <textarea 
              type="text" 
              className="text-sm text-slate-950 outline-none bg-slate-100 p-2 rounded"
              placeholder='Content'
              rows={8}
              value={ content }
              onChange={({ target }) => {setContent(target.value)}}
              />
      </div>

      <div>
          <label className="input-label">Tags</label>
          <TagInput tags={tags} setTags={setTags}/>
      </div>

      {error && <p className="text-red-500 text-xs pb-1 pt-4">{error}</p>}

      <button className="btn-primary font-medium mt-4 p-3" onClick={handleAddNote}>Add</button>
    </div>
  )
}

export default AddEditNotes