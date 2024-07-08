import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

async function doSubmit(user, channel, messagesRef) {
    let msg = document.getElementById("userfield").value
    if (msg === "") {
        return;
    }
    let limit = 2000
    if (msg.length > limit) {
        msg = msg.substring(0, limit)
    }
    document.getElementById("userfield").value = ""
    await messagesRef.add({
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        sentBy: user,
        sentTo: channel,
        text: msg
    })
    var objDiv = document.getElementById("messagebox");
    if (objDiv) {
        objDiv.scrollTop = objDiv.scrollHeight;
    }
}

function MessagesFooter(props) {
    let classes = "flex flex-row items-center justify-evenly mx-4 gap-4 fixed bottom-8 bg-zinc-900"
    let invisibleClasses = "invisible"
    if (props.showMenu) {
        classes += " w-3/4"
        invisibleClasses += " w-8"
    } else {
        classes += " w-full"
        invisibleClasses += " w-3.5"
    }
    return (
        <div className={classes}>
            <input className="border-gray-700 bg-gray-500 border-2 h-fit w-full text-normal rounded px-2 py-1 my-2 text-slate-100" id="userfield" type="text" placeholder="Message" onKeyDown={(e) => 
                {if (e.key === 'Enter') {
                    e.target.blur();
                    doSubmit(props.username, props.channel, props.messagesRef);
            }}}></input>
            <FontAwesomeIcon icon={faPaperPlane} className="text-slate-200" onClick={() => doSubmit(props.username, props.channel, props.messagesRef)}/>
            <button className={invisibleClasses}></button>
        </div>
    );
}
export default MessagesFooter;