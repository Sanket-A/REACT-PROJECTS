import React, { useState, useEffect } from 'react';
import { useUserStore} from "../../../lib/userStore";
import AddUser from './addUser/AddUser';
import { db } from '../../../lib/firebase';
import {doc, getDoc, onSnapshot} from "firebase/firestore"
import "./chatList.css";

const ChatList = () => {
    const [addMode, setAddMode] =useState(false)
    const [chats, setChats] = useState([])

    const { currentUser} = useUserStore()
        useEffect(()=>{
const unSub = onSnapshot(doc(db, "userchats",currentUser.id), async (res) =>{
   const items = res.data().chats;
const promises = items.map(async (item) => {
 const userDocRef = doc(db, "users", item.receiverId);
 const userDocSnap = await getDoc(userDocRef) 

 const user = userDocSnap.data()
 return{...item, user}
})
const chatData = await Promise.all(promises)
setChats(chatData.sort((a, b)=>b.updateAt - a.updateAt));
});
  
return () =>{
    unSub()
}
    }, [currentUser.id])
 

  return (
   <div className="chatList">
    <div className="search">
        <div className="searchBar">
            <img src='/search.png' alt=''/>
            <input type='text' placeholder='Search'/>

        </div>
        <img src={addMode ? "./minus.png" : './plus.png'} className="add"  alt='' onClick={() => setAddMode(prev=> !prev)}/>
    </div>

    {chats.map(chat => (

    
    <div className="item" key={chat.chatId}>
<img src={
              chat.user.blocked.includes(currentUser.id)
                ? "./avatar.png"
                : chat.user.avatar || "./avatar.png"
            }
            alt=""/>
<div className="texts">
    <span>{chat.user.username}</span>
    <p> {chat.lastMessage} </p>cd
</div>
        
    </div>
    ))}
    
    {addMode && <AddUser/>}
   </div>
   
  )
}

export default ChatList