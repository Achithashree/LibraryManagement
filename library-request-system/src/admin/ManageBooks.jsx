import { useEffect, useState } from "react";
import booksData, { BOOKS_VERSION } from "../data/books";
import "../styles/manage.css";
import "../styles/animations.css";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);

  // 🔍 Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    image: "",
  });

  // Load books with version check
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books"));

    if (!storedBooks) {
      localStorage.setItem("books", JSON.stringify(booksData));
      localStorage.setItem("books_version", BOOKS_VERSION);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBooks(booksData);
      return;
    }

    const mergedBooks = booksData.map((book) => {
      const editedBook = storedBooks.find((b) => b.id === book.id);
      return editedBook ? editedBook : storedBooks
    });

    setBooks(mergedBooks);
    localStorage.setItem("books", JSON.stringify(mergedBooks));
  }, []);

  // 🎯 Unique genres
  const genres = ["all", ...new Set(books.map((b) => b.genre))];

  // 🔍 Filter logic
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGenre =
      selectedGenre === "all" || book.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  // Delete book
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    const updatedBooks = books.filter((b) => b.id !== id);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  // Open edit modal
  const handleEdit = (book) => {
    setEditBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      price: book.price,
      image: book.image || "",
    });
  };

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save edited book
  const handleSave = () => {
    const updatedBooks = books.map((b) =>
      b.id === editBook.id
        ? { ...b, ...formData, price: Number(formData.price) }
        : b,
    );

    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    setEditBook(null);
  };

  // Reset to books.js
  const handleReset = () => {
    if (
      !window.confirm(
        "This will reset all changes and reload latest books.js data. Continue?",
      )
    )
      return;

    localStorage.setItem("books", JSON.stringify(booksData));
    localStorage.setItem("books_version", BOOKS_VERSION);
    setBooks(booksData);
  };

  return (
    <div className="manage-books-page">
      <div className="manage-header">
        <h2>📚 Manage Books</h2>
        <button onClick={handleReset}>🔄 Reset to Latest</button>
      </div>

      {/* 🔍 SEARCH & FILTER */}
      <div className="manage-books-toolbar">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="book-search"
        />

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="book-filter"
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre === "all" ? "All Genres" : genre}
            </option>
          ))}
        </select>
      </div>

      {filteredBooks.length === 0 ? (
        <p>No books found</p>
      ) : (
        <div className="manage-books-grid">
          {filteredBooks.map((book) => (
            <div key={book.id} className="manage-book-card">
              <div className="manage-book-image">
                {book.image ? (
                  <img src={book.image} alt={book.title} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>

              <div className="manage-book-info">
                <h4>{book.title}</h4>
                <p className="author">{book.author}</p>
                <p className="genre">{book.genre}</p>
                <p className="price">₹{book.price}</p>
              </div>

              <div className="manage-book-actions">
                <button onClick={() => handleEdit(book)}>✏️ Edit</button>
                <button onClick={() => handleDelete(book.id)}>🗑 Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✏️ EDIT MODAL */}
      {editBook && (
        <div className="modal-overlaym">
          <div className="modal">
            <h3>Edit Book: {editBook.title}</h3>

            <div className="modal-formm">
              <label>Title</label>
              <input name="title" value={formData.title} onChange={handleChange} /><br />

              <label>Author</label>
              <input
                name="author"
                value={formData.author}
                onChange={handleChange}
              /> <br />

              <label>Genre</label>
              <input
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              /> <br />

              <label>Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              /> <br />

              <label>Image URL</label>
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
              /> <br />
            </div>

            <div className="modal-actionsm">
              <button onClick={handleSave}>💾 Save</button>
              <button onClick={() => setEditBook(null)}>❌ Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
