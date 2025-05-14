import { useState } from "react";
import type { User } from "./types/user.ts";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://randomuser.me/api/?results=20");
      const data = await res.json();
      setUsers(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>데이터 가져오기</div>
      <button onClick={fetchUsers}>패칭</button>

      <ul>
        {users.map((user) => (
          <li key={user.login.uuid}>
            {user.name.first} {user.name.last} --- {user.email}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
