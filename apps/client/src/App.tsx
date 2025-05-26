import { useNavigate } from "react-router-dom";
import Card from "./components/Card/Card.js";

const App = () => {
  const navigate = useNavigate();

  const goToExperiences = () => navigate("/experiences");
  const goToProjects = () => navigate("/projects");
  const goToStudies = () => navigate("/studies");

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage:
          'url("https://menu.mt.co.kr/animated/mt/2023/03/2023030907550793674_animated_0758441.gif")',
      }}
    >
      <header
        className="glitch text-3xl pb-20 text-white"
        data-text="Welcome To Choi Space"
      >
        Welcome To Choi Space
      </header>

      <main className="flex gap-10">
        <Card
          onClick={goToExperiences}
          imageUrl="https://i.pinimg.com/736x/58/cf/3d/58cf3ddf2a95a0a4e88ffc1c5ec1c530.jpg"
        />
        <Card
          onClick={goToProjects}
          imageUrl="https://i.pinimg.com/736x/73/df/c1/73dfc104387f112c59a6b7efabbc738d.jpg"
        />
        <Card
          onClick={goToStudies}
          imageUrl="https://i.pinimg.com/736x/5f/6e/f0/5f6ef0bb33d7925328e49e6e32064dd0.jpg"
        />
      </main>
    </div>
  );
};

export default App;
