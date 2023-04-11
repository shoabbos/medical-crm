import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./components/App/App.component";
import "./index.css";
import { RecoilRoot } from "recoil"
import SignIn from "./components/Auth/SignIn.component";
import './i18n'
import LoadingLayout from "./components/Layouts/LoadingLayout";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingLayout />}>
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="*" element={<App />} />
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
);
