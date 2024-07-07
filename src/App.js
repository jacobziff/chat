import './index.css';
import './tailwind.css';
import Chat from './Views/Chat';
import Login from './Views/Login';
import Footer from './Components/Footer';
import { useState } from 'react';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  if (loggedIn) {
    return (
      <div>
        <Chat update={setLoggedIn} username={username}/>
      </div>
    );
  } else {
    return (
      <div>
        <div className="bg-gray-800 h-screen flex flex-col items-center">
          <Login update={setLoggedIn} setUsername={setUsername}/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;
