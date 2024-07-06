import './index.css';
import './tailwind.css';
import Chat from './Views/Chat';
import Login from './Views/Login';
import { useState } from 'react';

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  if (loggedIn) {
    return (
      <div>
        <Chat update={setLoggedIn}/>
      </div>
    );
  } else {
    return (
      <div>
        <Login update={setLoggedIn}/>
      </div>
    );
  }
  // return (
  //   <div>
  //     <Router>
  //       <Routes>
  //         <Route exact path="/" element={<Login/>}></Route>
  //         <Route exact path="/chat/" element={<Login/>}></Route>
  //         <Route path="/chat/home" element={<Chat/>}></Route>
  //       </Routes>
  //     </Router>
  //   </div>
  // );
}

export default App;
