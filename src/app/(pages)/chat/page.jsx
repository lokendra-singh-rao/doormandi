"use client";

import { ChatList } from "@/components/chat/chat-list";
import { ChatRoom } from "@/components/chat/chatroom";
import { ProfileInfo } from "@/components/chat/profile-info";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useState } from "react";

export default function Home() {
  const [chatrooms, setChatrooms] = useState(null);
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [filteredChatrooms, setFilteredChatrooms] = useState(null);
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [profiles, setProfiles] = useState({});

  return (
    <main className="h-[86.5vh] 2xl:px-32">
      <ResizablePanelGroup direction="horizontal" className="rounded-lg border-none">
        <ResizablePanel defaultSize={showProfileInfo ? 30 : 20} maxSize={showProfileInfo ? 30 : 22.5} minSize={showProfileInfo ? 30 : 20} className={`${selectedChatroom ? "hidden lg:block" : "block"}`}>
          <ChatList profiles={profiles} setProfiles={setProfiles} filteredChatrooms={filteredChatrooms} setFilteredChatrooms={setFilteredChatrooms} chatrooms={chatrooms} setChatrooms={setChatrooms} selectedChatroom={selectedChatroom} setSelectedChatroom={setSelectedChatroom} setShowProfileInfo={setShowProfileInfo} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70} className={`${selectedChatroom ? (showProfileInfo ? "hidden md:block" : "block") : "hidden lg:block"}`}>
          <ChatRoom profiles={profiles} setProfiles={setProfiles} selectedChatroom={selectedChatroom} setSelectedChatroom={setSelectedChatroom} isAtBottom={isAtBottom} setIsAtBottom={setIsAtBottom} showProfileInfo={showProfileInfo} setShowProfileInfo={setShowProfileInfo} />
        </ResizablePanel>
        <ResizableHandle unselectable="true" className={`${showProfileInfo && selectedChatroom ? "block" : "hidden"}`}/>
        <ResizablePanel defaultSize={30} minSize={30} maxSize={30} className={`${showProfileInfo && selectedChatroom ? "block" : "hidden"}`}>
          <ProfileInfo profiles={profiles} setShowProfileInfo={setShowProfileInfo} selectedChatroom={selectedChatroom}/>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
