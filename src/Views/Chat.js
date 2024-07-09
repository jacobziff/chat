import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useCollectionData, useCollection } from 'react-firebase-hooks/firestore'
import { getAnalytics } from "firebase/analytics";
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Header from '../Components/Header';
import Menu from '../Components/Menu';
import Messages from '../Components/Messages';
import Footer from '../Components/Footer';
import { useEffect } from 'react';
import { collection } from 'firebase/firestore';
import {getFirestore, query, where, orderBy, limit, or, and, deleteDoc, doc } from "firebase/firestore";  
import { data } from 'autoprefixer';

// https://console.firebase.google.com/u/0/project/chat-j-z/firestore/databases/-default-/data/~2Fmessages~2F0QQR1P9vPof4xAzvHNI1
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
const messagesRef = collection(firebase.firestore(), 'messages');

async function deleteMessage(message) {
    if (message.id) {
        await deleteDoc(doc(db, 'messages', message.id))
    }
}

function doDMList(messages, username, channel) {
    if (messages) {
        let dms = new Set()
        let result = []
        let currTime = new Date().getTime() / 1000
        for (let i = messages.length - 1; i >= 0; --i) {
            let messageTime = currTime
            if (messages[i].createdAt) {
                messageTime = messages[i].createdAt.seconds
            }
            if (currTime - messageTime > 604800) {
                deleteMessage(messages[i])
            } else {
                let recipient = messages[i].sentTo
                let sender = messages[i].sentBy
                if (recipient === username && !(dms.has(sender)) && sender[0] !== '#') {
                    dms.add(sender)
                    result.push(sender)
                }
                if (sender === username && !(dms.has(recipient)) && recipient[0] !== '#') {
                    dms.add(recipient)
                    result.push(recipient)
                }
            }
        }
        if (channel[0] != '#' && !dms.has(channel)) {
            result.push(channel)
        }
        return result;
    }
}

function compareMessages(a, b) {
    return (a.createdAt > b.createdAt);
}

function Chat(props) {

    const updateMessagesRef = firestore.collection('messages')
    let [channel, setChannel] = useState("#General")

    let messageQuery = query(messagesRef, or(where("sentTo", "==", channel), 
                                            or(where("sentBy", "==", channel), 
                                                or(where("sentTo", "==", props.username), 
                                                    where("sentBy", "==", props.username)))));

    let [messages] = useCollectionData(messageQuery, {idField : 'documentID'})
    let [snapshot] = useCollection(messageQuery)

    if (snapshot) {
        snapshot = snapshot._snapshot.docChanges
        for (let i = 0; i < snapshot.length; ++i) {
            let segs = snapshot[i].doc.key.path.segments
            let id = segs[segs.length - 1]
            messages[i] = {
                ...messages[i],
                id : id
            }
        }
    }
    if (messages) {
        messages.sort((a, b) => compareMessages(a, b))
    }

    let isMobile = useMediaQuery({ query: `(max-width: 700px)` });
    let [showMenu, setShowMenu] = useState(!isMobile)
    const globalList = ["#General", "#Random", "#Suggestions"]
    let [DMList, setDMList] = useState([])
    let emojis = ['😀', '😃', '😄', '😁,', '😆', '🤩', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '😘', '😗', '😙', '😚', '😋', '🤪', '😜', '😝', '😛', '🤑', '🤗', '🤓', '😎', '🤡', '🤠', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '😤', '😠', '😡', '🤬', '😶', '😐', '😑', '😯', '😦', '😧', '😮', '😲', '😵', '🤯', '😳', '😱', '😨', '😰', '😢', '😥', '🤤', '😭', '😓', '😪', '😴', '🥱', '🙄', '🤨', '🧐', '🤔', '🤫', '🤭', '🤥', '😬', '🤐', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '😈', '👿', '👹', '👺', '💩', '👻', '💀', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '👐', '🙌', '👏', '🙏', '🤲', '🤝', '👍', '👊', '✊', '🤞', '🤘', '👌', '✋', '🖖', '👋', '🤙', '💪', '🤟', '💅', '🖖', '💋', '👄', '👅', '👂', '🦻', '👃', '🦵', '🦶', '🦾', '🦿', '👣', '👁', '👀', '🗣', '👤', '👶', '👦', '👧', '🧒', '👨', '👩', '🧑', '👱‍♀️', '👱', '🧔', '👴', '👵', '🧓', '👲', '👳‍♀️', '👳', '🧕', '👮‍♀️', '👮', '👷‍♀️', '👷', '💂‍♀️', '💂', '🕵️‍♀️', '🕵️', '👩‍⚕️', '👨‍⚕️', '👩‍🌾', '👨‍🌾', '👩‍🍳', '👨‍🍳', '👩‍🎓', '👨‍🎓', '👩‍🎤', '👨‍🎤', '👩‍🏫', '👨‍🏫', '👩‍🏭', '👨‍🏭', '👩‍💻', '👨‍💻', '👩‍💼', '👨‍💼', '👩‍🔧', '👨‍🔧', '👩‍🔬', '👨‍🔬', '👩‍🎨', '👨‍🎨', '👩‍🚒', '👨‍🚒', '👩‍✈️', '👨‍✈️', '👩‍🚀', '👨‍🚀', '👩‍⚖️', '👨‍⚖️', '🤶', '🎅', '👸', '🤴', '👰', '🤵', '👼', '🤱', '🙇‍♀️', '🙇', '💁', '💁‍♂️', '🙅', '🙅‍♂️', '🙆', '🙆‍♂️', '🙋', '🙋‍♂️', '🤷‍♀️', '🤷‍♂️', '🙎', '🙎‍♂️', '🙍', '🙍‍♂️', '💇', '💇‍♂️', '💆', '💆‍♂️', '🧖‍♀️', '🧖‍♂️', '🧏', '🧏‍♂️', '🧏‍♀️', '🧙‍♀️', '🧙‍♂️', '🧛‍♀️', '🧛‍♂️', '🧟‍♀️', '🧟‍♂️', '🧚‍♀️', '🧚‍♂️', '🧜‍♀️', '🧜‍♂️', '🧝‍♀️', '🧝‍♂️', '🧞‍♀️', '🧞‍♂️', '🕴', '💃', '🕺', '🚶‍♀️', '🚶', '🏃‍♀️', '🏃', '🧍', '🧍‍♂️', '🧍‍♀️', '🧎', '🧎‍♂️', '🧎‍♀️', '👨‍🦯', '👩‍🦯', '👨‍🦼', '👩‍🦼', '👨‍🦽', '👩‍🦽', '⛷', '🏂', '🏋️‍♀️', '🏋️', '🤺', '🤼‍♀️', '🤼‍♂️', '🤸‍♀️', '🤸‍♂️', '⛹️‍♀️', '⛹️', '🤾‍♀️', '🤾‍♂️', '🏌️‍♀️', '🏌️', '🏄‍♀️', '🏄', '🏊‍♀️', '🏊', '🤽‍♀️', '🤽‍♂️', '🚣‍♀️', '🚣', '🏇', '🚴‍♀️', '🚴', '🚵‍♀️', '🚵', '🤹‍♀️', '🤹‍♂️', '🧗‍♀️', '🧗‍♂️', '🧘‍♀️', '🧘‍♂️', '🥰', '🥵', '🥶', '🥳', '🥴', '🥺', '🦸', '🦹', '🧑‍🦰', '🧑‍🦱', '🧑‍🦳', '🧑‍🦲', '🧑‍⚕️', '🧑‍🎓', '🧑‍🏫', '🧑‍⚖️', '🧑‍🌾', '🧑‍🍳', '🧑‍🔧', '🧑‍🏭', '🧑‍💼', '🧑‍🔬', '🧑‍💻', '🧑‍🎤', '🧑‍🎨', '🧑‍✈️', '🧑‍🚀', '🧑‍🚒', '🧑‍🦯', '🧑‍🦼', '🧑‍🦽']

    useEffect(() => {
        setDMList(doDMList(messages, props.username, channel))
    }, [snapshot])

    if (showMenu) {
        if (isMobile) {
            return (
                <div>
                    <Header update={props.update} menu={showMenu} togglemenu={setShowMenu}/>
                    <div className="bg-gray-900 h-screen border-r-2 border-gray-700 overflow-y-scroll">
                        <Menu channel={channel} setChannel={setChannel} globalList={globalList} DMList={DMList} setDMList={setDMList} emojis={emojis} showMenu={showMenu} setShowMenu={setShowMenu} username={props.username} isMobile={isMobile}/>
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
                            <Menu channel={channel} setChannel={setChannel} globalList={globalList} DMList={DMList} setDMList={setDMList} emojis={emojis} showMenu={showMenu} setShowMenu={setShowMenu} username={props.username} isMobile={isMobile}/>
                        </div>
                        <div className="bg-zinc-900 h-screen border-l-2 border-gray-700">
                            <Messages channel={channel} emojis={emojis} messages={messages} username={props.username} showMenu={showMenu} messagesRef={updateMessagesRef}/>
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
                    <Messages channel={channel} emojis={emojis} messages={messages} username={props.username} showMenu={showMenu} messagesRef={updateMessagesRef}/>
                </div>
                <Footer/>
            </div>
        );
    }
}
export default Chat;