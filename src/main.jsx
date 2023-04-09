import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Layout from "./Layout";
import Gallery from "./components/Gallery";
import CreateMember from "./components/CreateMember";
import DetailGallery from "./components/DetailGallery";
import EditMember from "./components/EditMember";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />}></Route>
          <Route path="/create" element={<CreateMember />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/gallery/:id" element={<DetailGallery />}></Route>
          <Route path="/gallery/edit/:id" element={<EditMember />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
