import { Login } from "./pages/Login";
import "./index.css";

import { UserProvider, useUser } from "./lib/context/User";
import { Home } from "./pages/Home";
import { IdeasProvider } from "./lib/context/ideas";
function App() {
  const isLoginPage = window.location.pathname === "/login";
  console.log(isLoginPage);
  return (
    <div>
      <UserProvider>
        <IdeasProvider>
          <Navbar />
          <main>{isLoginPage ? <Login /> : <Home />}</main>
        </IdeasProvider>
      </UserProvider>
    </div>
  );
}
export default App;

function Navbar() {
  const user = useUser();
  return (
    <>
      <nav>
        <a href="/">Ideas tracker</a>
        <div>
          {user.current ? (
            <>
              <span>{user.current.email}</span>
              <button type="button" onClick={() => user.logout()}>
                Logout
              </button>
            </>
          ) : (
            <a href="/login">Login</a>
          )}
        </div>
      </nav>
    </>
  );
}
