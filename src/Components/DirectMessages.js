import Channel from "./Channel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function hash(name, size) {
    let sum = 0
    for (let i = 0; i < name.length; ++i) {
        sum += (name.charCodeAt(i) * name.charCodeAt(i))
    }
    return sum % size
}

function addDM() {
    return;
}

function DirectMessages(props) {
    return (
        <div className="pb-28">
            <div className="flex flex-row items-center justify-between border-b border-slate-500 mx-8 pl-1 my-1 py-1">
                <h2 className="text-slate-200 text-left">Direct Messages</h2>
                <FontAwesomeIcon icon={faPlus} className="text-slate-200" onClick={() => addDM()}/>
            </div>
            {props.DMList.map((name) =>
                <Channel key={name} name={name} channel={props.channel} setChannel={props.setChannel} emoji={props.emojis[hash(name, props.emojis.length)]}/>
            )}
        </div>
    );
}
export default DirectMessages