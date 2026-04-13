import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/books.css";
import "../styles/animations.css";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const found = books.find((b) => b.id === Number(id));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBook(found);
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const books = JSON.parse(localStorage.getItem("books")) || [];
    const updated = books.map((b) => (b.id === book.id ? book : b));

    localStorage.setItem("books", JSON.stringify(updated));
    navigate("/admin/books");
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="book-form-container">
      <h2>Edit Book</h2>

      <form onSubmit={handleUpdate} className="book-form">
        <input name="title" value={book.title} onChange={handleChange} />
        <input name="author" value={book.author} onChange={handleChange} />
        <input name="genre" value={book.genre} onChange={handleChange} />
        <input name="price" type="number" value={book.price} onChange={handleChange} />
        <input name="image" value={book.image} onChange={handleChange} />

        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
