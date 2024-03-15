import { Link } from "react-router-dom";

const getOauthGoogleUrl = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: "http://localhost:8088/api/oauth/google",
    client_id:
      "807612135263-cvag85qids3e2titr906eb2r0vtvaoqq.apps.googleusercontent.com",
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
};

function Home() {
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));
  const oauthURL = getOauthGoogleUrl();
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.reload();
  };
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Xin chào, bạn đã login thành công</p>
          <button onClick={logout}>Click để logout</button>
        </div>
      ) : (
        <Link to={oauthURL}>Login with Google</Link>
      )}
    </div>
  );
}

export default Home;
