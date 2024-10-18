import React, { useEffect, useState } from "react";

import Navbar from "../Navbar/Navbar";
import { books } from "../../utils/dummy";
import { useNavigate } from "react-router-dom";
import './Books.css';

function Books() {
  const navigate = useNavigate();
  const cookie = localStorage.getItem("cookie");

  const editBook = (index) => {
    console.log("i'm editing book", index);
  };

  const deleteBook = (index) => {
    console.log("i'm deleting book", index);
  };

  useEffect(() => {
    if (!cookie) {
      return navigate("/login");
    }
  }, [cookie]);

  return (
    <div className="home-layout">
      <Navbar /> 
      <div className="book-grid-container">
        {books.map((bookItem, index) => {
          return (
            <div key={index} className="book-card">
              <img
                src={bookItem.image}
                alt={bookItem.title}
                className="book-image"
              />
              <div className="book-info">
                <h3>{bookItem.title}</h3>
                <p>{bookItem.description}</p>
                <p>
                  {" "}
                  Assign To: <strong> {bookItem.assignedTo} </strong>
                </p>
                <p>
                  Issued Date: <strong> {bookItem.issuedDate} </strong>
                </p>
              </div>
              <div className="book-actions">
                <button onClick={() => editBook(index)} className="edit-btn">
                  Edit Book
                </button>
                <button
                  onClick={() => deleteBook(index)}
                  className="delete-btn"
                >
                  Delete Book
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Books;
