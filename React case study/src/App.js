import './App.css';
import Container from './Container';
import { useState } from 'react';
import Navigation from './Navigation';

function App() {
  let [currentPage, setCurrentPage] = useState("Login");
  let [user, setUser] = useState(null);
  let [loggedIn, setLoggedIn] = useState(false);

  let login = (user) => {
    setLoggedIn(true);
    setUser(user)
    handleClick("Companies")
  }

  let logout = () => {
    setLoggedIn(false);
    setUser(null)
    handleClick("Login")
  }

  let handleClick = e => {
    const text = e;
    setCurrentPage(text);
  }
  return (
    <>
      <Navigation handleClick={handleClick} logout={logout} loggedIn={loggedIn} />
      <Container currentPage={currentPage} login={login} loggedIn={loggedIn} user={user} />
    </>
  )
}

export default App;
