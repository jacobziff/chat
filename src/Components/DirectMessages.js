import Channel from "./Channel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function hash(name, size) {
    let sum = 0
    for (let i = 0; i < name.length; ++i) {
        sum += (name.charCodeAt(i) * name.charCodeAt(i))
    }
    return sum % size
}

function doAddDM(setAddingDM, DMList, setDMList, setChannel, username, isMobile, setShowMenu) {
    let name = document.getElementById("userfield").value
    document.getElementById("userfield").value = ""
    let l = name.length
    setAddingDM(false);
    if (!(l > 0 && l < 21)) {
        return;
    }
    if (name[0] === '#' || (name === username) || DMList.includes(name)) {
        return;
    } else {
        setDMList([name].concat(DMList))
        setChannel(name)
        if (isMobile) {
            setShowMenu(false)
        }
    }
}

function DirectMessages(props) {

    let [addingDM, setAddingDM] = useState(false)

    useEffect(() => {if (addingDM && document.getElementById("userfield")) { document.getElementById("userfield").focus()}}, [addingDM])

    if (!props.DMList) {
        return (
            <div className="pb-28">
                <div className="flex flex-row items-center justify-between border-b border-slate-500 mx-8 pl-1 my-1 py-1">
                    <h2 className="text-slate-200 text-left">Direct Messages</h2>
                    <FontAwesomeIcon icon={faPlus} className="text-slate-200" onClick={() => setAddingDM(true)}/>
                </div>
            </div>
        );
    }

    if (addingDM) {
        return (
            <div className="pb-28">
                <div className="flex flex-row items-center justify-between border-b border-slate-500 mx-8 pl-1 my-1 py-1">
                    <h2 className="text-slate-200 text-left">Direct Messages</h2>
                    <FontAwesomeIcon icon={faPlus} className="text-slate-200" onClick={() => setAddingDM(true)}/>
                </div>
                {props.DMList.map((name) =>
                    <Channel key={name} name={name} channel={props.channel} setChannel={props.setChannel} emoji={props.emojis[hash(name, props.emojis.length)]} setShowMenu={props.setShowMenu} isMobile={props.isMobile}/>
                )}
                <div id="coverbackground" className="grid justify-items-center items-center" style={{height: `${window.innerHeight}px`, width: `${window.innerWidth}px`, zIndex: 100, position: "fixed", top: "0", background: "rgba(31, 41, 55, 0.8)"}}>
                    <div id="dminterface" className="flex flex-col items-center h-fit w-fit bg-gray-700 rounded-lg">
                        <input className="border-gray-700 bg-gray-500 border-2 h-fit w-3/4 text-xl rounded px-2 py-1 my-4 text-slate-100" id="userfield" type="text" placeholder="Username" onKeyDown={(e) => 
                            {if (e.key === 'Enter') {
                                e.target.blur();
                                doAddDM(setAddingDM, props.DMList, props.setDMList, props.setChannel, props.username, props.isMobile, props.setShowMenu);
                        }}}></input>
                        <div className="flex flex-row">
                            <button className="bg-zinc-900 py-2 w-20 m-3 rounded text-normal text-slate-200" onClick={() => setAddingDM(false)}>Cancel</button>
                            <button className="bg-zinc-900 py-2 w-20 m-3 rounded text-normal text-slate-200" onClick={() => doAddDM(setAddingDM, props.DMList, props.setDMList, props.setChannel, props.username, props.isMobile, props.setShowMenu)}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="pb-28">
                <div className="flex flex-row items-center justify-between border-b border-slate-500 mx-8 pl-1 my-1 py-1">
                    <h2 className="text-slate-200 text-left">Direct Messages</h2>
                    <FontAwesomeIcon icon={faPlus} className="text-slate-200" onClick={() => setAddingDM(true)}/>
                </div>
                {props.DMList.map((name) =>
                    <Channel key={name} name={name} channel={props.channel} setChannel={props.setChannel} emoji={props.emojis[hash(name, props.emojis.length)]} setShowMenu={props.setShowMenu} isMobile={props.isMobile}/>
                )}
            </div>
        );
    }
}
export default DirectMessages