import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where, writeBatch } from "firebase/firestore";
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

export const fetchMessages = async ({ chatroomId, setMessages }) => {
  if (!chatroomId) return;

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
      readStatus: false,
      isDeleted: false,
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

export const sendMessage = async ({ chatroomId, fromId, message, mediaUrl = "", mediaType = "", mediaThumbnail = "", starredBy = [], repliedTo = { message: "", id: "", fromId: "" }, readInfo = { status: false, date: null }, createdAt = serverTimestamp(), isEdited = false, editedAt = null, isDeleted = false, deletedAt = null }) => {
  if (!chatroomId) return;

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
      messageId: messageRef.id,
      readStatus: false,
      isDeleted: false,
    };

    await updateDoc(chatroomRef, {
      lastMessage,
    });
  } catch (e) {
    console.error("Error sending message: ", e);
  }
};

export const editMessage = async ({ selectedChatroom, messageId, newContent }) => {
  if (!selectedChatroom) return;

  const messageRef = doc(db, "Chatrooms", selectedChatroom?.id, "Messages", messageId);

  try {
    await updateDoc(messageRef, {
      message: newContent,
      isEdited: true,
      readInfo: {
        status: false,
        date: null,
      },
      editedAt: serverTimestamp(),
    });
    console.log("Selected chatroom: ", selectedChatroom);

    if (selectedChatroom?.lastMessage?.messageId === messageId) {
      const chatroomRef = doc(db, "Chatrooms", selectedChatroom?.id);
      await updateDoc(chatroomRef, {
        lastMessage: {
          ...selectedChatroom?.lastMessage,
          text: newContent,
          readStatus: false,
          isDeleted: false,
        },
      });
    }
    console.log("Message edited with ID: ", messageId);
  } catch (e) {
    console.error("Error editing message: ", e);
  }
};

export const deleteMessage = async ({ selectedChatroom, messageId }) => {
  if (!selectedChatroom) return;

  const messageRef = doc(db, "Chatrooms", selectedChatroom.id, "Messages", messageId);

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

        if (selectedChatroom.lastMessage.messageId === messageId) {
          const chatroomRef = doc(db, "Chatrooms", selectedChatroom.id);
          await updateDoc(chatroomRef, {
            lastMessage: {
              ...selectedChatroom.lastMessage,
              text: "(This message is deleted)",
              readStatus: false,
              isDeleted: true,
            },
          });
        }
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

// Function to mark messages as read
export const markMessagesAsRead = async ({ selectedChatroom, currentUserId }) => {
  try {
    if (!selectedChatroom) return;

    const messagesRef = collection(db, "Chatrooms", selectedChatroom.id, "Messages");

    const unreadMessagesQuery = query(messagesRef, where("fromId", "!=", currentUserId), where("readInfo.status", "==", false));

    const querySnapshot = await getDocs(unreadMessagesQuery);

    if (querySnapshot?.empty) {
      console.log("No unread messages found.");
      return;
    }

    const batch = writeBatch(db);

    querySnapshot.forEach((messageDoc) => {
      const messageRef = doc(messagesRef, messageDoc.id);
      batch.update(messageRef, {
        readInfo: {
          status: true,
          date: serverTimestamp(),
        },
      });
    });

    batch.commit();

    console.log("Messages marked as read successfully.");
  } catch (error) {
    console.error("Error marking messages as read:", error);
  }
};

export const markChatroomAsArchived = async ({ selectedChatroom, userId }) => {
  if (!selectedChatroom) return;

  const chatroomRef = doc(db, "Chatrooms", selectedChatroom?.id);
  try {
    await updateDoc(chatroomRef, {
      archievedBy: [...selectedChatroom.archievedBy, userId],
    });
    console.log("Chatroom archived successfully.");
  } catch (e) {
    console.error("Error archiving chatroom: ", e);
  }
};

export const markChatroomAsUnarchived = async ({ selectedChatroom, userId }) => {
  if (!selectedChatroom) return;

  const chatroomRef = doc(db, "Chatrooms", selectedChatroom?.id);
  try {
    await updateDoc(chatroomRef, {
      archievedBy: selectedChatroom.archievedBy.filter((id) => id !== userId),
    });
    console.log("Chatroom unarchived successfully.");
  } catch (e) {
    console.error("Error unarchiving chatroom: ", e);
  }
}

export const getArchievedChatrooms = async ({ userId, setArchievedChatrooms }) => {
  const q = query(collection(db, "Chatrooms"), where("archievedBy", "array-contains", userId), orderBy("lastMessage.sentAt", "desc"));

  onSnapshot(
    q,
    (snapshot) => {
      const fetchedChatrooms = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setArchievedChatrooms(fetchedChatrooms);
    },
    (error) => {
      console.error("Error fetching archieved chatrooms: ", error);
    }
  );
};

export const markChatroomAsStarred = async ({ selectedChatroom, userId }) => {
  if (!selectedChatroom) return;

  const chatroomRef = doc(db, "Chatrooms", selectedChatroom?.id);
  try {
    await updateDoc(chatroomRef, {
      starredBy: [...selectedChatroom.starredBy, userId],
    });
    console.log("Chatroom starred successfully.");
  } catch (e) {
    console.error("Error starring chatroom: ", e);
  }
};

export const markChatroomAsUnstarred = async ({ selectedChatroom, userId }) => {
  if (!selectedChatroom) return;

  const chatroomRef = doc(db, "Chatrooms", selectedChatroom?.id);
  try {
    await updateDoc(chatroomRef, {
      starredBy: selectedChatroom.starredBy.filter((id) => id !== userId),
    });
    console.log("Chatroom unstarred successfully.");
  } catch (e) {
    console.error("Error unstarring chatroom: ", e);
  }
};

export const getStarredChatrooms = async ({ userId, setStarredChatrooms }) => {
  const q = query(collection(db, "Chatrooms"), where("starredBy", "array-contains", userId), orderBy("lastMessage.sentAt", "desc"));

  onSnapshot(
    q,
    (snapshot) => {
      const fetchedChatrooms = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setStarredChatrooms(fetchedChatrooms);
    },
    (error) => {
      console.error("Error fetching starred chatrooms: ", error);
    }
  );
}
