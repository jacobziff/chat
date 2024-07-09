import GlobalChannels from "./GlobalChannels";
import DirectMessages from "./DirectMessages";

function Menu(props) {
    return (
        <div className="flex flex-col">
            <GlobalChannels channel={props.channel} setChannel={props.setChannel} globalList={props.globalList} setShowMenu={props.setShowMenu} isMobile={props.isMobile}/>
            <DirectMessages channel={props.channel} setChannel={props.setChannel} DMList={props.DMList} setDMList={props.setDMList} emojis={props.emojis} username={props.username} setShowMenu={props.setShowMenu} isMobile={props.isMobile}/>
        </div>
    );
}
export default Menu