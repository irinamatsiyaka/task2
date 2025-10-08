import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Todos from "./pages/Todos";
import TodosDetails from "./pages/TodosDetails";

function App() {
   return (
      <BrowserRouter>
         <nav>
            <Link to="/">Todos></Link> | <Link to="/login">Login</Link>
         </nav>

         <Routes>
            <Route path="/" element={<Todos />} />
            <Route path="login" element={<Login />} />
            <Route path="/todo/:id" element={<TodosDetails />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
