"use client";

import { ChatList } from "@/components/chat/chat-list";
import { ChatRoom } from "@/components/chat/chatroom";
import { ProfileInfo } from "@/components/chat/profile-info";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useState } from "react";

export default function Home() {
  const [chatrooms, setChatrooms] = useState(null);
  const [archivedChatrooms, setArchivedChatrooms] = useState(null);
  const [starredChatrooms, setStarredChatrooms] = useState(null);
  const [unreadChatrooms, setUnreadChatrooms] = useState(null);
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [filteredChatrooms, setFilteredChatrooms] = useState(null);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [profiles, setProfiles] = useState({});
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [isFirstScroll, setIsFirstScroll] = useState(false);
  const [files, setFiles] = useState([]);

  const handleChatroomClose = () => {
    setMessages([]);
    setMessagesLoading(true);
    setShowProfileInfo(false);
    setSelectedChatroom(null);
    setFiles([]);
  };

  return (
    <main className="h-[100vh] 2xl:px-32">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg border-none">
        <ResizablePanel defaultSize={showProfileInfo ? 25 : 25} maxSize={showProfileInfo ? 25 : 30} minSize={showProfileInfo ? 25 : 25} className={`${selectedChatroom ? "hidden lg:block" : "block"}`}>
          <ChatList handleChatroomClose={handleChatroomClose} setIsFirstScroll={setIsFirstScroll} setFiles={setFiles} unreadChatrooms={unreadChatrooms} setUnreadChatrooms={setUnreadChatrooms} starredChatrooms={starredChatrooms} setStarredChatrooms={setStarredChatrooms} archivedChatrooms={archivedChatrooms} setArchivedChatrooms={setArchivedChatrooms} profiles={profiles} setMessagesLoading={setMessagesLoading} setMessages={setMessages} setProfiles={setProfiles} filteredChatrooms={filteredChatrooms} setFilteredChatrooms={setFilteredChatrooms} chatrooms={chatrooms} setChatrooms={setChatrooms} selectedChatroom={selectedChatroom} setSelectedChatroom={setSelectedChatroom} setShowProfileInfo={setShowProfileInfo} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75} className={`${selectedChatroom ? (showProfileInfo ? "hidden md:block" : "block") : "hidden lg:block"}`}>
          <ChatRoom files={files} setFiles={setFiles} handleChatroomClose={handleChatroomClose} isFirstScroll={isFirstScroll} setIsFirstScroll={setIsFirstScroll} messagesLoading={messagesLoading} setMessagesLoading={setMessagesLoading} messages={messages} setMessages={setMessages} profiles={profiles} setProfiles={setProfiles} selectedChatroom={selectedChatroom} setSelectedChatroom={setSelectedChatroom} isAtBottom={isAtBottom} setIsAtBottom={setIsAtBottom} showProfileInfo={showProfileInfo} setShowProfileInfo={setShowProfileInfo} />
        </ResizablePanel>
        <ResizableHandle unselectable="true" className={`${showProfileInfo && selectedChatroom ? "block" : "hidden"}`} />
        {showProfileInfo && (
          <ResizablePanel defaultSize={30} minSize={30} maxSize={30} className={`${showProfileInfo && selectedChatroom ? "block" : "hidden"}`}>
            <ProfileInfo profiles={profiles} setShowProfileInfo={setShowProfileInfo} selectedChatroom={selectedChatroom} />
          </ResizablePanel>
        )}
      </ResizablePanelGroup>
    </main>
  );
}
