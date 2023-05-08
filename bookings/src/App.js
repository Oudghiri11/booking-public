import Admin from "./components/Admin/Admin";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />

      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/Admin" element={<Admin />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
