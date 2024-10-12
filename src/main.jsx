import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />

  // <div className="scrollbar-custom overflow-y-scroll  p-4 bg-gray-100">
  // </div>
);
