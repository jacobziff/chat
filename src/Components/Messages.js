import MessagesHeader from "./MessagesHeader";
import MessagesFooter from "./MessagesFooter";
import Message from "./Message";

function hash(name, size) {
    let sum = 0
    for (let i = 0; i < name.length; ++i) {
        sum += (name.charCodeAt(i) * name.charCodeAt(i))
    }
    return sum % size
}

function Messages(props) {
    if (props.messages) {
        return (
            <div className="flex flex-col">
              <MessagesHeader channel={props.channel} username={props.username} emoji={props.emojis[hash(props.channel, props.emojis.length)]}/>  
              <div id="messagebox" className="mx-4 border-t border-slate-500 overflow-y-scroll" style={{height: `${window.innerHeight - 180}px`}}>
                {props.messages.map((msg) => <Message key={msg.text} message={msg} username={props.username} channel={props.channel} emoji={props.emojis[hash(msg.sentBy, props.emojis.length)]}/>)}
                <div className="p-4"></div>
              </div>
              <MessagesFooter showMenu={props.showMenu} messagesRef={props.messagesRef} username={props.username} channel={props.channel}/>
            </div>
        );
    } else {
        return (
            <div>

            </div>
        );
    }
}
export default Messages