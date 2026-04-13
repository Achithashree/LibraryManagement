import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/books.css";
import "../styles/animations.css";

const AddBook = () => {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    price: "",
    image: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!book.title || !book.author || !book.genre || !book.price) {
      setError("All fields are required");
      return;
    }

    const existingBooks =
      JSON.parse(localStorage.getItem("books")) || [];

    const newBook = {
      ...book,
      id: Date.now(),
      price: Number(book.price),
    };

    localStorage.setItem(
      "books",
      JSON.stringify([...existingBooks, newBook])
    );

    navigate("/admin/dashboard");
  };

  return (
    <div className="addbook-container">
      <h2>➕ Add New Book</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="addbook-form">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
        />

        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={book.genre}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={book.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={book.image}
          onChange={handleChange}
        />

        {/* IMAGE PREVIEW */}
        {book.image && (
          <div className="preview">
            <img src={book.image} alt="Preview" />
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="save-btn">
            Save Book
          </button>

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/admin/dashboard")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
