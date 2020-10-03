import React from "react";
import { GoogleLogin } from "react-google-login";

export default ({ onLogin }) => {
  const handleSuccessfulLogin = (e) => {
    console.log(e);
    onLogin(e);
  };

  return (
    <div>
      <div className="min-vh-100"></div>
      <div className="container p-2">
        <div className="bg-white card border-0 p-3 text-center shadow-sm">
          <h3>Login with Google</h3>
          <GoogleLogin
            clientId="74361786264-v858k0po050aon4fqf27ehrcin9un4ga.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={handleSuccessfulLogin}
            onFailure={(e) => console.log("login failed", e)}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </div>
    </div>
  );
};
