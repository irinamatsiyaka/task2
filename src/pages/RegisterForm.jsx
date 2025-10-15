import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function RegisterForm() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   const { enqueueSnackbar } = useSnackbar();

   const handleRegister = () => {
      if (username.trim() && password.trim()) {
         const user = { username, password };
         localStorage.setItem("registeredUser", JSON.stringify(user));
         enqueueSnackbar("Registration successful!", { variant: "success" });

         setTimeout(() => {
            navigate("/login");
         }, 1500);
      } else {
         enqueueSnackbar("Please fill in all fields!", { variant: "warning" });
      }
   };

   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
         }}
      >
         <Paper
            elevation={3}
            sx={{
               p: 4,
               borderRadius: 3,
               textAlign: "center",
               width: 350,
            }}
         >
            <Typography variant="h5" gutterBottom>
               Register
            </Typography>

            <TextField
               label="Username"
               variant="outlined"
               fullWidth
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               sx={{ mb: 2 }}
            />

            <TextField
               label="Password"
               type="password"
               variant="outlined"
               fullWidth
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               sx={{ mb: 3 }}
            />

            <Button
               variant="contained"
               color="primary"
               fullWidth
               onClick={handleRegister}
            >
               Register
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
               Already have an account?{" "}
               <Link
                  component="button"
                  variant="body2"
                  sx={{ color: "gray", textDecoration: "underline" }}
                  onClick={() => navigate("/login")}
               >
                  Login
               </Link>
            </Typography>
         </Paper>
      </Box>
   );
}

export default RegisterForm;
