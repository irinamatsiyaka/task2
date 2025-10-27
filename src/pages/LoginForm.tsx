import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import type { User } from "../types/user";

type LoginFormProps = {
   setUser: React.Dispatch<React.SetStateAction<User | null>>;
};
function LoginForm({ setUser }: LoginFormProps): React.JSX.Element {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   const { enqueueSnackbar } = useSnackbar();

   const handleLogin = (): void => {
      const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");

      const storedUser = users.find(
         (u: { username: string; password: string }) =>
            u.username === username && u.password === password
      );

      if (!storedUser) {
         enqueueSnackbar("Invalid username or password", { variant: "error" });
         return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(storedUser));
      setUser(storedUser);

      enqueueSnackbar("Login successful!", { variant: "success" });

      setTimeout(() => {
         navigate("/");
      }, 1500);
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
               Login
            </Typography>

            <TextField
               label="Username"
               variant="outlined"
               fullWidth
               value={username}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
               }
               sx={{ mb: 2 }}
            />
            <TextField
               label="Password"
               type="password"
               variant="outlined"
               fullWidth
               value={password}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
               }
               sx={{ mb: 3 }}
            />

            <Button
               variant="contained"
               color="primary"
               fullWidth
               onClick={handleLogin}
            >
               Login
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
               Don’t have an account?{" "}
               <Link
                  component="button"
                  variant="body2"
                  sx={{ color: "gray", textDecoration: "underline" }}
                  onClick={() => navigate("/register")}
               >
                  Register
               </Link>
            </Typography>
         </Paper>
      </Box>
   );
}

LoginForm.propTypes = {
   setUser: PropTypes.func.isRequired,
};

export default LoginForm;
