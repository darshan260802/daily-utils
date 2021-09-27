import axios from "axios";
import themes from "daisyui/colors/themes";
import { html } from "daisyui/dist/base";
import { useState, useEffect } from "react";
import Overlay from "react-overlay-component";
import {IoTrash} from 'react-icons/io5'
import { useSnackbar } from "react-simple-snackbar";

export default function NoteCard(props) {
  let [slang, setSlang] = useState([]);
  let [x, setX] = useState(false);
  let [openSnakbar, closeSnakbar] = useSnackbar();

  const { title, note, num, deleteNote } = props;

  let options = {
    style: {
      zIndex: "1000",
    },
  };

  async function get() {
    var options = {
      method: "GET",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
      params: { target: "en" },
      headers: {
        "accept-encoding": "application/gzip",
        "x-rapidapi-key": "a613c7092cmsha08bfcd836aba94p1d4376jsn630c736bfc2b",
        "x-rapidapi-host": "google-translate1.p.rapidapi.com",
      },
    };

    let res = await axios.request(options).catch((err) => console.log(err));
    setSlang(res.data.data.languages);
  }
  useEffect(() => get(), []);

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


  function clsOver() {
    setX(false);
  }

  function showPop(hello) {
    alert("Working");
  }

  return (
    <div className=" card shadow-xl  w-64 h-80 overflow-y-auto m-3 image-full">
      <Overlay configs={{ animate: true }} isOpen={x} closeOverlay={clsOver}>
        <div className="card lg:card-side bordered bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title" id={`ool${num}`}>
              {title}
            </h2>
            <p id={`oop${num}`}>{note}</p>
            <div className="card-actions">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  navigator.clipboard.writeText(
                    document.getElementById(`oop${num}`).innerHTML
                  );

                }}
              >
                Copy Description
              </button>
              <button
                className="btn btn-ghost"
                onClick={() =>
                  navigator.clipboard.writeText(
                    document
                      .getElementById(`ool${num}`)
                      .innerHTML.concat(
                        `\n${document.getElementById(`oop${num}`).innerHTML}`
                      )
                  )
                }
              >
                copy note
              </button>
              <select 
              className="select select-bordered select-primary bg-primary text-primary-content w-full max-w-xs"
              id={`select${num}`}
                  defaultValue="en"
                  onChange={async () => {
                    let to = document.getElementById(`select${num}`);
                    let text = document
                    .getElementById(`ool${num}`)
                    .innerHTML.concat(
                      `\n${document.getElementById(`oop${num}`).innerHTML}`
                    );

                    document.getElementById(`oop${num}`).innerHTML = "";
                    document.getElementById(`ool${num}`).innerHTML = "Translating...";

 
                    let postTrans = await translate(text, to.value);
                    document
                    .getElementById(`ool${num}`)
                    .innerHTML = postTrans.slice(1 , postTrans.indexOf('\n'))

                    document
                    .getElementById(`oop${num}`)
                    .innerHTML = postTrans.slice(postTrans.indexOf('\n')+1, postTrans.charAt(postTrans.length-1) ==='"'? postTrans.length -1 : postTrans.length)
                  }}
              >
                {slang.map((i, ind) => {
                  return <option key={ind} value={i.language} selected={i.language === 'en'} >{i.name}</option>
                })}
              </select>
            </div>
          </div>
        </div>
      </Overlay>

      <figure>
        <img src="https://picsum.photos/id/1005/400/250" />
      </figure>
      <div className="justify-end card-body overflow-hidden ">
        <h2 className="card-title">{title}</h2>
        <p className="overflow-y-hidden">{note}</p>
        <div className="card-actions flex">
          <button className="btn btn-primary" onClick={() => setX(true)}>
            View note
          </button>
          <button class="btn btn-error" onClick={() => deleteNote(num)}><IoTrash/></button>
          
        </div>
      </div>
    </div>
  );
}
