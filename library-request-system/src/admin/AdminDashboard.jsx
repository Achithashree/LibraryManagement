import { useState, useEffect } from "react";
import "../styles/dashboard.css";
import "../styles/animations.css";
import booksData from "../data/books";

import AddBook from "./AddBook";
import ManageBooks from "./ManageBooks";
import Requests from "./Requests";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const goHome = () => setActiveSection("home");
    window.addEventListener("dashboard:home", goHome);
    return () => window.removeEventListener("dashboard:home", goHome);
  }, []);

  const requests = JSON.parse(localStorage.getItem("requests")) || [];

  const totalBooks = booksData.length;
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(
    (req) => req.status === "pending",
  ).length;

  const famousBooks = booksData.slice(0, 7);

  return (
    <div className="dashboard-container">
      {/* ACTION GRID */}
      <section className="actions-grid">
        <div
          className={`action-card ${activeSection === "add" ? "active" : ""}`}
          onClick={() => setActiveSection("add")}
        >
          <h3>➕ Add Book</h3>
          <p>Add new books to the library</p>
        </div>

        <div
          className={`action-card ${activeSection === "manage" ? "active" : ""}`}
          onClick={() => setActiveSection("manage")}
        >
          <h3>📚 Manage Books</h3>
          <p>Edit or remove books</p>
        </div>

        <div
          className={`action-card ${activeSection === "requests" ? "active" : ""}`}
          onClick={() => setActiveSection("requests")}
        >
          <h3>📄 View Requests</h3>
          <p>Approve or reject requests</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="dashboard-content">
        {activeSection === "home" && (
          <>
            {/* STATS */}
            <section className="stats-section">
              <div className="stat-box">
                <h4>Total Books</h4>
                <p>{totalBooks}</p>
              </div>
              <div className="stat-box">
                <h4>Total Requests</h4>
                <p>{totalRequests}</p>
              </div>
              <div className="stat-box">
                <h4>Pending Requests</h4>
                <p>{pendingRequests}</p>
              </div>
            </section>

            {/* CHART */}
            <section className="chart-section">
              <h3>Library Overview</h3>
              <div className="chart-row">
                <span>Books</span>
                <div
                  className="bar"
                  style={{ width: `${Math.min(totalBooks * 10, 100)}%` }}
                />
              </div>
              <div className="chart-row">
                <span>Requests</span>
                <div
                  className="bar"
                  style={{ width: `${Math.min(totalRequests * 10, 100)}%` }}
                />
              </div>
              <div className="chart-row">
                <span>Pending</span>
                <div
                  className="bar"
                  style={{ width: `${Math.min(pendingRequests * 10, 100)}%` }}
                />
              </div>
            </section>

            {/* FAMOUS BOOKS */}
            <section className="famous-books">
              <h3>⭐ Famous Books</h3>

              <div className="books-container">
                {famousBooks.map((book) => (
                  <div
                    key={book.id}
                    className="book-card"
                    onClick={() => setSelectedBook(book)}
                  >
                    <img
                      className="book-cover"
                      src={book.image}
                      alt={book.title}
                    />

                    <h4 className="book-title">{book.title}</h4>
                    <p className="book-author">{book.author}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {activeSection === "add" && <AddBook />}
        {activeSection === "manage" && <ManageBooks />}
        {activeSection === "requests" && <Requests />}
      </section>

      {/* MODAL */}
      {selectedBook && (
        <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedBook.image} alt={selectedBook.title} />
            <h3>{selectedBook.title}</h3>
            <p>
              <b>Author:</b> {selectedBook.author}
            </p>
            <p>
              <b>Genre:</b> {selectedBook.genre}
            </p>
            <p>
              <b>Price:</b> ₹{selectedBook.price}
            </p>
            <button onClick={() => setSelectedBook(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
