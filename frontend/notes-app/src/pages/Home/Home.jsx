import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMesaage/Toast';
import EmptyCard from '../../components/Cards/EmptyCard';
import AddNotesImg from '../../assets/add-notes.svg';
import NoNotes from '../../assets/no-notes.svg';

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: 'add',
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: '',
    type: 'add',
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: 'edit', data: noteDetails });
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
      message: '',
    });
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get(`/get-user`);
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get(`/get-all-notes`);
      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log('An unexpected error occurred');
    }
  };

  const deleteNotes = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);
      if (response.data && !response.data.error) {
        showToastMessage('Note Deleted!', 'delete');
        getAllNotes();
      }
    } catch (error) {
      console.log('An unexpected error occurred');
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get(`/search-notes`, {
        params: { query },
      });

      if (response.data && response.data.message) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  const updateisPinned = async (noteData) => {
    try {
      const response = await axiosInstance.put(`/update-note-pinned/${noteData._id}`, {
        isPinned: !noteData.isPinned,
      });
      if (response.data && response.data.notes) {
        showToastMessage('Note is Pinned!');
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pinnedNotes = allNotes.filter((note) => note.isPinned);
  const otherNotes = allNotes.filter((note) => !note.isPinned);

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

      <div className="w-[90%] max-w-7xl mx-auto mt-6">
        {allNotes.length > 0 ? (
          <>
            {pinnedNotes.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">📌 Pinned Notes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                  {pinnedNotes.map((item) => (
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
                </div>
              </>
            )}

            <h2 className="text-xl font-semibold text-gray-800 mb-3"> All Notes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {otherNotes.map((item) => (
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
            </div>
          </>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoNotes : AddNotesImg}
            message={
              isSearch
                ? `We couldn't find any notes matching your search. Maybe they’re just shy!`
                : `Your brain is like a sponge – full of ideas! But even the best sponges need a little organization. Click 'Add' below to start creating notes and keep your brain from leaking!`
            }
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 shadow-xl transition-transform transform hover:scale-110 fixed right-10 bottom-10 z-50"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: 'add', data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: 'add', data: null })
        }
        style={{
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 1000,
          },
        }}
        contentLabel=""
        className="w-[90%] sm:w-[60%] lg:w-[40%] max-h-[80vh] overflow-y-auto bg-white rounded-xl mx-auto mt-16 p-6 shadow-lg"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: 'add', data: null });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast isShown={showToastMsg.isShown}message={showToastMsg.message}type={showToastMsg.type} onClose={handleCloseToast} />
    </>
  );
};

export default Home;
