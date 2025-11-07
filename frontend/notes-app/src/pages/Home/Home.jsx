import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMesaage/Toast";
import EmptyCard from "../../components/Cards/EmptyCard";
import AddNotesImg from "../../assets/add-notes.svg";
import NoNotes from "../../assets/no-notes.svg";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [allNotes, setAllNotes] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
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

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get(`/get-user`);
      if (response.data?.user) setUserInfo(response.data.user);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get(`/get-all-notes`);
      if (response.data?.notes) setAllNotes(response.data.notes);
    } catch (error) {
      console.log("An unexpected error occurred");
    }
  };

  const deleteNotes = async (data) => {
    try {
      const response = await axiosInstance.delete(`/delete-note/${data._id}`);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted!", "delete");
        getAllNotes();
      }
    } catch (error) {
      console.log("An unexpected error occurred");
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get(`/search-notes`, {
        params: { query },
      });
      if (response.data?.notes) {
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
    const updatedPinnedState = !noteData.isPinned;

    try {
      const response = await axiosInstance.put(
        `/update-note-pinned/${noteData._id}`,
        { isPinned: updatedPinnedState }
      );

      if (response.data?.note) {
        showToastMessage(
          updatedPinnedState ? "Note pinned successfully" : "Note unpinned"
        );

        // Update UI immediately
        setAllNotes((prevNotes) =>
          prevNotes.map((note) =>
            note._id === noteData._id
              ? { ...note, isPinned: updatedPinnedState }
              : note
          )
        );
      } else {
        console.warn("Unexpected response:", response.data);
      }
    } catch (error) {
      console.error("Error updating pin status:", error);
    }
  };


  const pinnedNotes = allNotes.filter((note) => note.isPinned);
  const otherNotes = allNotes.filter((note) => !note.isPinned);

  useEffect(() => {
    getAllNotes();
    getUserInfo();
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* 🎨 Background Layer - Soft Texture */}
      <div className="absolute inset-0 -z-10 bg-[#f9fafc] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-[0.4]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(173,216,230,0.15),_transparent_70%)]" />

      {/* Navbar */}
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      {/* Main Content */}
      <div className="w-[90%] max-w-7xl mx-auto mt-6 pb-24">
        {allNotes.length > 0 ? (
          <>
            {pinnedNotes.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  📌 Pinned Notes
                </h2>
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

            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              All Notes
            </h2>
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
                : `Your brain is like a sponge – full of ideas! But even the best sponges need a little organization.`
            }
            onAdd={() =>
              setOpenAddEditModal({
                isShown: true,
                type: "add",
                data: null,
              })
            }
          />
        )}
      </div>

      {/* Floating Add Button */}
      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-blue-700 
                   hover:scale-110 shadow-2xl transition-transform fixed right-10 bottom-10 z-50"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      {/* Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.45)", zIndex: 1000 },
        }}
        className="w-[90%] sm:w-[60%] lg:w-[40%] max-h-[80vh] overflow-y-auto bg-white/80 backdrop-blur-lg 
                   border border-blue-100 rounded-2xl mx-auto mt-16 p-6 shadow-2xl transition-all"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      {/* Toast Notification */}
      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default Home;
