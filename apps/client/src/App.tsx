import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Welcome To Choi Space</h1>

      <div className="text-2xl text-red-600 font-bold">
        Tailwind 적용 테스트
      </div>

      <main>
        <article onClick={() => navigate("/experiences")}>Experiences</article>
        <article onClick={() => navigate("/projects")}>Projects</article>
        <article onClick={() => navigate("/studies")}>Study Logs</article>
      </main>
    </>
  );
};

export default App;
