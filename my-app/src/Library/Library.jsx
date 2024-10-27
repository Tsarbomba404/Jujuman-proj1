import React, { useEffect, useState } from "react";
// import "./Library.css";
import Modal from "react-modal";

const booksBaseApiURL = "https://potterapi-fedeperin.vercel.app/en/books";
const Library = () => {
  const [text, setText] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookGenre, setBookGenre] = useState("Romance");
  const [task, setTask] = useState([]);
  const [searchFilter, setSearchFilter] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [selectedBookId, setSelectedBookId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const fetchBooksExternal = async () => {
    setIsLoading(true);
    const response = await fetch(booksBaseApiURL);
    const books = await response.json();

    const modifyBooksToMatchCurrentLibraryData = books.map((book) => {
      return {
        id: book.number,
        author: "Harry Potter",
        genre: bookGenre,
        ...book,
      };
    });
    setTask(modifyBooksToMatchCurrentLibraryData);
    setIsLoading(false);
    console.log("Books", books);
  };

  useEffect(() => {
    fetchBooksExternal();
  }, []);

  function openModal(idx) {
    setIsOpen(true);
    setSelectedBookId(idx);
    const book = task.find((b) => b.id == idx);

    setEditTitle(book.title);
    setEditAuthor(book.author);
  }
  function completeEditWithSave() {
    const updatedBooks = task.map((b) => {
      if (b.id === selectedBookId) {
        return {
          b,
          title: editTitle,
          author: editAuthor,
        };
      }
      return b;
    });
    setIsOpen(false);
    setTask(updatedBooks);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function remove(index) {
    const updatedTask = task.filter((element, i) => i !== index);
    setTask(updatedTask);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookTitle && bookAuthor) {
      const newTask = {
        id: task.length + 1,
        title: bookTitle,
        author: bookAuthor,
        genre: bookGenre,
      };
      setTask([...task, newTask]);
      setIsModalOpen(false);
      setBookTitle("");
      setBookAuthor("");
      setBookGenre("Romance");
    }
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  // const filteredTasks = task.filter((element) =>
  //   element.title.toLowerCase().includes(text.toLowerCase())
  // );

  useEffect(() => {
    setSearchFilter(
      task.filter((result) =>
        result.title.toLowerCase().includes(text.toLowerCase())
      )
    );
  }, [task, text]);

  return (
    <div id="lib">
      <div className="search-container">
        <input
          style={{ width: "80%", height: "100%" }}
          type="text"
          value={text}
          onChange={handleText}
          placeholder="Search by title..."
        />
        <div
          style={{
            backgroundColor: "#16a085",
            color: "#ffffff",
            fontSize: 14,
            display: "grid",
            placeContent: "center",
            width: "60px",
            height: "25px",
            cursor: "pointer",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          Add
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>Enter new Edit</div>

        <p>Enter New Title</p>
        <input
          type="text"
          placeholder="Enter New Title"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <p>Enter New Author</p>
        <input
          type="text"
          placeholder="Enter New Author"
          value={editAuthor}
          onChange={(e) => setEditAuthor(e.target.value)}
        />
        <p>Enter New genre</p>
        <input type="text" placeholder="Enter New genre" />

        <button onClick={completeEditWithSave}>Save</button>
      </Modal>
      {isLoading ? (
        <p style={{ marginTop: 16, marginLeft: 24, color: "white" }}>
          loading...
        </p>
      ) : searchFilter.length < 1 ? (
        <p style={{ color: "white" }}>OOps😢 No Search Results Found</p>
      ) : (
        <div className="my-house">
          {searchFilter.map((element, index) => (
            <div className="card" key={index}>
              <div
                className="edit"
                style={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  cursor: "pointer",
                }}
                onClick={() => openModal(element.id)}
              >
                ✏
              </div>
              <div style={{ width: "100%", height: 200, marginBottom: 25 }}>
                <img
                  style={{
                    objectFit: "contain",
                    height: "100%",
                    width: "100%",
                  }}
                  src={element.cover}
                  alt="Book Cover"
                />
              </div>
              <span className="card-id">ID: {element.id}</span>
              <span className="card-title">Title:{element.title}</span>
              <span className="card-author">Author: {element.author}</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="card-genre">Genre:{element.genre}</div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => remove(index)}
                >
                  ❌
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="overlay" onClick={() => setIsModalOpen(false)}></div>
          <div className="modal-content">
            <p>ENTER BOOK INFORMATION</p>
            <form onSubmit={handleSubmit}>
              <input
                className="input-modal"
                placeholder="Enter Book Title"
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
              />
              <input
                className="input-modal"
                placeholder="Enter Book Author"
                type="text"
                value={bookAuthor}
                onChange={(e) => setBookAuthor(e.target.value)}
              />
              <select
                className="input-modal"
                value={bookGenre}
                onChange={(e) => setBookGenre(e.target.value)}
              >
                <option value="Romance">Romance</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Paranormal">Paranormal</option>
                <option value="Mystery">Mystery</option>
                <option value="Horror">Horror</option>
                <option value="Thriller & Suspense">Thriller & Suspense</option>
                <option value="Action & Adventure">Action & Adventure</option>
                <option value="Historical Fiction">Historical Fiction</option>
                <option value="Contemporary Fiction">
                  Contemporary Fiction
                </option>
              </select>

              <br />
              <br />
              <button
                style={{ backgroundColor: "green", color: "white" }}
                type="submit"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;
