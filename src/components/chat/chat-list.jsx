"use client";
import { createChatroom, fetchChatrooms, getArchievedChatrooms, getStarredChatrooms } from "@/actions/firebase-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatAvatar, formatDate } from "@/lib/utils";
import { Ellipsis, Filter, MessageCircleOff, Settings, Settings2, Sliders, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import Separator from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

const users = [
  {
    name: "Olivia Martin",
    email: "m@example.com",
    avatar: "/avatars/1.png",
    last_message: {
      body: "Hi, how can I help you today?",
      date: "Yesterday",
      unread_message_count: 1,
    },
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatar: "/avatars/3.png",
    last_message: {
      body: "Wohoo!",
      date: "Yesterday",
      unread_message_count: 0,
    },
  },
];

export const ChatList = ({ starredChatrooms, setStarredChatrooms, archievedChatrooms, setArchievedChatrooms, setMessages, setProfiles, filteredChatrooms, setFilteredChatrooms, chatrooms, setChatrooms, selectedChatroom, setSelectedChatroom, setShowProfileInfo, setMessagesLoading }) => {
  const userId = "123";
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [profileChatrooms, setProfileChatrooms] = useState([]);
  const [chatroomsCategory, setChatroomsCategory] = useState("all");

  const chatroomCategories = {
    all: "All Chats",
    unread: "Unread",
    starred: "Starred",
    archieved: "Archieved",
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      await fetchChatrooms({ userId, setChatrooms });
      await getArchievedChatrooms({ userId, setArchievedChatrooms });
      await getStarredChatrooms({ userId, setStarredChatrooms });
    })();

    setIsLoading(false);
  }, [setChatrooms, setProfiles]);

  useEffect(() => {
    if (chatroomsCategory === "all") {
      setFilteredChatrooms(chatrooms);
    } else if (chatroomsCategory === "starred") {
      setFilteredChatrooms(starredChatrooms);
    } else if (chatroomsCategory === "archieved") {
      setFilteredChatrooms(archievedChatrooms);
    }
  }, [chatroomsCategory, chatrooms, starredChatrooms, archievedChatrooms, setFilteredChatrooms]);

  useEffect(() => {
    setFilteredChatrooms(
      chatrooms?.filter((chatroom) => {
        if (JSON.stringify(chatroom).toLowerCase().includes(searchInput.toLowerCase().trim())) {
          return chatroom;
        }
      })
    );
  }, [chatrooms, searchInput, setFilteredChatrooms]);

  useEffect(() => {
    const newChatrooms = chatrooms?.filter((chatroom) => !profileChatrooms?.find((c) => c.id === chatroom.id));
    if (newChatrooms?.length > 0) {
      setProfileChatrooms((prev) => [...prev, ...newChatrooms]);
    }
  }, [chatrooms, filteredChatrooms]);

  useEffect(() => {
    profileChatrooms?.forEach(async (chatroom) => {
      if (chatroom.fromId === userId) {
        await fetchFreelancerProfile({ chatroomId: chatroom.id, userId: chatroom.toId });
      } else {
        await fetchClientProfile({ chatroomId: chatroom.id, userId: chatroom.fromId });
      }
    });
  }, [profileChatrooms]);

  const fetchClientProfile = async ({ chatroomId, userId }) => {
    const res = {
      name: "Client Name",
      memberSince: "January 2022",
      timezone: "GMT +5:30",
      image: "/avatars/1.png",
      location: "Metuchen, NJ",
      rating: 3.7,
    };
    setProfiles((prev) => ({ ...prev, [chatroomId]: res }));
  };

  const fetchFreelancerProfile = async ({ chatroomId, userId }) => {
    const res = {
      name: "Freelancer Name",
      memberSince: "September 2024",
      timezone: "GMT +8:30",
      image: "/avatars/1.png",
      location: "San Francisco, CA",
      rating: 4.5,
    };
    setProfiles((prev) => ({ ...prev, [chatroomId]: res }));
  };

  useEffect(() => {
    if (selectedChatroom?.id) {
      setSelectedChatroom((prev) => ({ ...prev, ...chatrooms?.filter((chatroom) => chatroom.id === selectedChatroom?.id)[0] }));
    }
  }, [chatrooms, selectedChatroom?.id]);

  return (
    <Card className="border-none shadow-none h-full">
      <CardHeader className="flex flex-row items-center px-4">
        <div className="font-semibold text-4xl flex items-center space-x-4">Messages</div>
        <Button size="icon" variant="outline" className="ml-auto rounded-full [&_svg]:size-5" onClick={() => createChatroom()}>
          <Ellipsis />
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        <form className="flex w-full items-center space-x-2 mb-4 px-4">
          <Input placeholder="Search chats..." className="flex-1 py-4" autoComplete="off" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="link" className="rounded-full [&_svg]:size-5">
                <SlidersHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Select conversation type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked={chatroomsCategory === "all"} onCheckedChange={() => setChatroomsCategory("all")}>
                All Chats
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={chatroomsCategory === "unread"} onCheckedChange={() => setChatroomsCategory("unread")}>
                Unread
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={chatroomsCategory === "starred"} onCheckedChange={() => setChatroomsCategory("starred")}>
                Starred
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={chatroomsCategory === "archieved"} onCheckedChange={() => setChatroomsCategory("archieved")}>
                Archieved
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </form>
        <Tabs defaultValue="all" className="mx-4">
          <TabsList className="grid w-full grid-cols-1 h-10">
            <TabsTrigger value="all" className="text-base">
              {chatroomCategories[chatroomsCategory]}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ScrollArea className="h-[calc(100vh-312px)]">
              {filteredChatrooms === null || isLoading ? (
                [...Array(6)].map((_, index) => (
                  <div key={index}>
                    <div className={cn("group relative flex cursor-pointer items-center gap-2 py-3 px-2 hover:bg-muted/50")}>
                      <Skeleton className="min-h-10 min-w-10 rounded-full" />
                      <div className="min-w-0 flex-grow">
                        <div className="flex justify-between flex-col gap-2">
                          <Skeleton className="h-4 w-[120px] lg:w-[180px]" />
                          <Skeleton className="h-3 w-[180px] lg:w-[220px]" />
                        </div>
                      </div>
                    </div>
                    {2 != index && <Separator />}
                  </div>
                ))
              ) : filteredChatrooms?.length === 0 ? (
                <div className="text-center text-muted-foreground pt-16 text-lg">No chats found</div>
              ) : (
                filteredChatrooms?.map((chatroom, index) => (
                  <div key={chatroom.id}>
                    <div
                      onClick={() => {
                        setMessages([]);
                        setMessagesLoading(true);
                        setShowProfileInfo(false);
                        setSelectedChatroom(chatroom);
                      }}
                      className={cn("group relative flex min-w-0 cursor-pointer items-center gap-2 py-3 px-2 hover:bg-muted/50", chatroom.id === selectedChatroom?.id && "bg-[#e4edfd] hover:bg-[#e4edfd]")}
                    >
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="font-semibold text-gray-600">{formatAvatar({ name: chatroom.fromId == userId ? chatroom.toName : chatroom.fromName })}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-grow">
                        <div className="flex justify-between">
                          <span className="text-base font-medium text-gray-800">{chatroom.fromId == userId ? chatroom.toName : chatroom.fromName}</span>
                          <span className="text-xs text-muted-foreground">{chatroom.lastMessage.sentAt?.seconds ? formatDate({ timestamp: chatroom.lastMessage.sentAt?.seconds }) : "Sending..."}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="truncate text-start text-sm text-muted-foreground">
                            {chatroom.lastMessage.isDeleted ? (
                              <p className="text-md break-words flex gap-1.5 items-center">
                                <MessageCircleOff size={16} />
                                <i>{chatroom.lastMessage.text}</i>
                              </p>
                            ) : (
                              chatroom.lastMessage.text
                            )}
                          </span>
                          {chatroom.lastMessage.unreadCount && <div className="ms-auto flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500 dark:bg-green-800 text-xs text-white">{chatroom.lastMessage.unreadCount}</div>}
                        </div>
                      </div>
                    </div>
                    {chatrooms.length - 1 != index && <Separator />}
                  </div>
                ))
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
