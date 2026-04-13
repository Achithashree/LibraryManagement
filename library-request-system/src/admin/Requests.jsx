import { useEffect, useState } from "react";
import "../styles/requests.css";
import "../styles/animations.css";
import booksData from "../data/books";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  const loggedUser =
    JSON.parse(localStorage.getItem("loggedUser")) || null;

  useEffect(() => {
    const storedRequests =
      JSON.parse(localStorage.getItem("requests")) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRequests(storedRequests);
  }, []);

  const updateStatus = (id, status) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status } : req
    );
    setRequests(updated);
    localStorage.setItem("requests", JSON.stringify(updated));
  };

  const deleteRequest = (id) => {
    if (!window.confirm("Delete this request permanently?")) return;

    const updated = requests.filter((req) => req.id !== id);
    setRequests(updated);
    localStorage.setItem("requests", JSON.stringify(updated));
  };

  if (requests.length === 0) {
    return <p className="no-requests">No book requests found.</p>;
  }

  return (
    <div className="requests-section">
      <h2>📄 Admin Book Requests</h2>

      <div className="requests-list">
        {requests.map((req) => {
          const book = booksData.find(
            (b) => b.id === req.bookId
          );

          const dateObj = req.date
            ? new Date(req.date)
            : new Date();

          return (
            <div key={req.id} className="request-card">

              <div className="request-top">
                <img
                  src={book?.image || "/assets/default.jpg"}
                  alt="book"
                  className="book-img"
                />

                <div className="request-info">
                  <h4>{book?.title || "Unknown Book"}</h4>
                  <p><b>Author:</b> {book?.author || "N/A"}</p>
                  <p><b>Genre:</b> {book?.genre || "N/A"}</p>
                  <p><b>Price:</b> ₹{book?.price || "N/A"}</p>
                  <p>
                    <b>User:</b>{" "}
                    {req.userName ||
                      loggedUser?.username ||
                      "Unknown"}
                  </p>
                  <p>
                    <b>Date:</b>{" "}
                    {dateObj.toLocaleDateString()}
                  </p>

                  <p>
                    <b>Status:</b>
                    <span className={`status ${req.status}`}>
                      {req.status}
                    </span>
                  </p>
                </div>
              </div>

              <div className="request-actions">

                {req.status === "pending" && (
                  <>
                    <button
                      className="approve-btn"
                      onClick={() =>
                        updateStatus(req.id, "approved")
                      }
                    >
                      ✔ Approve
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        updateStatus(req.id, "rejected")
                      }
                    >
                      ✖ Reject
                    </button>
                  </>
                )}

                <button
                  className="delete-btn"
                  onClick={() => deleteRequest(req.id)}
                >
                  🗑 Delete Request
                </button>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
