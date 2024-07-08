function MessagesHeader(props) {
    let channel = props.channel
    if (channel[0] === '#') {
        channel = "# " + channel.substring(1)
    } else {
        channel = props.emoji + " " + channel
    }
    return (
        <div id="messagesheadergrid" className="grid border-b-0 border-slate-500 mx-4">
            <h3 className="text-slate-200 text-left font-bold text-xl ml-1 my-4">{channel}</h3>
            <h3 className="text-slate-200 text-right text-xl mr-1 my-4">Chatting as <a className="font-bold">{props.username}</a></h3>
        </div>
    );
}
export default MessagesHeader