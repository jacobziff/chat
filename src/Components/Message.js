function Message(props) {
    let msg = props.message
    // console.log(msg.sentBy, msg.sentTo, msg.text, props.channel)
    if (props.channel[0] !== '#') {
        if (!((props.channel === msg.sentTo && props.username === msg.sentBy) || (props.channel === msg.sentBy && props.username === msg.sentTo))) {
            return (
                <div>
    
                </div>
            );
        }
    } else if (msg.sentTo !== props.channel) {
        return (
            <div>

            </div>
        );
    }
    let date = new Date(0)
    if (msg.createdAt) {
        date.setUTCSeconds(msg.createdAt.seconds)
    }
    let sentBy = ""
    if (props.channel[0] === '#') {
        sentBy = msg.sentBy + " • "
    }
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"]
    let month = months[date.getMonth()]
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    if (minute < 10) {
        minute = "0" + minute
    } else {
        minute = "" + minute
    }
    if (hour == 0) {
        hour = 12
        minute += " AM"
    } else if (hour > 11) {
        if (hour > 12) {
            hour -= 12
        }
        minute += " PM"
    } else {
        minute += " AM"
    }
    if ((props.username === msg.sentBy)) {
        return (
            <div className="grid justify-items-end">
                <div className="px-3 py-2 mt-3 bg-blue-500 rounded-lg messagebubble">
                    <p className="text-slate-200">{msg.text}</p>
                </div>
                <p className="text-slate-200 text-sm mb-3">{props.emoji} {sentBy} {month} {day}, {hour}:{minute}</p>
            </div>
        );
    } else {
        return (
            <div className="grid justify-items-start">
                <div className="px-3 py-2 mt-3 bg-gray-600 rounded-lg messagebubble">
                    <p className="text-slate-200">{msg.text}</p>
                </div>
                <p className="text-slate-200 text-sm mb-3">{props.emoji}{sentBy}{month} {day}, {hour}:{minute}</p>
            </div>
        );
    }
}
export default Message;