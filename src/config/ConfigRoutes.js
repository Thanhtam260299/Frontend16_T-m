import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Detail from "../pages/Detail";

const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/:category/search/:keyword" element={<Catalog />} />
      <Route path="/:category/:id" element={<Detail />} />
      <Route path="/:category" element={<Catalog />} />
      <Route path="/home" exact element={<Home />} />
      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default ConfigRoutes;
