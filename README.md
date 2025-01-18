# 📓 Notes App Frontend  

Welcome to the **frontend** repository for the Notes App! This project is built with **React.js** and offers users a sleek, distraction-free experience for managing their notes.  

---

## 🚀 Features  

### 🌟 Current Features  
- **User Authentication 🔑**: Signup and login functionality for personalized access.  
- **Create and Manage Notes 📝**: Add, edit, delete, and organize your notes effortlessly.  
- **Search Functionality 🔍**: Quickly find notes using the navbar search bar.  
- **Pin Notes 📌**: Keep important notes at the top of your list for easy reference.  

### 🚧 Future Enhancements  
- **Social Logins 🔐**: Support for Google and GitHub authentication.  
- **Mobile App Development 📱**: A dedicated mobile app for seamless on-the-go note management.  
- **Animations & UI Enhancements 🎨**: Improved user experience with **Aesternity UI** and **Next.js**.  
- **Offline Mode 💾**: Access your notes even without an internet connection.  

---

## 🛠️ Tech Stack  

### Frontend Technologies  
- **React.js**: Core framework for building the user interface.  
- **Axios**: For seamless API integration with the backend.  
- **CSS/Styled-Components**: For clean and responsive designs.  

### Backend (Integrated)  
This frontend communicates with a backend built on:  
- **Node.js**: Server-side runtime.  
- **Express.js**: Backend framework.  
- **MongoDB Atlas**: Cloud-hosted NoSQL database.  

---

## 🖥️ Installation  

Follow these steps to set up and run the project locally:  

1. **Clone the Repository**  
   ```bash  
   git clone [<repository-link>](https://github.com/nehardh/my-notes.git)  
   cd frontend  

2. **Install Dependencies**
   ```bash
   npm install

##🔗 API Endpoints
-The frontend interacts with the backend through the following key endpoints:

**POST /api/auth/signup**: Register a new user.
**POST /api/auth/login**: User login.
**GET /api/notes**: Fetch all notes for the logged-in user.
**POST /api/notes**: Create a new note.
**PUT /api/notes/:id**: Update a specific note.
**DELETE /api/notes/:id**: Delete a note.
Refer to the backend repository for detailed documentation.


##👩‍💻 Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch:
  ```bash
  git checkout -b feature/YourFeatureName
  ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
  ```bash
  git push origin feature/YourFeatureName
  ```
  
5. Open a Pull Request.

