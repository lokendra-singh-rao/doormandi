"use client";
import { createChatroom, fetchChatrooms } from "@/actions/firebase-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatAvatar, formatDate } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import Separator from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

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

export const ChatList = ({ setProfiles, filteredChatrooms, setFilteredChatrooms, chatrooms, setChatrooms, selectedChatroom, setSelectedChatroom, setShowProfileInfo }) => {
  const userId = "123";
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [profileChatrooms, setProfileChatrooms] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    (async () => await fetchChatrooms({ userId, setChatrooms }))();
    setIsLoading(false);
  }, [setChatrooms, setProfiles]);

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
      setProfileChatrooms(prev => [...prev, ...newChatrooms]);
    }
  }, [chatrooms]);

  useEffect(() => {
    profileChatrooms?.forEach(async (chatroom) => {
      if (chatroom.fromId === userId) {
        await fetchFreelancerProfile({ chatroomId: chatroom.id, userId: chatroom.toId });
      } else {
        await fetchClientProfile({ chatroomId: chatroom.id, userId: chatroom.fromId });
      }
    })
  }, [profileChatrooms]);

  const fetchClientProfile = async ({chatroomId, userId}) => {
    const res = {
      name: "Client Name",
      memberSince: "January 2022",
      timezone: "GMT +5:30",
      image: "/avatars/1.png",
      location: "Metuchen, NJ",
      rating: 3.7,
    }
    setProfiles(prev => ({...prev, [chatroomId]: res}));
  }

  const fetchFreelancerProfile = async ({chatroomId, userId}) => {
    const res = {
      name: "Freelancer Name",
      memberSince: "September 2024",
      timezone: "GMT +8:30",
      image: "/avatars/1.png",
      location: "San Francisco, CA",
      rating: 4.5,
    }
    setProfiles(prev => ({...prev, [chatroomId]: res}));
  }

  return (
    <Card className="border-none shadow-none h-full">
      <CardHeader className="flex flex-row items-center px-4">
        <div className="font-semibold text-4xl flex items-center space-x-4">Messages</div>
        <Button size="icon" variant="outline" className="ml-auto rounded-full" onClick={() => createChatroom()}>
          <Ellipsis className="size-5" />
        </Button>
      </CardHeader>
      <CardContent className="px-0">
        <form className="flex w-full items-center space-x-2 mb-4 px-4">
          <Input placeholder="Search chats..." className="flex-1 py-5" autoComplete="off" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        </form>
        <Tabs defaultValue="all" className="mx-4">
          <TabsList className="grid w-full grid-cols-2 h-10">
            <TabsTrigger value="all" className="text-base">
              All Chats
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-base">
              Unread
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ScrollArea className="h-[calc(100vh-312px)]">
              {filteredChatrooms === null || isLoading ? (
                [...Array(6)].map((_, index) => (
                  <div key={index}>
                    <div className={cn("group relative flex min-w-0 cursor-pointer items-center gap-2 py-3 px-2 hover:bg-muted/50")}>
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="min-w-0 flex-grow">
                        <div className="flex justify-between flex-col gap-2">
                          <Skeleton className="h-4 w-[250px]" />
                          <Skeleton className="h-3 w-[300px]" />
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
                        setShowProfileInfo(false);
                        setSelectedChatroom(chatroom);
                      }}
                      className={cn("group relative flex min-w-0 cursor-pointer items-center  gap-2 py-3 px-2 hover:bg-muted/50", chatroom.id === selectedChatroom?.id && "bg-blue-200 hover:bg-blue-200")}
                    >
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="font-semibold">{formatAvatar({ name: chatroom.fromId == userId ? chatroom.toName : chatroom.fromName })}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-grow">
                        <div className="flex justify-between">
                          <span className="text-base font-medium">{chatroom.fromId == userId ? chatroom.toName : chatroom.fromName}</span>
                          <span className="text-xs text-muted-foreground">{chatroom.lastMessage.sentAt?.seconds ? formatDate({ timestamp: chatroom.lastMessage.sentAt?.seconds }) : "Sending..."}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="truncate text-start text-sm text-muted-foreground">{chatroom.lastMessage.text}</span>
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
          <TabsContent value="unread">
            <ScrollArea className="h-screen">
              <div className="divide-y">
                {users.slice(0, 3).map((user, index) => (
                  <div key={index} className="group relative flex min-w-0 cursor-pointer items-center gap-2 px-6 py-3 hover:bg-muted/50">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>TB</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-grow">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">Yesterday</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="truncate text-start text-sm text-muted-foreground">{user.last_message.body}</span>
                        {user.last_message.unread_message_count ? <div className="ms-auto flex size-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500 dark:bg-green-800 text-xs text-white">{user.last_message.unread_message_count}</div> : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
