function ChatMessage(props) {
    return (
        <p>{props.sentTo} {props.sentBy} {props.text}</p>
    );
}
export default ChatMessage;