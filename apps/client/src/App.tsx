import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center space-y-12">
        <h1>Welcome To Choi Space</h1>

        <div className=" text-red-600">TEST</div>

        <div className="flex justify-center gap-8">
          <article
            className="w-40 h-40 bg-white border border-gray-300 rounded-xl shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
            onClick={() => navigate("/experiences")}
          >
            Experiences
          </article>

          <article
            className="w-100 h-100 bg-white border border-gray-300 rounded-xl shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
            onClick={() => navigate("/projects")}
          >
            Projects
          </article>

          <article
            className="w-40 h-40 bg-white border border-gray-300 rounded-xl shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition"
            onClick={() => navigate("/studies")}
          >
            Study Logs
          </article>
        </div>
      </div>
    </div>
  );
};

export default App;
