import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import "./App.css";

import MainLayout from "./components/MainLayout/MainLayout";
import { ToastContainer } from "react-toastify";
import useCurrentUser from "./hooks/useCurrentUser";
import PrivateRoute from "./PrivateRoute";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const NanniesPage = lazy(() => import("./pages/NanniesPage/NanniesPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage/FavoritesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoumdPage/NotFoumdPage"));

function App() {
  const { data: user } = useCurrentUser();
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route element={<MainLayout fullWidth={true} />}>
            <Route path="/" element={<MainPage />} />
          </Route>
          <Route element={<MainLayout />}>
            <Route path="/nannies" element={<NanniesPage />} />
            <Route
              path="/favorites"
              element={
                <PrivateRoute isAuth={!!user}>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
