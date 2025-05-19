import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcom To Choi Space</h1>

      <article onClick={() => navigate("/experiences")}>Experiences</article>
      <article onClick={() => navigate("/projects")}>Projects</article>
      <article onClick={() => navigate("/studies")}>Study Logs</article>
    </>
  );
};

export default App;
