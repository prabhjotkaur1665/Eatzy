// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { BrowserRouter } from "react-router-dom";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );




import React from "react";
import ReactDOM from "react-dom/client";
import { StoreContextProvider } from "./context/StoreContext";
import App from "./App";
import "./index.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </React.StrictMode>
);






// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { StoreContextProvider } from "./context/StoreContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <StoreContextProvider>
//     <App />
//   </StoreContextProvider>
// );