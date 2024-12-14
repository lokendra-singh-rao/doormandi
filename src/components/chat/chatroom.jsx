import { deleteMessage, editMessage, fetchMessages, sendMessage } from "@/actions/firebase-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatDate } from "@/lib/utils";
import EmojiPicker from "emoji-picker-react";
import { ArrowDown, ArrowLeft, CalendarPlus, CheckCheck, Copy, EllipsisVerticalIcon, Forward, MessageCircleOff, PanelRightClose, PanelRightOpen, Pencil, PencilIcon, PlusCircle, Send, Smile, Trash, Video, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Separator from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export const ChatRoom = ({ selectedChatroom, setSelectedChatroom, showProfileInfo, setShowProfileInfo }) => {
  const [messages, setMessages] = useState([]);
  const [editActive, setEditActive] = useState(false);
  const [editMessageRef, setEditMessageRef] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);
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
    if (selectedChatroom) {
      fetchMessages({ chatroomId: selectedChatroom?.id, setMessages });
    }
  }, [selectedChatroom]);

  useEffect(() => {
    scrollToBottom("instant");
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
                  {messages.map((message) => (
                    <div key={message.id} className={cn("flex", message.fromId === userId && "flex-row-reverse")}>
                      <div className={cn("group flex flex-col", message.fromId === userId && "items-end")}>
                        <div className={cn("px-4 py-3 rounded-3xl", message.fromId === userId ? "bg-[#2665d1] text-primary-foreground rounded-br-none" : "bg-muted rounded-bl-none")}>
                          {message.isDeleted ? (
                            <div className="flex items-center gap-2 text-gray-300">
                              <MessageCircleOff size={16} />
                              <p className="text-md break-words">
                                <i>{message.message}</i>
                              </p>
                            </div>
                          ) : (
                            <p className="whitespace-pre-wrap text-md max-w-[40vw]" style={{ overflowWrap: "anywhere" }}>
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
                              <DropdownMenuItem>
                                <Forward /> Reply
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCopyToClipboard({ content: message.message })}>
                                <Copy /> Copy to Clipboard
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
                                    <AlertDialogTrigger className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
                                      <Trash /> Delete Message
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="z-[1000]">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Delete message?</AlertDialogTitle>
                                        <AlertDialogDescription>This action cannot be undone, and the deleted mark will still be visible in the chat.</AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => deleteMessage({ chatroomId: selectedChatroom.id, messageId: message.id })}>Delete</AlertDialogAction>
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
                  ))}
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
        <CardFooter className="p-2 space-x-1 border-t">
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
                setInputMessage("");
                setEditActive(false);
                setEditMessageRef(null);
                if (editActive) {
                  editMessage({ chatroomId: selectedChatroom.id, messageId: editMessageRef.id, newContent: inputMessage.trim(), fromId: userId });
                } else {
                  sendMessage({ chatroomId: selectedChatroom.id, fromId: userId, message: inputMessage.trim() });
                }
              }
            }}
            onSubmit={(e) => {
              e.preventDefault();
              if (inputMessage.trim().length <= 0) {
                return;
              }
              scrollToBottom("smooth");
              setInputMessage("");
              setEditActive(false);
              setEditMessageRef(null);
              if (editActive) {
                editMessage({ chatroomId: selectedChatroom.id, messageId: editMessageRef.id, newContent: inputMessage.trim(), fromId: userId });
              } else {
                sendMessage({ chatroomId: selectedChatroom.id, fromId: userId, message: inputMessage.trim() });
              }
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
                      <span className="whitespace-pre-wrap text-muted-foreground">{editMessageRef?.message?.split("\n")?.length > 2 ? editMessageRef?.message?.split("\n")[0] + "\n" + editMessageRef?.message?.split("\n")[1] + "..." : editMessageRef?.message?.length > 120 ? editMessageRef?.message?.slice(0, 120) + "..." : editMessageRef?.message}</span>
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
              <Textarea ref={inputRef} className={`resize-none py-1 outline-none flex-1 ${editActive && "rounded-t-none border-l-4 border-l-blue-300"}`} id="message" placeholder="Type your message..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} autoComplete="off" />
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
