import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from '../Components/Header';
import Menu from '../Components/Menu';
import Messages from '../Components/Messages';
import Footer from '../Components/Footer';

const firebaseConfig = {
    apiKey: "AIzaSyBTsJD7yoq8q4s8Yjwh0Aj2T0nHVM0JmRU",
    authDomain: "chat-j-z.firebaseapp.com",
    databaseURL: "https://chat-j-z-default-rtdb.firebaseio.com",
    projectId: "chat-j-z",
    storageBucket: "chat-j-z.appspot.com",
    messagingSenderId: "810540220082",
    appId: "1:810540220082:web:2dc19fc4e4245a04fa13ab",
    measurementId: "G-80SN7H3WK3"
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = firebase.auth();
const firestore = firebase.firestore();

function Chat(props) {

    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
    const [messages] = useCollectionData(query, {idField : 'id'})

    let isMobile = useMediaQuery({ query: `(max-width: 700px)` });
    let [showMenu, setShowMenu] = useState(!isMobile)
    let [channel, setChannel] = useState("#General")
    const globalList = ["#General", "#Random", "#Suggestions"]
    let [DMList, setDMList] = useState(["User1", "User2", "User3"])
    let emojis = ['😀', '😃', '😄', '😁,', '😆', '🤩', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '😘', '😗', '😙', '😚', '😋', '🤪', '😜', '😝', '😛', '🤑', '🤗', '🤓', '😎', '🤡', '🤠', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '😤', '😠', '😡', '🤬', '😶', '😐', '😑', '😯', '😦', '😧', '😮', '😲', '😵', '🤯', '😳', '😱', '😨', '😰', '😢', '😥', '🤤', '😭', '😓', '😪', '😴', '🥱', '🙄', '🤨', '🧐', '🤔', '🤫', '🤭', '🤥', '😬', '🤐', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '😈', '👿', '👹', '👺', '💩', '👻', '💀', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '👐', '🙌', '👏', '🙏', '🤲', '🤝', '👍', '👊', '✊', '🤞', '🤘', '👌', '✋', '🖖', '👋', '🤙', '💪', '🤟', '💅', '🖖', '💋', '👄', '👅', '👂', '🦻', '👃', '🦵', '🦶', '🦾', '🦿', '👣', '👁', '👀', '🗣', '👤', '👶', '👦', '👧', '🧒', '👨', '👩', '🧑', '👱‍♀️', '👱', '🧔', '👴', '👵', '🧓', '👲', '👳‍♀️', '👳', '🧕', '👮‍♀️', '👮', '👷‍♀️', '👷', '💂‍♀️', '💂', '🕵️‍♀️', '🕵️', '👩‍⚕️', '👨‍⚕️', '👩‍🌾', '👨‍🌾', '👩‍🍳', '👨‍🍳', '👩‍🎓', '👨‍🎓', '👩‍🎤', '👨‍🎤', '👩‍🏫', '👨‍🏫', '👩‍🏭', '👨‍🏭', '👩‍💻', '👨‍💻', '👩‍💼', '👨‍💼', '👩‍🔧', '👨‍🔧', '👩‍🔬', '👨‍🔬', '👩‍🎨', '👨‍🎨', '👩‍🚒', '👨‍🚒', '👩‍✈️', '👨‍✈️', '👩‍🚀', '👨‍🚀', '👩‍⚖️', '👨‍⚖️', '🤶', '🎅', '👸', '🤴', '👰', '🤵', '👼', '🤱', '🙇‍♀️', '🙇', '💁', '💁‍♂️', '🙅', '🙅‍♂️', '🙆', '🙆‍♂️', '🙋', '🙋‍♂️', '🤷‍♀️', '🤷‍♂️', '🙎', '🙎‍♂️', '🙍', '🙍‍♂️', '💇', '💇‍♂️', '💆', '💆‍♂️', '🧖‍♀️', '🧖‍♂️', '🧏', '🧏‍♂️', '🧏‍♀️', '🧙‍♀️', '🧙‍♂️', '🧛‍♀️', '🧛‍♂️', '🧟‍♀️', '🧟‍♂️', '🧚‍♀️', '🧚‍♂️', '🧜‍♀️', '🧜‍♂️', '🧝‍♀️', '🧝‍♂️', '🧞‍♀️', '🧞‍♂️', '🕴', '💃', '🕺', '🚶‍♀️', '🚶', '🏃‍♀️', '🏃', '🧍', '🧍‍♂️', '🧍‍♀️', '🧎', '🧎‍♂️', '🧎‍♀️', '👨‍🦯', '👩‍🦯', '👨‍🦼', '👩‍🦼', '👨‍🦽', '👩‍🦽', '⛷', '🏂', '🏋️‍♀️', '🏋️', '🤺', '🤼‍♀️', '🤼‍♂️', '🤸‍♀️', '🤸‍♂️', '⛹️‍♀️', '⛹️', '🤾‍♀️', '🤾‍♂️', '🏌️‍♀️', '🏌️', '🏄‍♀️', '🏄', '🏊‍♀️', '🏊', '🤽‍♀️', '🤽‍♂️', '🚣‍♀️', '🚣', '🏇', '🚴‍♀️', '🚴', '🚵‍♀️', '🚵', '🤹‍♀️', '🤹‍♂️', '🧗‍♀️', '🧗‍♂️', '🧘‍♀️', '🧘‍♂️', '🥰', '🥵', '🥶', '🥳', '🥴', '🥺', '🦸', '🦹', '🧑‍🦰', '🧑‍🦱', '🧑‍🦳', '🧑‍🦲', '🧑‍⚕️', '🧑‍🎓', '🧑‍🏫', '🧑‍⚖️', '🧑‍🌾', '🧑‍🍳', '🧑‍🔧', '🧑‍🏭', '🧑‍💼', '🧑‍🔬', '🧑‍💻', '🧑‍🎤', '🧑‍🎨', '🧑‍✈️', '🧑‍🚀', '🧑‍🚒', '🧑‍🦯', '🧑‍🦼', '🧑‍🦽']

    var objDiv = document.getElementById("messagebox");
    if (objDiv) {
        objDiv.scrollTop = objDiv.scrollHeight
    }

    if (showMenu) {
        if (isMobile) {
            return (
                <div>
                    <Header update={props.update} menu={showMenu} togglemenu={setShowMenu}/>
                    <div className="bg-gray-900 h-screen border-r-2 border-gray-700 overflow-y-scroll">
                        <Menu channel={channel} setChannel={setChannel} globalList={globalList} DMList={DMList} setDMList={setDMList} emojis={emojis} showMenu={showMenu}/>
                    </div>
                    <Footer/>
                </div>
            );
        } else {
            return (
                <div>
                    <Header update={props.update} menu={showMenu} togglemenu={setShowMenu}/>
                    <div id="withmenu" className="grid">
                        <div className="bg-gray-900 h-screen border-r-2 border-gray-700 overflow-y-scroll">
                            <Menu channel={channel} setChannel={setChannel} globalList={globalList} DMList={DMList} setDMList={setDMList} emojis={emojis} showMenu={showMenu}/>
                        </div>
                        <div className="bg-zinc-900 h-screen border-l-2 border-gray-700">
                            <Messages channel={channel} emojis={emojis} messages={messages} username={props.username} showMenu={showMenu} messagesRef={messagesRef}/>
                        </div>
                    </div>
                    <Footer/>
                </div>
            );
        }
    } else {
        return (
            <div>
                <Header update={props.update} menu={showMenu} togglemenu={setShowMenu}/>
                <div className="bg-zinc-900 h-screen">
                    <Messages channel={channel} emojis={emojis} messages={messages} username={props.username} showMenu={showMenu} messagesRef={messagesRef}/>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default Chat;