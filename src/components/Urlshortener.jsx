import { useState, useEffect } from "react";
import UrlCard from "./UrlCard";
import ClockLoader from "react-spinners/ClockLoader";
import axios from "axios";
import { useLocation, useHistory } from "react-router";

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

export default function Urlshortener() {
  let [longUrl, setLongUrl] = useState("");
  let [usrUrlId, setUsrUrlId] = useState("");
  let [loading, setLoading] = useState(true);
  let [shortUrl, setShortUrl] = useState("");
  let [urlList, setUrlList] = useState([]);
  let curUser = getUser();
  const loc = useLocation();
  const his = useHistory();
  let [isLogin, setIsLogin] = useState(isLoggedin());

  let [test, setTest] = useState(true);

  useEffect(() => {
    if (loc.pathname === "/urlshortener") {
      if (!isLogin) {
        alert("Please Login or Signup To Use These Features");
        his.push("/login");
      }
    }
  }, []);

  // fetching user data
  useEffect(() => {
    async function fetchData() {
      var options = {
        method: "GET",
        url: `https://utilitysite-010d.restdb.io/rest/urls?q={"email":"${curUser.email}"}`,
        headers: {
          "cache-control": "no-cache",
          "x-apikey": "610ff55d69fac573b50a534b",
        },
      };

      await axios
        .request(options)
        .then((res) => {
          setUsrUrlId(res.data[0]._id);
          setUrlList(JSON.parse(res.data[0].urlList));
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
    isLogin && fetchData();
  }, []);
  //

  //preventing misfire
  useEffect(() => {
    if (test) {
      console.log("Prevented UseEffect From Running Unneccessorily!");
    } else {
      console.log("useEffect Fired");
      localStorage.setItem("prev", JSON.stringify(urlList));
      updateList();
    }
  }, [urlList]);

  async function updateList() {
    let pr = JSON.stringify(urlList);
    console.log(curUser._id);
    const url = `https://utilitysite-010d.restdb.io/rest/urls/${usrUrlId}`;
    const headers = {
      "cache-control": "no-cache",
      "x-apikey": "610ff55d69fac573b50a534b",
      "content-type": "application/json",
    };
    const body = {
      email: curUser.email,
      urlList: pr,
    };
    await axios
      .put(url, body, { headers })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  // Short URL
  async function shortURLfn() {
    if (!longUrl) {
      alert("Input Field Cannot Be Blank!");
    } else {
      setTest(false);
      setShortUrl("");
      document.getElementById("shortInp").placeholder =
        "Shorting, Please Wait...";
      const options = {
        method: "POST",
        url: "https://url-shortener-service.p.rapidapi.com/shorten",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "x-rapidapi-key":
            "80cf7f649emsh2dbdc2572126428p1b5afbjsn2998d99ca75f",
          "x-rapidapi-host": "url-shortener-service.p.rapidapi.com",
        },
        data: `url=${longUrl}`,
      };

      await axios
        .request(options)
        .then((res) => {
          document.getElementById("shortInp").placeholder =
            "Enter Long URL Above to Short..";
          setShortUrl(res.data.result_url);
          const newEntry = { long: longUrl, short: res.data.result_url };
          setUrlList([...urlList, newEntry]);
        })
        .catch((err) => {
          alert("Invalid URL Entered..");
          document.getElementById("shortInp").placeholder =
            "Enter Long URL Above to Short..";
        });
    }
  }
  // delete URL

  function deleteURL(index) {
    setTest(false);
    let updatedArr = urlList.filter((i, e) => {
      return e !== index;
    });

    setUrlList(updatedArr);
  }

  return (
    <div className="w-screen h-full flex flex-col justify-start overflow-visible items-center">
      {/* Long URL DIV */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Long URL</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={longUrl}
            style={{maxWidth:'90vw'}}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter Long URL Here.."
            className="w-96 lg:w-96 md:w-90 sm:w-80 pr-16 input input-primary input-bordered"
          />
          <button
            onClick={shortURLfn}
            className="absolute top-0 right-0 rounded-l-none btn btn-primary"
          >
            short
          </button>
        </div>
      </div>

      {/* Short URL DIV */}

      <div className="form-control">
        <label className="label">
          <span className="label-text">Short Url</span>
        </label>
        <div className="relative">
          <input
            type="text"
            id="shortInp"
            value={shortUrl}
            readOnly
            style={{maxWidth:'90vw'}}
            placeholder="Enter Long URL Above to Short.."
            className="w-96 lg:w-96 md:w-90 sm:w-80  pr-16 input input-primary input-bordered"
          />
          <button className="absolute top-0 right-0 rounded-l-none btn btn-primary">
            copy
          </button>
        </div>
      </div>

      <div className="w-screen mt-3  grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 place-items-center ">
        {loading ? (
          <div className="absolute w-screen h-full top-5 text-primary-content flex justify-center items-center">
            <ClockLoader />
          </div>
        ) : (
          urlList.map((i, e) => {
            return (
              <UrlCard
                long={i.long}
                short={i.short}
                deleteURL={deleteURL}
                num={e}
                key={e}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
