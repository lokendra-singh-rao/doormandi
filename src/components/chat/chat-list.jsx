"use client";
import { createChatroom, fetchChatrooms, markChatroomAsArchived, markChatroomAsStarred, markChatroomAsUnarchived, markChatroomAsUnstarred } from "@/actions/firebase-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatAvatar, formatDate } from "@/lib/utils";
import { Archive, ArchiveRestore, Ellipsis, Filter, Heart, HeartCrack, HeartIcon, ListFilter, MessageCircleOff, MessageSquareDot, Star, X } from "lucide-react";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Separator from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { Badge } from "../ui/badge";

const categoryIcons = {
  all: <Filter size={20} />,
  unread: <MessageSquareDot size={20} />,
  starred: <Star size={20} />,
  archived: <Archive size={20} />,
};

export const ChatList = ({ unreadChatrooms, setUnreadChatrooms, starredChatrooms, setStarredChatrooms, archivedChatrooms, setArchivedChatrooms, setMessages, setProfiles, filteredChatrooms, setFilteredChatrooms, chatrooms, setChatrooms, selectedChatroom, setSelectedChatroom, setShowProfileInfo, setMessagesLoading }) => {
  const userId = "123";
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [profileChatrooms, setProfileChatrooms] = useState([]);
  const [chatroomsCategory, setChatroomsCategory] = useState("all");

  const chatroomCategories = {
    all: "All Chats",
    unread: "Unread",
    starred: "Starred",
    archived: "Archived",
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      await fetchChatrooms({ userId, setChatrooms, setArchivedChatrooms, setStarredChatrooms, setUnreadChatrooms });
    })();

    setIsLoading(false);
  }, [setChatrooms, setUnreadChatrooms, setArchivedChatrooms, setStarredChatrooms]);

  useEffect(() => {
    if (chatroomsCategory === "all") {
      setFilteredChatrooms(
        chatrooms?.filter((chatroom) => {
          if (JSON.stringify(chatroom).toLowerCase().includes(searchInput.toLowerCase().trim())) {
            return chatroom;
          }
        })
      );
    } else if (chatroomsCategory === "starred") {
      setFilteredChatrooms(
        starredChatrooms?.filter((chatroom) => {
          if (JSON.stringify(chatroom).toLowerCase().includes(searchInput.toLowerCase().trim())) {
            return chatroom;
          }
        })
      );
    } else if (chatroomsCategory === "archived") {
      setFilteredChatrooms(
        archivedChatrooms?.filter((chatroom) => {
          if (JSON.stringify(chatroom).toLowerCase().includes(searchInput.toLowerCase().trim())) {
            return chatroom;
          }
        })
      );
    } else if (chatroomsCategory === "unread") {
      setFilteredChatrooms(
        unreadChatrooms?.filter((chatroom) => {
          if (JSON.stringify(chatroom).toLowerCase().includes(searchInput.toLowerCase().trim())) {
            return chatroom;
          }
        })
      );
    }
  }, [chatroomsCategory, chatrooms, starredChatrooms, archivedChatrooms, unreadChatrooms, setFilteredChatrooms, setUnreadChatrooms, setArchivedChatrooms, setStarredChatrooms, searchInput]);

  useEffect(() => {}, [chatrooms, searchInput, setFilteredChatrooms]);

  useEffect(() => {
    const newChatrooms = chatrooms?.filter((chatroom) => !profileChatrooms?.find((c) => c.id === chatroom.id));
    if (newChatrooms?.length > 0) {
      setProfileChatrooms((prev) => [...prev, ...newChatrooms]);
    }
  }, [chatrooms, filteredChatrooms, setProfileChatrooms]);

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
              <Button size="icon" variant="ghost" className="rounded-full [&_svg]:size-5">
                <ListFilter />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44">
              <DropdownMenuLabel>Filter conversation type</DropdownMenuLabel>
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
              <DropdownMenuCheckboxItem checked={chatroomsCategory === "archived"} onCheckedChange={() => setChatroomsCategory("archived")}>
                Archived
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </form>
        <Tabs defaultValue="all" className="mx-4">
          {chatroomsCategory !== "all" && (
            <TabsList className="w-full p-0">
              <TabsTrigger value="all" className="w-full data-[state=active]:shadow-none data-[state=active]:bg-none text-lg flex px-0 justify-between items-center cursor-default">
                <div className="flex gap-2 items-center justify-center text-xl">
                  {categoryIcons[chatroomsCategory]} {chatroomCategories[chatroomsCategory]}
                </div>
                <Button size="icon" variant="link" className="rounded-full [&_svg]:size-6" onClick={() => setChatroomsCategory("all")}>
                  <X />
                </Button>
              </TabsTrigger>
            </TabsList>
          )}
          <TabsContent value="all">
            <ScrollArea className={cn("h-[calc(100vh-300px)]", chatroomsCategory === "all" && "h-[calc(100vh-255px)]")}>
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
                    <ContextMenu>
                      <ContextMenuTrigger>
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
                            <div className="flex items-center gap-2 justify-between">
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
                              <div className="flex items-center gap-2">
                              {chatroom?.starredBy?.includes(userId) && <HeartIcon size={18} fill="#f00d" color="#f00d"/>}
                                {chatroom.archivedBy?.includes(userId) && <Badge variant="secondary">Archived</Badge>}
                                {<Button className="h-4 w-4 bg-green-500 rounded-full p-2.5">4</Button>}</div>
                            </div>
                          </div>
                        </div>
                      </ContextMenuTrigger>
                      <ContextMenuContent>
                        {!(chatroomsCategory === "archived") &&
                          (chatroom?.starredBy?.includes(userId) ? (
                            <ContextMenuItem className="gap-2" onClick={() => markChatroomAsUnstarred({ selectedChatroom: chatroom, userId })}>
                              <HeartCrack size={18} />
                              <div>Remove from Favourites</div>
                            </ContextMenuItem>
                          ) : (
                            <ContextMenuItem className="gap-2" onClick={() => markChatroomAsStarred({ selectedChatroom: chatroom, userId })}>
                              <Heart size={18} />
                              <div>Add to Favourites</div>
                            </ContextMenuItem>
                          ))}
                        {chatroom?.archivedBy?.includes(userId) ? (
                          <ContextMenuItem className="gap-2" onClick={() => markChatroomAsUnarchived({ selectedChatroom: chatroom, userId })}>
                            <ArchiveRestore size={18} />
                            <div>Unarchive</div>
                          </ContextMenuItem>
                        ) : (
                          <ContextMenuItem className="gap-2" onClick={() => markChatroomAsArchived({ selectedChatroom: chatroom, userId })}>
                            <Archive size={18} />
                            <div>Archive</div>
                          </ContextMenuItem>
                        )}
                        {selectedChatroom?.id === chatroom?.id && (
                          <ContextMenuItem className="gap-2" onClick={() => setSelectedChatroom(null)}>
                            <X size={18} />
                            <div>Close Chat</div>
                          </ContextMenuItem>
                        )}
                      </ContextMenuContent>
                    </ContextMenu>

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
