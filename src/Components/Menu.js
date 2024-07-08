import GlobalChannels from "./GlobalChannels";
import DirectMessages from "./DirectMessages";

function Menu(props) {
    return (
        <div className="flex flex-col">
            <GlobalChannels channel={props.channel} setChannel={props.setChannel} globalList={props.globalList}/>
            <DirectMessages channel={props.channel} setChannel={props.setChannel} DMList={props.DMList} setDMList={props.setDMList} emojis={props.emojis}/>
        </div>
    );
}
export default Menu