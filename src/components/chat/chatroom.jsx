import { deleteMessage, editMessage, fetchMessages, markMessagesAsRead, sendMessage } from "@/actions/firebase-actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatDate } from "@/lib/utils";
import EmojiPicker from "emoji-picker-react";
import { ArrowDown, ArrowLeft, CalendarPlus, CheckCheck, Copy, EllipsisVerticalIcon, MessageCircleOff, PanelRightClose, PanelRightOpen, Pencil, PencilIcon, PlusCircle, Send, Smile, Star, Trash, Undo, Video, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Separator from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Skeleton } from "../ui/skeleton";

export const ChatRoom = ({ messagesLoading, setMessagesLoading, selectedChatroom, setSelectedChatroom, showProfileInfo, setShowProfileInfo, messages, setMessages }) => {
  const [editActive, setEditActive] = useState(false);
  const [replyActive, setReplyActive] = useState(false);
  const [editMessageRef, setEditMessageRef] = useState(null);
  const [replyMessageRef, setReplyMessageRef] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [highlightedMessage, setHighlightedMessage] = useState(null);

  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);
  const messageRefs = useRef({});
  const userId = "123";

  const isRecentMessage = ({ createdAtSeconds }) => {
    const FIFTEEN_MINUTES_IN_SECONDS = 15 * 60;
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    return currentTimeInSeconds - createdAtSeconds < FIFTEEN_MINUTES_IN_SECONDS;
  };

  const handleEditMessage = ({ message }) => {
    setEditActive(true);
    setInputMessage(message.message);
    setEditMessageRef(message);
  };

  const handleReplyMessage = ({ message }) => {
    setReplyActive(true);
    setReplyMessageRef(message);
  };

  const scrollToBottom = (behavior = "smooth") => {
    scrollAreaRef?.current?.scrollIntoView({ behavior, block: "end" });
  };

  const handleCopyToClipboard = ({ content }) => {
    navigator.clipboard.writeText(content);
  };

  const toggleShowProfile = () => {
    setShowProfileInfo((prev) => !prev);
  };

  useEffect(() => {
    if (editActive) {
      inputRef.current.focus();
    }
  }, [editActive]);

  useEffect(() => {
    setMessagesLoading(true);
    if (selectedChatroom) {
      async function fetchData() {
        await fetchMessages({ chatroomId: selectedChatroom?.id, setMessages });
      }
      fetchData();
    }
    setMessagesLoading(false);
  }, [selectedChatroom]);

  useEffect(() => {
    scrollToBottom("instant");
    markMessagesAsRead({ selectedChatroom, currentUserId: userId });
  }, [messages]);

  if (!selectedChatroom) {
    return (
      <Card className="mx-auto h-full border-none shadow-none flex flex-col items-center justify-center">
        <CardContent>
          <p className="text-2xl text-muted-foreground">Select a chat to start messaging</p>
        </CardContent>
      </Card>
    );
  }

  const formatMessageForEditOrReply = ({ message, trimLength = 120 }) => {
    return message.split("\n").length > 2 ? message.split("\n")[0] + "\n" + message.split("\n")[1] + "..." : message.length > trimLength ? message.slice(0, trimLength) + "..." : message;
  };

  // Function to scroll to a specific message
  const scrollToMessage = ({ messageId }) => {
    if (messageRefs?.current[messageId]) {
      messageRefs?.current[messageId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setTimeout(() => {
        setHighlightedMessage(messageId);
      }, 300);

      setTimeout(() => {
        setHighlightedMessage(null);
      }, 1500);
    }
  };

  return (
    <Card className="mx-auto h-full border-none shadow-none">
      <CardContent className="relative flex flex-col justify-between p-0 h-full">
        <CardHeader className="flex flex-row items-center justify-between shadow-sm py-3 px-4">
          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex lg:hidden mr-4"
                    onClick={() => {
                      setMessages([]);
                      setMessagesLoading(true);
                      setShowProfileInfo(false);
                      setSelectedChatroom(null);
                    }}
                  >
                    <ArrowLeft className="text-[#00203f]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-base">Back to Chats</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="font-medium leading-none text-2xl">{selectedChatroom.fromId === userId ? selectedChatroom.toName : selectedChatroom.fromName}</div>
          </div>
          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Button variant={"outline"} size={"icon"} className="[&_svg]:size-5 p-5 rounded-full">
                    <CalendarPlus className="text-[#00203f]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-base">Schedule a Meeting</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Button variant={"outline"} size={"icon"} className="[&_svg]:size-5 p-5 rounded-full">
                    <Video className="text-[#00203f]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-base">Initiate a Call</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Button variant={"outline"} size={"icon"} onClick={toggleShowProfile} className="[&_svg]:size-5 p-5 rounded-full">
                    {showProfileInfo ? <PanelRightClose className="text-[#00203f]" /> : <PanelRightOpen className="text-[#00203f]" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{showProfileInfo ? <p className="text-base">Close Sidebar</p> : <p className="text-base">Open Sidebar</p>}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <ContextMenu>
          <ContextMenuTrigger className="flex-1 relative">
            <ScrollArea className="p-0 h-[calc(100vh-280px)]">
              <div className="space-y-4 py-2">
                <Separator text="Chat initiated" className="px-2" />
                <div className="space-y-4 px-3" ref={scrollAreaRef}>
                  {messagesLoading ? (
                    <React.Fragment>
                      <div className="flex justify-start">
                        <Skeleton className="h-16 w-[47.5%] rounded-md rounded-tl-none" />
                      </div>
                      <div className="flex justify-end">
                        <Skeleton className="h-12 w-[45%] rounded-md rounded-br-none" />
                      </div>
                      <div className="flex justify-end">
                        <Skeleton className="h-12 w-[35%] rounded-md rounded-br-none" />
                      </div>
                      <div className="flex justify-start">
                        <Skeleton className="h-14 w-[50%] rounded-md rounded-tl-none" />
                      </div>
                      <div className="flex justify-start">
                        <Skeleton className="h-10 w-[55%] rounded-md rounded-br-none" />
                      </div>
                      <div className="flex justify-end">
                        <Skeleton className="h-24 w-[50%] rounded-md rounded-br-none" />
                      </div>
                    </React.Fragment>
                  ) : (
                    messages.map((message) => (
                      <div key={message.id} ref={(el) => (messageRefs.current[message.id] = el)} className={cn("flex", message.fromId === userId && "flex-row-reverse")}>
                        <div className={cn("group flex flex-col", message.fromId === userId && "items-end")}>
                          <div className={cn("px-3 py-2.5 rounded-md text-base transition-colors duration-500", message.fromId === userId ? "bg-[#2665d1] text-primary-foreground rounded-br-none" : "bg-muted rounded-bl-none", highlightedMessage === message.id ? "bg-blue-300" : "")}>
                            {message.isDeleted ? (
                              <div className={cn("flex items-center gap-2", message.fromId === userId ? "text-gray-200" : "text-gray-500")}>
                                <MessageCircleOff size={16} />
                                <p className="text-md break-words">
                                  <i>{message.message}</i>
                                </p>
                              </div>
                            ) : message?.repliedTo?.message ? (
                              <div className="flex flex-col min-w-24 max-w-[60vw]">
                                <div onClick={() => scrollToMessage({ messageId: message?.repliedTo?.id })} className="cursor-pointer w-full rounded-md bottom-full text-[10px] border-l-4 border-blue-300 flex justify-between bg-gray-200 items-center p-2">
                                  <div className="flex items-center gap-1">
                                    <div className="flex-1 flex flex-col text-sm">
                                      <span className="mr-2 font-medium text-primary">{message?.repliedTo?.fromId == userId ? "You" : selectedChatroom.fromId === userId ? selectedChatroom.toId : selectedChatroom.fromId}</span>
                                      <span style={{ overflowWrap: "anywhere" }} className="whitespace-pre-wrap text-muted-foreground">{formatMessageForEditOrReply({ message: message?.repliedTo?.message })}</span>
                                    </div>
                                  </div>
                                </div>
                                <p className={cn("whitespace-pre-wrap text-md")} style={{ overflowWrap: "anywhere" }}>
                                  {message.message}
                                </p>
                              </div>
                            ) : (
                              <p className="whitespace-pre-wrap text-md min-w-24 max-w-[60vw]" style={{ overflowWrap: "anywhere" }}>
                                {message.message}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">{message?.createdAt?.seconds ? `${message?.isEdited ? "(Edited)" : ""} ${formatDate({ timestamp: message?.createdAt?.seconds })}` : "Sending..."}</span>
                            {message.fromId === userId && (
                              <div className="text-xs text-muted-foreground">
                                {!message?.createdAt?.seconds && <Send className="h-3 w-3" />}
                                {message.readInfo.status === false && message?.createdAt?.seconds && <CheckCheck className="h-4 w-4" />}
                                {message.readInfo.status === true && message?.createdAt?.seconds && <CheckCheck className="h-4 w-4 text-blue-500" />}
                              </div>
                            )}
                          </div>
                        </div>
                        {!message.isDeleted && (
                          <div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="link" className="ml-auto">
                                  <EllipsisVerticalIcon className="size-5" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleReplyMessage({ message })}>
                                  <Undo /> Reply
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleCopyToClipboard({ content: message.message })}>
                                  <Copy /> Copy to Clipboard
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleCopyToClipboard({ content: message.message })}>
                                  <Star /> Star Message
                                </DropdownMenuItem>
                                {message.fromId === userId && isRecentMessage({ createdAtSeconds: message.createdAt?.seconds }) && (
                                  <DropdownMenuItem onClick={() => handleEditMessage({ message })}>
                                    <PencilIcon />
                                    Edit Message
                                  </DropdownMenuItem>
                                )}
                                {message.fromId === userId && isRecentMessage({ createdAtSeconds: message.createdAt?.seconds }) && (
                                  <DropdownMenuItem asChild>
                                    <AlertDialog>
                                      <AlertDialogTrigger className="w-full relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
                                        <Trash /> Delete Message
                                      </AlertDialogTrigger>
                                      <AlertDialogContent className="z-[1000]">
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Delete message?</AlertDialogTitle>
                                          <AlertDialogDescription>This action cannot be undone, and the deleted mark will still be visible in the chat.</AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction className={buttonVariants({ variant: "destructive" })} onClick={() => deleteMessage({ selectedChatroom, messageId: message.id })}>
                                            Delete
                                          </AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </ScrollArea>
            {false && (
              <Button variant="outline" size="icon" className="absolute bottom-5 left-8" onClick={() => {}}>
                <ArrowDown className="size-5" />
                <span className="sr-only">Scroll to bottom</span>
              </Button>
            )}
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={() => setSelectedChatroom(null)}>
              <X size={18} />
              &nbsp;Close Chat
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
        <CardFooter className="p-2 space-x-1 border-none">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button type="button" variant="ghost" size="icon" className="[&_svg]:size-5">
                <PlusCircle className="text-[#00203f]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Files</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Popover>
            <PopoverTrigger>
              <Button type="button" variant="ghost" size="icon" className="[&_svg]:size-5">
                <Smile className="text-[#00203f]" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="border-none shadow-none p-0">
              <EmojiPicker emojiStyle="native" className="sm:w-96 w-72" onEmojiClick={(e) => setInputMessage((prev) => prev + e.emoji)} />
            </PopoverContent>
          </Popover>
          <form
            className="flex w-full items-center space-x-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                return;
              } else if (e.key === "Enter") {
                e.preventDefault();
                if (inputMessage.trim().length <= 0) {
                  return;
                }
                scrollToBottom("smooth");
                if (editActive) {
                  setEditActive(false);
                  setEditMessageRef(null);
                  editMessage({ selectedChatroom, messageId: editMessageRef.id, newContent: inputMessage.trim() });
                } else if (replyActive) {
                  setReplyActive(false);
                  setReplyMessageRef(null);
                  sendMessage({ chatroomId: selectedChatroom.id, fromId: userId, message: inputMessage.trim(), repliedTo: { message: replyMessageRef.message, id: replyMessageRef.id, fromId: replyMessageRef.fromId } });
                } else {
                  sendMessage({ chatroomId: selectedChatroom.id, fromId: userId, message: inputMessage.trim() });
                }
                setInputMessage("");
              }
            }}
            onSubmit={(e) => {
              e.preventDefault();
              if (inputMessage.trim().length <= 0) {
                return;
              }
              scrollToBottom("smooth");
              if (editActive) {
                setEditActive(false);
                setEditMessageRef(null);
                editMessage({ chatroomId: selectedChatroom.id, messageId: editMessageRef.id, newContent: inputMessage.trim(), fromId: userId });
              } else if (replyActive) {
                setReplyActive(false);
                setReplyMessageRef(null);
                sendMessage({ chatroomId: selectedChatroom.id, fromId: userId, message: inputMessage.trim(), repliedTo: { message: replyMessageRef.message, id: replyMessageRef.id, fromId: replyMessageRef.fromId } });
              } else {
                sendMessage({ chatroomId: selectedChatroom.id, fromId: userId, message: inputMessage.trim() });
              }
              setInputMessage("");
            }}
          >
            <div className="relative flex-1">
              {editActive && (
                <div className="absolute w-full rounded-t-lg bottom-full text-[10px] border-l-4 border-blue-300 flex justify-between bg-gray-200 items-center p-2">
                  <div className="flex items-center gap-1">
                    <Button variant="link" size="icon" type="button" className="[&_svg]:size-5">
                      <Pencil className="h-6 w-6" />
                    </Button>
                    <div className="flex-1 flex flex-col text-sm">
                      <span className="mr-2 font-medium text-primary">Edit Message</span>
                      <span className="whitespace-pre-wrap text-muted-foreground">{formatMessageForEditOrReply({ message: editMessageRef?.message })}</span>
                    </div>
                  </div>
                  <Button
                    variant="link"
                    size="icon"
                    className="[&_svg]:size-5"
                    onClick={() => {
                      setEditActive(false);
                      setEditMessageRef(null);
                      setInputMessage("");
                    }}
                  >
                    <X />
                    <span className="sr-only">Cancel edit</span>
                  </Button>
                </div>
              )}
              {replyActive && (
                <div className="absolute w-full rounded-t-lg bottom-full text-[10px] border-l-4 border-blue-300 flex justify-between bg-gray-200 items-center p-2">
                  <div className="flex items-center gap-1">
                    <Button variant="link" size="icon" type="button" className="[&_svg]:size-5">
                      <Undo className="h-6 w-6" />
                    </Button>
                    <div className="flex-1 flex flex-col text-sm">
                      <span className="mr-2 font-medium text-primary">{replyMessageRef.fromId === userId ? "You" : selectedChatroom.fromId === userId ? selectedChatroom.toId : selectedChatroom.fromId}</span>
                      <span className="whitespace-pre-wrap text-muted-foreground">{formatMessageForEditOrReply({ message: replyMessageRef?.message })}</span>
                    </div>
                  </div>
                  <Button
                    variant="link"
                    size="icon"
                    className="[&_svg]:size-5"
                    onClick={() => {
                      setReplyActive(false);
                      setReplyMessageRef(null);
                    }}
                  >
                    <X />
                    <span className="sr-only">Cancel reply</span>
                  </Button>
                </div>
              )}
              <Textarea ref={inputRef} className={`resize-none py-1 outline-none flex-1 ${(editActive || replyActive) && "rounded-t-none border-l-4 border-l-blue-300"}`} id="message" placeholder="Type your message..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} autoComplete="off" />
            </div>
            <Button type="submit" variant="ghost" disabled={inputMessage.trim().length < 1} size="icon" className="[&_svg]:size-5">
              <Send className="text-[#00203f]" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
