import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, doc, setDoc, getDocs, getDoc } from "firebase/firestore";
import { useState } from 'react';
import { useEffect } from 'react';

import ChatMessage from '../Components/ChatMessage';

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

    // let [messages, setMessages] = useState([])
    // const messagesRef = collection(db, 'messages');
    // const q = query(messagesRef);
    // useEffect(() => {
    //     getDocs(q).then(response => {
    //         response.forEach((msg) => {
    //             if (!(hash.has(msg.id))) {
    //                 hash.add(msg.id)
    //                 setMessages(messages.concat(msg))
    //             }
    //         })
    //     })
    // })

    return (
        <div>
            <h1>Chat</h1>
            <h2>Hello {props.username}</h2>
            <button onClick={() => props.update(false)}>Log Out Button</button>
            <div>
                {messages && messages.map(msg => <ChatMessage key={msg.id} sentTo={msg.sentTo} sentBy={msg.sentBy} text={msg.text}/>)}
            </div>
        </div>
    );
}
export default Chat;