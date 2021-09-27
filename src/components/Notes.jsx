import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";

function getNotes() {
  let notes = window.localStorage.getItem("notes");
  if (notes) {
    notes = JSON.parse(notes);
    return notes;
  }
  return [];
}

function getUser() {
  let user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return false;
}

function isLoggedin() {
  let isLogin = window.localStorage.getItem("user");
  if (isLogin) {
    return true;
  }
  return false;
}
// function getUser() {
//   let user = window.localStorage.getItem("user");
//   if (user) {
//     return JSON.parse(user);
//   }
//   return false;
// }

export default function Notes() {
  const [showNewNote, setShowNewNote] = useState(false);
  let [test, setTest] = useState(true);
  let isLogin = isLoggedin();

  let [userId, setUserId] = useState("");
  let [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [note, setDescription] = useState("");
  const [notes, setNotes] = useState(getNotes());
  const loc = useLocation();
  const his = useHistory();
  let user = getUser();
  // let user = getUser();
  // let user = {
  //   email:"test1@gmail.com"
  // }

  useEffect(() => {
    if (loc.pathname === "/notes") {
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
      updateNotes();
    }
  }, [notes]);

  async function updateNotes() {
    let pr = JSON.stringify(notes);
    console.log(userId);
    const url = `https://utilitysite-010d.restdb.io/rest/notes/${userId}`;
    const headers = {
      "cache-control": "no-cache",
      "x-apikey": "610ff55d69fac573b50a534b",
      "content-type": "application/json",
    };
    const body = {
      email: user.email,
      noteList: pr,
    };
    await axios
      .put(url, body, { headers })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  function makeNote() {
    setTest(false);
    if (!title || !note) {
      return alert("Fields cannot be empty!");
    }
    const note2 = { title, note };
    setNotes([...notes, note2]);
    setTitle("");
    setDescription("");
    setShowNewNote(!setShowNewNote);
  }

  useEffect(() => {
    async function fetchData() {
      var options = {
        method: "GET",
        url: `https://utilitysite-010d.restdb.io/rest/notes?q={"email":"${user.email}"}`,
        headers: {
          "cache-control": "no-cache",
          "x-apikey": "610ff55d69fac573b50a534b",
        },
      };
      // useEffect(get, []);

      await axios
        .request(options)
        .then((res) => {
          console.log(res.data[0]._id);
          setUserId(res.data[0]._id);
          setNotes(JSON.parse(res.data[0].noteList));
          console.log(notes);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Translate Function

  async function translate(text, to) {
    var options = {
      method: "GET",
      url: "https://google-translate20.p.rapidapi.com/translate",
      params: { text: `"${text}"`, tl: `${to}` },
      headers: {
        //   'x-rapidapi-key': '80cf7f649emsh2dbdc2572126428p1b5afbjsn2998d99ca75f',
        "x-rapidapi-key": "ffa5be15admsh0c5b278f24232d9p158213jsnded52e29e279",
        "x-rapidapi-host": "google-translate20.p.rapidapi.com",
      },
    };

    let res = await axios.request(options).catch((err) => console.log(err));
    console.log(res.data.data.translation);
    console.log(to);
    return res.data.data.translation;
  }

  function deleteNote(index) {
    setTest(false);
    let updatedArr = notes.filter((i, e) => {
      return e !== index;
    });

    setNotes(updatedArr);
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div>
        <div
          tabindex="0"
          style={{maxWidth:'98vw'}}
          className={`collapse w-96 border rounded-box border-base-300 ${
            showNewNote ? "collapse-open" : "collapse-close"
          } `}
        >
          <div className="collapse-title flex w-full justify-evenly text-xl font-medium">
            <button onClick={() => setShowNewNote(!showNewNote)}>
              New Note
            </button>
          </div>
          <div className="collapse-content">
            <div className="card flex-shrink-0 pointer-events-auto  w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Description"
                    className="input input-bordered"
                    value={note}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </div>
                <div className="form-control mt-6">
                  <input
                    type="button"
                    value="Create Note"
                    className="btn btn-primary"
                    onClick={makeNote}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full overflow-x-hidden overscroll-y-auto flex flex-wrap justify-evenly">
        {loading ? (
          <div className="absolute w-screen h-1/2 text-primary-content flex justify-center items-center">
            <ClockLoader />
          </div>
        ) : (
          notes.map((item, index) => {
            return (
              <NoteCard
                title={item.title}
                note={item.note}
                num={index}
                deleteNote={deleteNote}
                key={index}
                id={`note${index}`}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
