import React, { Component, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "../src/components/Login";
import Modal from "./helpers/Modal";
import Home from "../src/components/Home";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [logedUser, setLoggedUser] = useState([]);
  const [modalData, setModalData] = useState({
    title: "Login",
    message:
      "You have entered Username and Password are incorrect. Please Try Again!",
  });
  return (
    <div className="App">
      {!isLogged && (
        <Login
          setIsOpen={setIsOpen}
          setIsLogged={setIsLogged}
          setLoggedUser={setLoggedUser}
        />
      )}
      {isOpen && <Modal setIsOpen={setIsOpen} modalData={modalData} />}
      {isLogged && !isOpen && (
        <Home
          setIsLogged={setIsLogged}
          logedUser={logedUser}
          setLoggedUser={setLoggedUser}
          setIsOpen={setIsOpen}
          setModalData={setModalData}
        />
      )}
    </div>
  );
}

export default App;
