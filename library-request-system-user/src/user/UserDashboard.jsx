import { useState, useEffect } from "react";
import "../styles/user-dashboard.css";
import "../styles/animations.css";
import "../styles/user-books.css";
import booksData from "../data/books.js";

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedBook, setSelectedBook] = useState(null);
  const [requests, setRequests] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userId = 1;

  useEffect(() => {
    const storedRequests = JSON.parse(localStorage.getItem("requests") || "[]");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRequests(storedRequests.filter((r) => r.userId === userId));
  }, []);

  const handleRequestBook = (book) => {
    const allRequests = JSON.parse(localStorage.getItem("requests") || "[]");

    const alreadyRequested = allRequests.some(
      (r) =>
        r.bookId === book.id && r.userId === userId && r.status !== "cancelled",
    );

    if (alreadyRequested) {
      alert("You already requested this book");
      return;
    }

    const newRequest = {
      id: Date.now(),
      userId,
      bookId: book.id,
      title: book.title,
      author: book.author,
      status: "pending",
      deleted: false,
      deletedAt: null,
      date: new Date().toLocaleDateString(),
    };

    const updatedRequests = [...allRequests, newRequest];
    localStorage.setItem("requests", JSON.stringify(updatedRequests));

    setRequests(updatedRequests.filter((r) => r.userId === userId));
    setSelectedBook(null);
  };

  const handleDeleteRequest = (id) => {
    const all = JSON.parse(localStorage.getItem("requests") || "[]");

    const updated = all.map((r) =>
      r.id === id
        ? {
            ...r,
            status: "cancelled",
            deleted: true,
            deletedAt: new Date().toISOString(),
          }
        : r,
    );

    localStorage.setItem("requests", JSON.stringify(updated));
    setRequests(updated.filter((r) => r.userId === userId));
  };

  const handleUndoRequest = (id) => {
    const all = JSON.parse(localStorage.getItem("requests") || "[]");

    const updated = all.map((r) =>
      r.id === id
        ? {
            ...r,
            status: "pending",
            deleted: false,
            deletedAt: null,
          }
        : r,
    );

    localStorage.setItem("requests", JSON.stringify(updated));
    setRequests(updated.filter((r) => r.userId === userId));
  };

  const handleClearCancelled = () => {
    const all = JSON.parse(localStorage.getItem("requests") || "[]");

    const remaining = all.filter(
      (r) => !(r.userId === userId && r.status === "cancelled"),
    );

    localStorage.setItem("requests", JSON.stringify(remaining));
    setRequests(remaining.filter((r) => r.userId === userId));
  };

  const handleClearAll = () => {
    const all = JSON.parse(localStorage.getItem("requests") || "[]");

    const remaining = all.filter((r) => r.userId !== userId);

    localStorage.setItem("requests", JSON.stringify(remaining));
    setRequests([]);
  };

  const totalBooks = booksData.length;
  const totalRequests = requests.length;
  const pendingRequests = requests.filter((r) => r.status === "pending").length;

  const filteredBooks = booksData
    .filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((book) => (genreFilter ? book.genre === genreFilter : true));

  const genres = [...new Set(booksData.map((b) => b.genre))];

  return (
    <div className="dashboard-container">
      <section className="actions-grid">
        <div
          className={`action-card ${activeSection === "home" ? "active" : ""}`}
          onClick={() => setActiveSection("home")}
        >
          <h3>📚 View Books</h3>
          <p>Browse available books</p>
        </div>

        <div
          className={`action-card ${
            activeSection === "requests" ? "active" : ""
          }`}
          onClick={() => setActiveSection("requests")}
        >
          <h3>📄 My Requests</h3>
          <p>Track request status</p>
        </div>
      </section>

      <section className="dashboard-content">
        {activeSection === "home" && (
          <>
            <section className="stats-section">
              <div className="stat-box">
                <h4>Available Books</h4>
                <p>{totalBooks}</p>
              </div>
              <div className="stat-box">
                <h4>My Requests</h4>
                <p>{totalRequests}</p>
              </div>
              <div className="stat-box">
                <h4>Pending</h4>
                <p>{pendingRequests}</p>
              </div>
            </section>

            <h3>📚 Available Books</h3>

            <section className="search-filter-section">
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="custom-dropdown">
                <div
                  className="dropdown-selected"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {genreFilter || "All Genres"}
                  <span className={`arrow ${dropdownOpen ? "open" : ""}`}>
                    ▾
                  </span>
                </div>

                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        setGenreFilter("");
                        setDropdownOpen(false);
                      }}
                    >
                      All Genres
                    </div>

                    {genres.map((g) => (
                      <div
                        key={g}
                        className="dropdown-item"
                        onClick={() => {
                          setGenreFilter(g);
                          setDropdownOpen(false);
                        }}
                      >
                        {g}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            <section className="famous-books">
              <div className="books-container">
                {filteredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="book-card"
                    onClick={() => setSelectedBook(book)}
                  >
                    <img src={book.image} alt={book.title} />
                    <h4>{book.title}</h4>
                    <p>{book.author}</p>
                    <p>{book.genre}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeSection === "requests" && (
          <section className="requests-section">
            <h3>📄 My Requests</h3> <br />

            <div className="clear-actions">
              <button
                className="clear-cancelled-btn"
                onClick={handleClearCancelled}
              >
                🧹 Clear Cancelled
              </button>

              <button className="clear-all-btn" onClick={handleClearAll}>
                💀 Clear All
              </button>
            </div>

            {requests.map((req) => (
              <div key={req.id} className="request-card">
                <h4>{req.title}</h4>
                <p>Author: {req.author}</p>
                <p>Status: {req.status}</p>
                <p>Date: {req.date}</p>

                {req.status !== "cancelled" ? (
                  <button onClick={() => handleDeleteRequest(req.id)}>
                    ❌ Delete
                  </button>
                ) : (
                  <button onClick={() => handleUndoRequest(req.id)}>
                    ↩ Undo
                  </button>
                )}
              </div>
            ))}
          </section>
        )}
      </section>

      {selectedBook && (
        <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedBook.image} alt={selectedBook.title} />
            <h3>{selectedBook.title}</h3>
            <p>Price: ₹{selectedBook.price}</p>

            <button onClick={() => handleRequestBook(selectedBook)}>
              📩 Request Book
            </button>
            <button onClick={() => setSelectedBook(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
