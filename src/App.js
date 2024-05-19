import "./App.css";
import React from "react";
import axios from "axios";
import Form from "./components/Form";
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Card from "./components/Card";
import Spinner from "./components/Spinner";

function App() {
  const [contactData, setContactData] = useState({});

  const handleonsubmitt = async (e, formData) => {
    try {
      const response = await axios.post(
        "http://localhost:9000/contact",
        formData
      );

      setContactData(formData);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  return (
    <React.Fragment>
      <Form handleSubmitt={handleonsubmitt} contactData={contactData} />
    </React.Fragment>
  );
}

export default App;
