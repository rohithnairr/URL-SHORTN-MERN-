import React, { useState } from "react";
import validator from "validator";
import axios from "axios";

export default ({ user }) => {
  const [url, setURL] = useState("");
  const [link, setLink] = useState(null);

  const handleShorten = (e) => {
    e.preventDefault();
    const validURL = validator.isURL(url, {
      require_protocol: true,
    });
    if (!validURL) {
      alert(
        "Please ensure this URL is correct and includes the http(s) protocol."
      );
    } else {
      console.log("URL is :", url);
      //post values.
      axios
        .post("http://localhost:5000/api/shorten", { url })
        .then((res) => {
          console.log(res.data.hash);
          setLink(`http://localhost:5000/${res.data.hash}`);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container">
      <div className="body-wrap">
        <header>
          <h1>SHORTEN</h1>
          {user && user.profileObj && (
            <div>
              <img
                src={user.profileObj.imageUrl}
                alt="avatar"
                style={{ width: "50px", borderRadius: "100vw" }}
              />
              {user.profileObj.name} ({user.profileObj.email})
            </div>
          )}
          <small></small>
        </header>
        <main>
          <form onSubmit={handleShorten}>
            <fieldset>
              <input
                type="text"
                name="url"
                placeholder="Enter the URL including the http(s)protocol"
                onChange={(e) => setURL(e.target.value)}
                value={url}
              />
              <input type="submit" value="shorten" />
            </fieldset>
            <fieldset className={link ? "display-result" : "hide-result"}>
              <span id="result">{link}</span>
            </fieldset>
          </form>
        </main>
      </div>
    </div>
  );
};
