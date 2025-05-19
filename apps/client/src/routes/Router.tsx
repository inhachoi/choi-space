import { Routes, Route } from "react-router-dom";
import App from "../App";
import Experiences from "../pages/Experiences";
import Projects from "../pages/Projects";
import VirtualScroll from "../pages/study/VirtualScroll";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/experiences" element={<Experiences />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/studies" element={<VirtualScroll />} />
    </Routes>
  );
};

export default Router;
