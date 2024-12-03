import React from "react";
import ReactDOM from "react-dom/client";
import UploadScan from "./components/UploadScan.js";

const AppLayout = () => {
  return (
    <div className="app">
      <UploadScan />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
