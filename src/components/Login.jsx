import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";

export default function Login() {
  let [login2, setLogin] = useState(true);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let his = useHistory();

  async function login() {
    if (email && password) {
      if(ValidateEmail(email))
      {
        const url = `https://utilitysite-010d.restdb.io/rest/userdb?q={"email":"${email}"}`;
        const headers = {
          "cache-control": "no-cache",
          "x-apikey": "610ff55d69fac573b50a534b",
        };
  
        await axios
          .get(url, { headers })
          .then((res) => {
            if (res.data.length === 0) {
              alert("User Not Found!, Please Sign Up");
            } else {
              if (password === res.data[0].password) {
                localStorage.setItem("user", JSON.stringify(res.data[0]));
                // alert("Login Success!");
                his.push("/notes");
              } else {
                alert("Incorrect Password!");
              }
            }
          })
          .catch((err) => console.log(err));
      }
    } else {
      alert("Email & Password cannot be Empty!");
      his.push("/");
    }
  }

  function ValidateEmail(mail) {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        mail
      )
    ) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  }

  async function signup() {
    if (name && email && password) {
      
        if(ValidateEmail(email))
        {
            // main user
      const url = "https://utilitysite-010d.restdb.io/rest/userdb";
      const headers = {
        "cache-control": "no-cache",
        "x-apikey": "610ff55d69fac573b50a534b",
        "content-type": "application/json",
      };
      const body = {
        name: name,
        email: email,
        password: password,
      };

      await axios
        .post(url, body, { headers })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          alert("User Successfully Registered!");
          his.push("/notes");
        })
        .catch((err) => {
          alert('User with same email address already exist!, please login or try with different email.');
        });
      mkNote();
      mkUrl();
      mkTodo();
        }
      
    } else {
      alert("Input Fields cannot be Empty, All Fields are Required!");
      his.push("/notes");
    }
  }
  async function mkNote() {
    const url = "https://utilitysite-010d.restdb.io/rest/notes";
    const headers = {
      "cache-control": "no-cache",
      "x-apikey": "610ff55d69fac573b50a534b",
      "content-type": "application/json",
    };
    const body = { email: email, noteList: "[]" };

    axios
      .post(url, body, { headers })
      .then((res) => console.log("notes ok"))
      .catch((err) => console.log(err));
  }
  async function mkUrl() {
    const url = "https://utilitysite-010d.restdb.io/rest/urls";
    const headers = {
      "cache-control": "no-cache",
      "x-apikey": "610ff55d69fac573b50a534b",
      "content-type": "application/json",
    };
    const body = { email: email, urlList: "[]" };

    axios
      .post(url, body, { headers })
      .then((res) => console.log("urls ok"))
      .catch((err) => console.log(err));
  }
  async function mkTodo() {
    const url = "https://utilitysite-010d.restdb.io/rest/to-do";
    const headers = {
      "cache-control": "no-cache",
      "x-apikey": "610ff55d69fac573b50a534b",
      "content-type": "application/json",
    };
    const body = { email: email, todoList: "[]" };

    axios
      .post(url, body, { headers })
      .then((res) => console.log("todo ok"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-screen h-full flex flex-col justify-center items-center">
      {login2 && (
        <>
          {/* Email */}
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{maxWidth:'95vw'}}
              class="input input-primary input-bordered w-96  lg:w-96 md:w-90 sm:w-80"
            />
          </div>

          {/* Password */}

          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{maxWidth:'95vw'}}
              class="input input-primary input-bordered w-96 lg:w-96 md:w-90 sm:w-80"
            />
          </div>

          {/* Button */}
          <button
            class="btn btn-primary btn-active w-96 lg:w-96 md:w-90 sm:w-80 mt-4"
            role="button"
            onClick={login}
            style={{maxWidth:'95vw'}}
            aria-pressed="true"
          >
            Login
          </button>
          <button
            onClick={() => setLogin(false)}
            style={{ pointerEvents: "all" }}
          >
            New User? Create a new account
          </button>
        </>
      )}

      {/* Signup Section */}

      {!login2 && (
        <>
          {" "}
          <div class="form-control">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              type="text"
              style={{maxWidth:'95vw'}}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              class="input input-primary input-bordered w-96 lg:w-96 md:w-90 sm:w-80"
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{maxWidth:'95vw'}}
              class="input input-primary input-bordered w-96 lg:w-96 md:w-90 sm:w-80"
            />
          </div>
          {/* Password */}
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{maxWidth:'95vw'}}
              class="input input-primary input-bordered w-96 lg:w-96 md:w-90 sm:w-80"
            />
          </div>
          {/* Button */}
          <button
            class="btn btn-primary btn-active w-96 lg:w-96 md:w-90 sm:w-80 mt-4"
            role="button"
            onClick={signup}
            style={{maxWidth:'95vw'}}
            aria-pressed="true"
          >
            Signup
          </button>
          <button
            onClick={() => setLogin(true)}
            style={{ pointerEvents: "all" }}
          >
            Already Have an account? Login
          </button>
        </>
      )}
    </div>
  );
}
