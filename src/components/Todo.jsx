import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ClockLoader from "react-spinners/ClockLoader";
import TodoCard from "./TodoCard";
import { useHistory, useLocation } from "react-router";
import axios from "axios";

function getUser() {
  let user = localStorage.getItem("user");
  return JSON.parse(user);
}

function isLoggedin() {
  let isLogin = localStorage.getItem("user");
  if (isLogin) {
    return true;
  }
  return false;
}

export default function Todo() {
  let [importance, setImportance] = useState("low");
  let [inputTask, setInputTask] = useState("");
  let [loading, setLoading] = useState(true);
  let [userId, setUserId] = useState("");
  let [tasks, setTasks] = useState([]);
  let [test, setTest] = useState(true);
  let [isLogin, setIsLogin] = useState(isLoggedin());

  let user = getUser();
  const loc = useLocation();
  const his = useHistory();

  useEffect(() => {
    if (loc.pathname === "/todo") {
      if (!isLogin) {
        alert("Please Login or Signup To Use These Features");
        his.push("/login");
      }
    }
  }, []);

  useEffect(() => {
    if (test) {
      console.log("Prevented UseEffect From Running Unneccessorily!");
    } else {
      console.log("useEffect Fired");
      updateTodos();
    }
  }, [tasks]);

  async function updateTodos() {
    let pr = JSON.stringify(tasks);
    console.log(userId);
    const url = `https://utilitysite-010d.restdb.io/rest/to-do/${userId}`;
    const headers = {
      "cache-control": "no-cache",
      "x-apikey": "610ff55d69fac573b50a534b",
      "content-type": "application/json",
    };
    const body = {
      email: user.email,
      todoList: pr,
    };
    await axios
      .put(url, body, { headers })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    console.log(pr);
  }

  useEffect(() => {
    async function fetchData() {
      var options = {
        method: "GET",
        url: `https://utilitysite-010d.restdb.io/rest/to-do?q={"email":"${user.email}"}`,
        headers: {
          "cache-control": "no-cache",
          "x-apikey": "610ff55d69fac573b50a534b",
        },
      };

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data[0]._id);
          setUserId(res.data[0]._id);
          setTasks(JSON.parse(res.data[0].todoList));
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    isLogin && fetchData();
  }, []);

  function getDate() {
    let mon = new Date().getMonth() + 1;
    let date = `${new Date()
      .getDate()
      .toString()}-${mon.toString()}-${new Date()
      .getFullYear()
      .toString()} ${new Date().getHours().toString()}:${new Date()
      .getMinutes()
      .toString()}`;

    console.log(date);
    return date;
  }

  function addTask() {
    if (inputTask) {
      setTest(false);
      let newTask = {
        todo: inputTask,
        importance: importance,
        date: getDate(),
      };

      setTasks([...tasks, newTask]);
      setInputTask("");
    } else {
      alert("Input Can't be Empty");
    }
  }

  function deleteTodo(id) {
    setTest(false);
    let updatedTodo = tasks.filter((e, i) => {
      return i !== id;
    });

    setTasks(updatedTodo);
  }

  return (
    <div className="w-screen h-full flex flex-col  items-center">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Create New Task</span>
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Add Task"
            value={inputTask}
            id="thell"
            style={{maxWidth:'95vw'}}
            onChange={(e) => setInputTask(e.target.value)}
            className="w-96 lg:w-96 md:w-90 sm:w-80 pr-16 input input-primary input-bordered"
          />
          <button
            onClick={addTask}
            className="absolute top-0 right-0 rounded-l-none btn btn-primary"
          >
            <FaPlus size="20" />
          </button>
        </div>
      </div>

      <div
        className="p-2  bordered flex w-full justify-center items-center"
        value={importance}
        onChange={(e) => setImportance(e.target.value)}
      >
        <span>Importance: </span>
        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">Low</span>
            <input
              type="radio"
              name="opt"
              checked={importance === "low"}
              className="radio radio-primary"
              value="low"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">Medium</span>
            <input
              type="radio"
              name="opt"
              checked={importance === "normal"}
              className="radio radio-secondary"
              value="normal"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text">High</span>
            <input
              type="radio"
              name="opt"
              checked={importance === "high"}
              className="radio radio-accent"
              value="high"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col w-screen  justify-start items-center">
        {tasks.map((element, index) => {
          let { todo, importance, date } = element;
          if (importance === "high") {
            return (
              <TodoCard
                todo={todo}
                deleteTodo={deleteTodo}
                importance={importance}
                date={date}
                num={index}
                key={index}
              />
            );
          }
        })}
        {tasks.map((element, index) => {
          let { todo, importance, date } = element;
          if (importance === "normal") {
            return (
              <TodoCard
                todo={todo}
                deleteTodo={deleteTodo}
                importance={importance}
                date={date}
                num={index}
                key={index}
              />
            );
          }
        })}
        {loading ? (
          <div className="absolute w-screen h-1/2 text-primary-content flex justify-center items-center">
            <ClockLoader />
          </div>
        ) : (
          tasks.map((element, index) => {
            let { todo, importance, date } = element;
            if (importance === "low") {
              return (
                <TodoCard
                  todo={todo}
                  deleteTodo={deleteTodo}
                  importance={importance}
                  date={date}
                  num={index}
                  key={index}
                />
              );
            }
          })
        )}
      </div>
    </div>
  );
}
