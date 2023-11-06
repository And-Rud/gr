import { useEffect, useState } from "react";
import "./App.css";
import { useMutation, useQuery } from "@apollo/client";
import { GET_All_USERS, GET_ONE_USER } from "./query/user";
import { CREATE_USER } from "./mutation/user";

//poolinterval аналог longpooling відправляє запити кожні 500мсuseQuery(GET_All_USERS, {pollInterval: 500,});

function App() {
  const { data, loading, refetch } = useQuery(GET_All_USERS);
  const { data: oneUser, loading: loadingOneUser } = useQuery(GET_ONE_USER, {
    variables: {
      id: 1,
    },
  });

  //useMutation визиває кортеж, не обєкт як в useQuery, перший елемент це функція яка визиває мутацію
  const [newUser] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");

  console.log(oneUser);

  useEffect(() => {
    if (!loading) {
      setUsers(data.getAllUsers);
    }
  }, [data, loading]);

  const addUser = (e) => {
    e.preventDefault();
    newUser({
      variables: {
        input: {
          username,
          age,
        },
      },
    }).then(({ data }) => {
      console.log(data);
      setUsername("");
      setAge("");
    });
  };

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  };

  if (loading) {
    return <h1>Loading .....</h1>;
  }

  return (
    <div className="App">
      <form>
        <label for="username">Username:</label>
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <label for="age">Age:</label>
        <input
          name="age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          type="number"
        />
        <div className="btns">
          <button onClick={(e) => addUser(e)}>Створити</button>
          <button onClick={(e) => getAll(e)}>Отримати</button>
        </div>
      </form>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            {user.id}. {user.username} {user.age}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
