// @ts-nocheck
import { useAuth0 } from "@auth0/auth0-react";
import "./styles/UserAuth.css";

function UserAuth() {
  //import required functions from auth0
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <div class="auth">
      {isAuthenticated ? (
        <button class="logout" onClick={logout}>
          Logout 👋
        </button>
      ) : (
        <button class="login" onClick={loginWithRedirect}>
          Login or Sign-up{" "}
        </button>
      )}
      {isAuthenticated ? (
        <p class="small">Hello {user.nickname}!</p>
      ) : (
        <p class="small">(Redirects to Auth0)</p>
      )}
    </div>
  );
}

export default UserAuth;
