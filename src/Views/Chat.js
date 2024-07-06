function Chat(props) {
    return (
        <div>
            <h1>Chat</h1>
            <button onClick={() => props.update(false)}>Log Out Button</button>
        </div>
    );
}
export default Chat;