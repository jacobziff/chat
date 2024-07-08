import Channel from "./Channel";

function GlobalChannels(props) {
    return (
        <div className="pb-3 pt-6">
            <h2 className="text-slate-200 text-left pl-1 mx-8 my-1 py-1 border-b border-slate-500">Channels</h2>
            {props.globalList.map((name) =>
                <Channel key={name} name={name} channel={props.channel} setChannel={props.setChannel} emoji="N/A" emojis={["N/A"]}/>
            )}
        </div>
    );
}
export default GlobalChannels