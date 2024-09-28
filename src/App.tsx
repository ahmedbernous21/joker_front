import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Design from "./pages/design/Design";
import NotFound from "./pages/notFound/NotFound";
import Header from "./components/header/Header";
import Admin from "./pages/Admin/admin";
import Login from "./pages/LoginAdmin/LoginAdmin";
import Home from "./pages/home/Home";
// import "./registerServiceWorker";
import Dashboard from "./pages/Dashboard/dashboard";
import Articles from "./pages/Articles/Articles";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Design />} path="/design/:article" />
        <Route element={<Articles />} path="/design/" />
        <Route element={<Login />} path="/kedache/" />
        <Route element={<Dashboard />} path="/dashboard/overview/" />
        <Route element={<Admin />} path="/dashboard/articles/" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
