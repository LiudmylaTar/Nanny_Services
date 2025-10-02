import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/nannies" element={<div>Nannies List</div>} />
        <Route path="/favorites" element={<div>Favorites List</div>} />
        <Route path="*" element={<div>NotFoundPage</div>} />
      </Routes>
    </>
  );
}

export default App;
