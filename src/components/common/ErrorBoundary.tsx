import React from "react";
import { Box, Typography, Button } from "@mui/material";

type ErrorBoundaryState = { hasError: boolean };

export default class ErrorBoundary extends React.Component<
   { children: React.ReactNode },
   ErrorBoundaryState
> {
   constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false };
   }

   static getDerivedStateFromError(): ErrorBoundaryState {
      return { hasError: true };
   }

   componentDidCatch(error: unknown, info: unknown): void {
      console.error("Error caught in boundary:", error, info);
   }

   render(): React.ReactNode {
      if (this.state.hasError) {
         return (
            <Box textAlign="center" mt={5}>
               <Typography variant="h5" color="error">
                  Oops! Something went wrong.
               </Typography>
               <Button
                  onClick={() => window.location.reload()}
                  variant="contained"
                  sx={{ mt: 2 }}
               >
                  Reload page
               </Button>
            </Box>
         );
      }

      return this.props.children;
   }
}
