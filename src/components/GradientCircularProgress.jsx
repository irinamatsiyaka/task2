import React from "react";
import { CircularProgress } from "@mui/material";

export default function GradientCircularProgress() {
   return (
      <>
         <svg width={0} height={0}>
            <defs>
               <linearGradient
                  id="blue_pink_gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
               >
                  <stop offset="0%" stopColor="#e01cd5" />
                  <stop offset="100%" stopColor="#1CB5E0" />
               </linearGradient>
            </defs>
         </svg>
         <CircularProgress
            size={60}
            thickness={4.5}
            sx={{
               "svg circle": { stroke: "url(#blue_pink_gradient)" },
            }}
         />
      </>
   );
}
