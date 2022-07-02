import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import Routers from "./routers";
import "./styles/main.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Routers />
    </RecoilRoot>
  </React.StrictMode>
);
