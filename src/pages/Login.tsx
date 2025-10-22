import React from "react";
import { SnackbarProvider } from "notistack";
import LoginForm from "./LoginForm";

import type { User } from "../types/user";

type LoginProps = {
   setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function Login({ setUser }: LoginProps): React.JSX.Element {
   return (
      <SnackbarProvider
         maxSnack={3}
         anchorOrigin={{ vertical: "top", horizontal: "center" }}
         autoHideDuration={2000}
      >
         <LoginForm setUser={setUser} />
      </SnackbarProvider>
   );
}
