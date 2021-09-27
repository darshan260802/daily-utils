import { Link, useHistory, useLocation } from "react-router-dom";

function isLoggedin() {
  let isLogin = localStorage.getItem("user");
  if (isLogin) {
    return true;
  }
  return false;
}

function getName() {
  let n = localStorage.getItem("user");
  if (n) {
    let ne = JSON.parse(n);
    return ne.name;
  }
  return "";
}

export default function NavigationBar() {
  let location = useLocation();
  let history = useHistory();

  let isLogin = isLoggedin();
  let name = getName();

  return (
    <div style={{zIndex:'999',position:'sticky',top:'0px'}} className="navbar mb-2 shadow-lg bg-neutral text-neutral-content sticky top-0 z-50">
      <div className="hidden" id="mml"></div>
      <div className="hidden md:flex lg:flex px-2 mx-2 navbar-start">
        <span className="text-lg font-bold">DailyUtils</span>
      </div>
      <div className="hidden md:flex lg:flex px-2 mx-2 navbar-center ">
        <div className="flex items-center">
          <Link
            to="/notes"
            className="hidden md:block lg:block btn btn-ghost btn-sm rounded-btn"
          >
            Notes
          </Link>
          <Link
            to="/todo"
            className="hidden md:block lg:block btn btn-ghost btn-sm rounded-btn"
          >
            To-Do
          </Link>
          <Link
            to="/urlshortener"
            className="hidden md:block lg:block btn btn-ghost btn-sm rounded-btn"
          >
            URL Shortner
          </Link>

          <select
            data-choose-theme
            onChange={(e) =>
              document
                .getElementsByTagName("html")[0]
                .setAttribute("data-theme", `${e.target.value}`)
            }
            className="select outline-none focus:outline-none bg-primary text-primary-content w-auto h-2"
          >
            <option value="light">Default</option>
            <option value="dark">Dark</option>
            <option value="cupcake">Cupcake</option>
            <option value="bumblebee">Bumblebee</option>
            <option value="synthwave">Synthwave</option>
            <option value="valentine">Valentine</option>
            <option value="halloween">Halloween</option>
            <option value="garden">Garden</option>
            <option value="forest">Forest</option>
            <option value="fantasy">Fantasy</option>
            <option value="black">Black</option>
            <option value="dracula">Dracula</option>
          </select>
        </div>
      </div>
      <div className="navbar-end">
        {isLogin ? (
          <div className="hidden md:flex lg:flex flex-col items-end">
            <span className="block">{name}</span>
            <button
              className="text-sm"
              onClick={() => {
                localStorage.removeItem("user");
                alert("Logout Success!");
                history.push("/login");
              }}
            >
              [Logout]
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="hidden md:block lg:block btn btn-ghost btn-sm rounded-btn"
          >
            Login
          </Link>
        )}
      </div>

      <div
        id="colmenu"
        className="w-screen block md:hidden lg:hidden  z-50"
        style={{zIndex:'999',position:'sticky',top:'0px'}}
      >
        <div class="dropdown w-screen dropdown-end">
          <div
            tabindex="0"
            class="m-1 w-full flex justify-between items-center"
          >
            <span className="text-lg font-bold">DailyUtils</span>
            <button className="btn btn-square btn-primary mr-5 z-30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
          <ul
            tabindex="0"
            class=" mr-3 shadow menu dropdown-content bg-primary text-primary-content rounded-box w-52"
            style={{zIndex:'1200'}}
          >
            <li>
              <Link
                to="/notes"
                className="hidden md:block lg:block btn btn-ghost btn-sm rounded-btn"
                style={{ padding: "0px" }}
              >
                Notes
              </Link>
            </li>
            <li>
              <Link
                to="/todo"
                onClick={() => document.getElementById('colmenu').blur()}
                className="hidden md:block lg:block  btn btn-ghost btn-sm rounded-btn"
                style={{ padding: "0px" }}
              >
                To-Do
              </Link>
            </li>
            <li>
              <Link
                to="/urlshortener"
                className="hidden md:block lg:block btn btn-ghost btn-sm rounded-btn"
                style={{ padding: "0px" }}
              >
                URL Shortner
              </Link>
            </li>
            <li>
              {isLogin ? (
                <div className="flex flex-col items-center">
                  <span className="">{name}</span>
                  <button
                    className="text-sm"
                    onClick={() => {
                      localStorage.removeItem("user");
                      alert("Logout Success!");
                      history.push("/login");
                    }}
                  >
                    [Logout]
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  style={{ padding: "0px" }}
                  className="hidden md:block lg:block btn btn-ghost btn-sm rounded-btn"
                >
                  Login
                </Link>
              )}
            </li>

            <li>
              <select
                data-choose-theme
                onChange={(e) =>
                  document
                    .getElementsByTagName("html")[0]
                    .setAttribute("data-theme", `${e.target.value}`)
                }
                className="select active outline-none focus:outline-none bg-primary text-primary-content w-auto h-2"
              >
                <option value="light">Default</option>
                <option value="dark">Dark</option>
                <option value="cupcake">Cupcake</option>
                <option value="bumblebee">Bumblebee</option>
                <option value="synthwave">Synthwave</option>
                <option value="fantasy">Fantasy</option>
                <option value="valentine">Valentine</option>
                <option value="halloween">Halloween</option>
                <option value="garden">Garden</option>
                <option value="forest">Forest</option>
                <option value="black">Black</option>
                <option value="dracula">Dracula</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
