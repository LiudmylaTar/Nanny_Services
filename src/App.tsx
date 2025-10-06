import { Route, Routes } from "react-router-dom";
import "./App.css";

import MainPage from "./pages/MainPage/MainPage";
import MainLayout from "./components/MainLayout/MainLayout";
import NotFoumdPage from "./pages/NotFoumdPage/NotFoumdPage";
import NanniesPage from "./pages/NanniesPage/NanniesPage";
import { ToastContainer } from "react-toastify";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout fullWidth={true} />}>
          <Route path="/" element={<MainPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/nannies" element={<NanniesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoumdPage />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
