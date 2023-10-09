import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Content from "./Content";
import PrivateRoute from "./PrivateRoute";
import Favorites from "./Favorites";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login-signup" element={<Login/>} ></Route>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Content />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/favorites" element={<Favorites/>} ></Route>
    </Routes>
  );
};

export default AllRoutes;
