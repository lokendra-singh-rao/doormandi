import { addDoc, collection, onSnapshot, query, serverTimestamp, orderBy, where, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export const fetchChatrooms = async ({ userId, setChatrooms }) => {
  const q = query(collection(db, "Chatrooms"), where("members", "array-contains", userId), orderBy("lastMessage.sentAt", "desc"));

  onSnapshot(
    q,
    (snapshot) => {
      const fetchedChatrooms = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setChatrooms(fetchedChatrooms);      
    },
    (error) => {
      console.error("Error fetching chatrooms: ", error);
    }
  );
};

export const fetchMessages = ({ chatroomId, setMessages }) => {
  console.log("Fetching messages for chatroom: ", chatroomId);

  const q = query(collection(db, "Chatrooms", chatroomId, "Messages"), orderBy("createdAt", "asc"));

  onSnapshot(
    q,
    (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messages);
    },
    (error) => {
      console.error("Error fetching messages: ", error);
    }
  );
};

export const createChatroom = async () => {
  console.log("Creating chatroom");
  const chatroom = {
    members: ["123", "999"],
    createdAt: serverTimestamp(),
    fromId: "123",
    toId: "369",
    lastMessage: {
      text: "Hello, this is first message from user 999",
      sentAt: serverTimestamp(),
      senderId: "123",
    },
    fromName: "User 123",
    toName: "User 369",
  };

  try {
    const docRef = await addDoc(collection(db, "Chatrooms"), chatroom);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const sendMessage = async ({ chatroomId, fromId, message, mediaUrl = "", mediaType = "", mediaThumbnail = "", starredBy = [], repliedTo = "", readInfo = { status: false, date: null }, createdAt = serverTimestamp(), isEdited = false, editedAt = null, isDeleted = false, deletedAt = null }) => {
  const newMessage = {
    fromId,
    message,
    mediaUrl,
    mediaType,
    mediaThumbnail,
    starredBy,
    repliedTo,
    readInfo,
    createdAt,
    isEdited,
    editedAt,
    isDeleted,
    deletedAt,
  };

  try {
    const messageRef = await addDoc(collection(db, "Chatrooms", chatroomId, "Messages"), newMessage);
    console.log("Message sent with ID: ", messageRef.id);

    const chatroomRef = doc(db, "Chatrooms", chatroomId);
    const lastMessage = {
      text: message,
      sentAt: createdAt,
      senderId: fromId,
    };

    await updateDoc(chatroomRef, {
      lastMessage,
    });
  } catch (e) {
    console.error("Error sending message: ", e);
  }
};

export const editMessage = async ({ chatroomId, messageId, newContent, fromId }) => {
  const messageRef = doc(db, "Chatrooms", chatroomId, "Messages", messageId);

  try {
    await updateDoc(messageRef, {
      message: newContent,
      isEdited: true,
      editedAt: serverTimestamp(),
    });
    console.log("Message edited with ID: ", messageId);

    const chatroomRef = doc(db, "Chatrooms", chatroomId);
    const lastMessage = {
      text: newContent,
      sentAt: serverTimestamp(),
      senderId: fromId,
    };

    await updateDoc(chatroomRef, {
      lastMessage,
    });
  } catch (e) {
    console.error("Error editing message: ", e);
  }
};

export const deleteMessage = async ({ chatroomId, messageId }) => {
  console.log("Deleting message in chatroom: ", chatroomId);
  const messageRef = doc(db, "Chatrooms", chatroomId, "Messages", messageId);

  try {
    const messageDoc = await getDoc(messageRef);
    if (messageDoc.exists()) {
      const messageData = messageDoc.data();
      const currentTime = new Date();
      const messageTime = messageData.createdAt.toDate();
      const timeDifference = (currentTime - messageTime) / (1000 * 60); // time difference in minutes

      if (timeDifference <= 15) {
        await updateDoc(messageRef, {
          message: "(This message is deleted)",
          isDeleted: true,
          deletedAt: serverTimestamp(),
        });
        console.log("Message marked as deleted with ID: ", messageId);
      } else {
        console.log("Cannot delete message after 15 minutes");
      }
    } else {
      console.log("No such message!");
    }
  } catch (e) {
    console.error("Error deleting message: ", e);
  }
};