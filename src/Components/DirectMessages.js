import Channel from "./Channel";

function hash(name, size) {
    let sum = 0
    for (let i = 0; i < name.length; ++i) {
        sum += (name.charCodeAt(i) * name.charCodeAt(i))
    }
    return sum % size
}

function DirectMessages(props) {
    return (
        <div className="pb-28">
            <h2 className="text-slate-200 text-left pl-1 mx-8 my-1 py-1 border-b border-slate-500">Direct Messages</h2>
            {props.DMList.map((name) =>
                <Channel key={name} name={name} channel={props.channel} setChannel={props.setChannel} emoji={props.emojis[hash(name, props.emojis.length)]}/>
            )}
        </div>
    );
}
export default DirectMessages