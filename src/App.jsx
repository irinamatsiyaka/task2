import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function App() {
   return (
      <BrowserRouter>
         <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
               <Typography
                  variant="h6"
                  component={Link}
                  to="/"
                  sx={{ color: "white", textDecoration: "none" }}
               >
                  Products
               </Typography>

               <Box>
                  <Button color="inherit" component={Link} to="/">
                     Catalog
                  </Button>
                  <Button color="inherit" component={Link} to="/login">
                     Login
                  </Button>
               </Box>
            </Toolbar>
         </AppBar>

         <Box>
            <Routes>
               <Route path="/" element={<Products />} />
               <Route path="login" element={<Login />} />
               <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
         </Box>
      </BrowserRouter>
   );
}

export default App;
