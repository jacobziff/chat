function Channel(props) {
    let name = props.name
    let classes = "text-slate-200 text-left pl-1 mx-8 my-1 py-1 overflow-x-scroll whitespace-nowrap"
    if (props.channel === props.name) {
        classes = "text-slate-200 font-bold text-left pl-1 mx-8 my-1 py-1 overflow-x-scroll whitespace-nowrap"
    }
    let full = <h3 className={classes} onClick={() => props.setChannel(props.name)}>{props.emoji} {name}</h3>;
    if (name[0] === '#') {
        name = "# ".concat(name.substring(1))
        full = <h3 className={classes} onClick={() => props.setChannel(props.name)}>{name}</h3>
    }
    return (
        <div>
            {full}
        </div>
    );
}
export default Channel