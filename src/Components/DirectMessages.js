import Channel from "./Channel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function hash(name, size) {
    let sum = 0
    for (let i = 0; i < name.length; ++i) {
        sum += (name.charCodeAt(i) * name.charCodeAt(i))
    }
    return sum % size
}

function doAddDM(setAddingDM, DMList, setDMList, setChannel) {
    let name = document.getElementById("userfield").value
    document.getElementById("userfield").value = ""
    let l = name.length
    setAddingDM(false);
    if (!(l > 0 && l < 21)) {
        return;
    }
    if (name[0] === '#') {
        return;
    } else {
        setDMList([name].concat(DMList))
        setChannel(name)
    }
}

function DirectMessages(props) {

    let [addingDM, setAddingDM] = useState(false)

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
                    <Channel key={name} name={name} channel={props.channel} setChannel={props.setChannel} emoji={props.emojis[hash(name, props.emojis.length)]}/>
                )}
                <div id="coverbackground" className="flex items-center" style={{height: `${window.innerHeight}px`, width: `${window.innerWidth}px`, zIndex: 100, position: "fixed", top: "0", background: "rgba(31, 41, 55, 0.8)"}}>
                    <div id="dminterface" className="flex flex-col items-center h-fit w-1/4 bg-gray-700 rounded-lg">
                        <input className="border-gray-700 bg-gray-500 border-2 h-fit w-3/4 text-xl rounded px-2 py-1 my-4 text-slate-100" id="userfield" type="text" placeholder="Username" onKeyDown={(e) => 
                            {if (e.key === 'Enter') {
                                e.target.blur();
                                doAddDM(setAddingDM, props.DMList, props.setDMList, props.setChannel);
                        }}}></input>
                        <div className="flex flex-row">
                            <button className="bg-zinc-900 py-2 w-20 m-3 rounded text-normal text-slate-200" onClick={() => setAddingDM(false)}>Cancel</button>
                            <button className="bg-zinc-900 py-2 w-20 m-3 rounded text-normal text-slate-200" onClick={() => doAddDM(setAddingDM, props.DMList, props.setDMList, props.setChannel)}>OK</button>
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
                    <Channel key={name} name={name} channel={props.channel} setChannel={props.setChannel} emoji={props.emojis[hash(name, props.emojis.length)]}/>
                )}
            </div>
        );
    }
}
export default DirectMessages