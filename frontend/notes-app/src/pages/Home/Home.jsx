import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import Toast from '../../components/ToastMesaage/Toast'
import EmptyCard from '../../components/Cards/EmptyCard'
import AddNotesImg from '../../assets/add-notes.svg' 
import NoNotes from '../../assets/no-notes.svg' 

const Home = () => {

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  }); 

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add"
  });

  const [allNotes, setAllNotes] = useState([]); 
  const [userInfo, setUserInfo] = useState(null);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails});
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: "",
    });
  };

  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/get-user`);
      if(response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch(error) {
      if(error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }

  //Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/get-all-notes`);
      //console.log("Notes response:", response); // Log the full response
      if(response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch(error) {
      //console.error("Error fetching notes:", error); // Log the full error
      console.log("An unexpected error occured");
    }
  }

  const deleteNotes = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(`${API_BASE_URL}/delete-note/${noteId}`);
      if(response.data && !response.data.error) {
        showToastMessage("Note Deleted !", 'delete');
        getAllNotes();
      }
    } catch(error) {
      if(error.response && error.response.data && error.response.data.message) {
        console.log("An unexpected error occured");
      }
    }
  }

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/search-notes`, {
        params: { query },
      });

      if(response.data && response.data.message) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch(error) {
      console.log(error);
    }
  }

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  }

  const updateisPinned = async (noteData) => {
    try {
      const response = await axiosInstance.put(`${API_BASE_URL}/update-note-pinned/${noteData._id}` , { isPinned: !noteId.isPinned });
      if(response.data && response.data.notes) {
        showToastMessage("Note is Pinned !");
        getAllNotes();
      }
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllNotes() 
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar 
        userInfo={userInfo} 
        onSearchNote={onSearchNote} 
        handleClearSearch={handleClearSearch} 
        />
      <div className="w-3/4 mx-auto container">
        {allNotes.length > 0 ? <div className="grid grid-cols-2 gap-4 mt-8">
          {allNotes.map((item, index) => (
            <NoteCard 
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags={item.tags} 
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onDelete={() => deleteNotes(item)}
              onPinNote={() => updateisPinned(item)}
            /> 
          ))}
        </div> : <EmptyCard imgSrc={isSearch ? NoNotes : AddNotesImg} message={isSearch ? `We couldn't find any notes matching your search. Maybe they’re just shy!` : `Your brain is like a sponge – full of ideas! But even the best sponges need a little organization. Click 'Add' below to start creating notes and keep your brain from leaking!`}/>}
      </div>

      <button 
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10" 
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null})
        }}>
          <MdAdd className="text-[32px] text-white"/>
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: 'add', data: null })
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5"
      >
        <AddEditNotes 
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null})
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
          />
      </Modal>

      <Toast 
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  )
}

export default Home