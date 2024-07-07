import { useState } from "react";

function checkName(name, setTried, update, setUsername) {
    console.log(name)
    document.getElementById('userfield').value = "";
    setTried(true)
    let l = name.length
    if (!(l > 0 && l < 21)) {
        return;
    }
    if (name[0] === '#') {
        return;
    } else {
        setTried(false)
        update(true)
        setUsername(name)
    }
}

function Login(props) {

    let [tried, setTried] = useState(false)

    let mainArea = 
        <div className="flex flex-col p-8 gap-8 justify-items-center items-center">
            <h2 className="text-slate-200 text-2xl text-center font-light pt-10">Enter a username to get started</h2>
            <input className="border-gray-700 bg-gray-500 border-2 w-60 h-12 text-xl rounded px-2 my-2 mx-2 text-slate-100" id="userfield" type="text" placeholder="Username" onKeyDown={(e) => 
                {if (e.key === 'Enter') {
                    checkName(document.getElementById('userfield').value, setTried, props.update, props.setUsername);
                    e.target.blur();
            }}}></input>
            <button className="bg-zinc-950 py-3 w-60 rounded text-xl text-slate-200" onClick={() => checkName(document.getElementById('userfield').value, setTried, props.update, props.setUsername)}>Login</button>
        </div>

    if (!tried) {
        return (
            <div>
                <h1 className="text-slate-200 text-5xl text-center font-bold p-8">Chat App</h1>
                {mainArea}
            </div>
        );
    } else {
        return (
            <div>
                <h1 className="text-slate-200 text-5xl text-center font-bold p-8">Chat App</h1>
                {mainArea}
                <h2 className="text-red-300 text-lg text-center px-6">Please pick a name between 1-20 characters. The first character cannot be "#". </h2>
            </div>
        );
    }
}
export default Login;