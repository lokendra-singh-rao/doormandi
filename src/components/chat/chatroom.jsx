import { deleteMessage, editMessage, fetchMessages, markMessagesAsRead, sendMessage } from "@/actions/firebase-actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn, formatDate } from "@/lib/utils";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { ArrowDown, ArrowLeft, CalendarPlus, CheckCheck, ChevronDown, ChevronUp, Copy, EllipsisVerticalIcon, MessageCircleOff, PanelRightClose, PanelRightOpen, Paperclip, Pencil, PencilIcon, Search, Send, Smile, Star, Trash, Undo, Video, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Separator from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { FilePreview } from "./file-preview";
import { SpeechToText } from "./speech-to-text";

export const ChatRoom = ({ files, setFiles, handleChatroomClose, messagesLoading, setMessagesLoading, selectedChatroom, showProfileInfo, setShowProfileInfo, messages, setMessages }) => {
  const [editActive, setEditActive] = useState(false);
  const [replyActive, setReplyActive] = useState(false);
  const [editMessageRef, setEditMessageRef] = useState(null);
  const [replyMessageRef, setReplyMessageRef] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [highlightedMessage, setHighlightedMessage] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [messageSearchInput, setMessageSearchInput] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);
  const messageRefs = useRef({});
  const fileInputRef = useRef(null);
  const userId = "123";

  const unSupportedFileTypes = [".ade", ".adp", ".bat", ".chm", ".cmd", ".com", ".cpl", ".exe", ".hta", ".ins", ".isp", ".jar", ".jse", ".lib", ".lnk", ".mde", ".msc", ".msp", ".mst", ".pif", ".scr", ".sct", ".shb", ".skp", ".sys", ".vb", ".vbe", ".vbs", ".vxd", ".wsc", ".wsf", ".wsh"];

  const handleFileSelect = (e) => {
    console.log("In handleFileSelect", e.target.files);
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => {
        if (file.size > 1000000000) {
          return {
            file,
            progress: 0,
            error: "File size exceeds 1GB limit",
            id: Math.random().toString(36).substring(7),
          };
        } else if (unSupportedFileTypes.includes(file.name.slice(-4).toLowerCase())) {
          return {
            file,
            progress: 0,
            error: "This file is not allowed to send due to security reasons.",
            id: Math.random().toString(36).substring(7),
          };
        } else {
          return {
            file,
            progress: 0,
            id: Math.random().toString(36).substring(7),
          };
        }
      });
      setFiles((prev) => [...prev, ...newFiles]);
      handleFileUpload(newFiles[0]);
    }
  };

  const handleFileUpload = async (file) => {
    // const file = event.target.files[0];
    console.log("In handleFileUpload", file);
    if (!file) return;

    try {
      // Fetch presigned URL from backend
      const response = await axios.get(`http://localhost:8089/get-upload-url?fileName=${file.file.name}&fileType=${file.file.type}&chatroomId=5678&is=true`);

      console.log("API response", response.data);
      // Create a FormData object to hold the file and fields
      const formData = new FormData();
      // Object.entries(fields).forEach(([key, value]) => {
      //   formData.append(key, value);
      // });
      formData.append("file", file.file);

      // Upload the file to S3
      const upload = new XMLHttpRequest();
      upload.open("PUT", response.data, true);
      upload.setRequestHeader("Content-Type", file.file.type);

      upload.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = ((event.loaded / event.total) * 100).toFixed(2);
          setFiles((prev) =>
            prev.map((f) => {
              if (f.id === file.id) {
                return { ...f, progress };
              }
              return f;
            })
          );
          console.log(`File upload progress: ${progress}%`);
        }
      };

      upload.onload = () => {
        if (upload.status === 200) {
          console.log("File uploaded successfully");
        } else {
          setFiles((prev) =>
            prev.map((f) => {
              if (f.id === file.id) {
                return { ...f, error: "File upload failed" };
              }
              return f;
            })
          );
          console.error("File upload failed");
        }
      };

      upload.onerror = () => {
        setFiles((prev) =>
          prev.map((f) => {
            if (f.id === file.id) {
              return { ...f, error: "File upload failed" };
            }
            return f;
          })
        );
        console.error("File upload error");
      };

      upload.send(formData);
    } catch (error) {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id === file.id) {
            return { ...f, error: "File upload failed" };
          }
          return f;
        })
      );
      console.error("Error uploading file:", error);
    }
  };

  const removeFile = async (id) => {
    const fileIndex = files.findIndex((f) => f.id === id);
    const response = await axios.get(`http://localhost:8089/remove-cancelled-upload?fileName=${files[fileIndex].file.name}&fileType=${files[fileIndex].file.type}&chatroomId=${selectedChatroom.id}`);
    console.log("Response of removal API", response.data)
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

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

  const handleMessageSearch = () => {
    if (messageSearchInput.trim().length <= 0) {
      return;
    }
    setFilteredMessages(
      messages.filter((message) => {
        if (message.message.toLowerCase().includes(messageSearchInput.toLowerCase())) return message?.id;
      })
    );

    const currentPointerAt = filteredMessages.length - 1;

    setCurrentMessageIndex(currentPointerAt);

    scrollToMessage({ messageId: filteredMessages[currentPointerAt]?.id, block: "end" });
  };

  const handleMessageNavigation = (direction) => {
    if (filteredMessages.length <= 0) {
      return;
    }

    if (direction === "up") {
      if (currentMessageIndex === 0) {
        return;
      }
      scrollToMessage({ messageId: filteredMessages[currentMessageIndex - 1]?.id, block: "center" });
      setCurrentMessageIndex((prev) => prev - 1);
    } else if (direction === "down") {
      if (currentMessageIndex === filteredMessages.length - 1) {
        return;
      }
      scrollToMessage({ messageId: filteredMessages[currentMessageIndex + 1]?.id, block: "center" });
      setCurrentMessageIndex((prev) => prev + 1);
    }
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

  const formatMessageForEditOrReply = ({ message, trimLength = 120 }) => {
    return message.split("\n").length > 2 ? message.split("\n")[0] + "\n" + message.split("\n")[1] + "..." : message.length > trimLength ? message.slice(0, trimLength) + "..." : message;
  };

  // Function to scroll to a specific message
  const scrollToMessage = ({ messageId, block = "center" }) => {
    if (messageRefs?.current[messageId]) {
      messageRefs?.current[messageId].scrollIntoView({
        behavior: "smooth",
        block,
      });

      setTimeout(() => {
        setHighlightedMessage(messageId);
      }, 150);

      setTimeout(() => {
        setHighlightedMessage(null);
      }, 900);
    }
  };

  const handleTranscript = (transcript) => {
    setInputMessage((prev) => prev + " " + transcript);
  };

  useEffect(() => {
    handleMessageSearch();
  }, [messageSearchInput]);

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
    markMessagesAsRead({ selectedChatroom, currentUserId: userId });
  }, [messages]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputMessage]);

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
    <div className="flex flex-col h-full">
      {/* Chatroom header */}
      <CardHeader id="room-header" className={`${showSearchBar && "flex-col gap-1"} flex justify-center shadow-sm py-3 px-4`}>
        <div className={`${showSearchBar ? "hidden md:flex flex-row items-center justify-between" : "flex flex-row items-center justify-between"}`}>
          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="outline" size="icon" className="flex lg:hidden mr-4" onClick={handleChatroomClose}>
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
              <Tooltip>
                <TooltipTrigger className="relative">
                  <Button variant="ghost" size="icon" className="[&_svg]:size-5 rounded-full" onClick={() => setShowSearchBar(!showSearchBar)}>
                    <Search className="text-[#00203f]" />
                  </Button>
                  <div className="z-50 absolute md:-left-[450%] md:top-[140%] w-[380px] bg-white rounded-lg md:block hidden">
                    <div className={`relative ${showSearchBar ? "block" : "hidden"}`}>
                      <Input placeholder="Search within chat" className="w-full h-11" value={messageSearchInput} onChange={(e) => setMessageSearchInput(e.target.value)} />
                      <div className="flex gap-2 items-center absolute right-2 top-1/2 transform -translate-y-1/2">
                        <Button disabled={currentMessageIndex === 0} variant={"ghost"} size={"icon"} className="[&_svg]:size-5 rounded-full" onClick={() => handleMessageNavigation("up")}>
                          <ChevronUp className="text-[#00203f]" />
                        </Button>
                        <Button disabled={currentMessageIndex === filteredMessages?.length - 1} variant={"ghost"} size={"icon"} className="[&_svg]:size-5 rounded-full" onClick={() => handleMessageNavigation("down")}>
                          <ChevronDown className="text-[#00203f]" />
                        </Button>
                        <Button
                          variant={"ghost"}
                          size={"icon"}
                          className="[&_svg]:size-5 rounded-full"
                          onClick={() => {
                            setShowSearchBar(!showSearchBar);
                            setMessageSearchInput("");
                          }}
                        >
                          <X className="text-[#00203f]" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                {!showSearchBar && (
                  <TooltipContent side="bottom">
                    <p className="text-base">Search</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
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
              <Tooltip>
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
              <Tooltip>
                <TooltipTrigger>
                  <Button variant={"outline"} size={"icon"} onClick={toggleShowProfile} className="[&_svg]:size-5 p-5 rounded-full">
                    {showProfileInfo ? <PanelRightClose className="text-[#00203f]" /> : <PanelRightOpen className="text-[#00203f]" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{showProfileInfo ? <p className="text-base">Close Sidebar</p> : <p className="text-base">Open Sidebar</p>}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {showSearchBar && (
          <div className="z-50 md:hidden flex w-full bg-white">
            <div className={`relative flex-1`}>
              <Input placeholder="Search within chat" className="w-full h-11" value={messageSearchInput} onChange={(e) => setMessageSearchInput(e.target.value)} />
              <div className="flex gap-2 items-center absolute right-2 top-1/2 transform -translate-y-1/2">
                <Button disabled={currentMessageIndex === 0} variant={"ghost"} size={"icon"} className="[&_svg]:size-5 rounded-full" onClick={() => handleMessageNavigation("up")}>
                  <ChevronUp className="text-[#00203f]" />
                </Button>
                <Button disabled={currentMessageIndex === filteredMessages?.length - 1} variant={"ghost"} size={"icon"} className="[&_svg]:size-5 rounded-full" onClick={() => handleMessageNavigation("down")}>
                  <ChevronDown className="text-[#00203f]" />
                </Button>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="[&_svg]:size-5 rounded-full"
                  onClick={() => {
                    setShowSearchBar(!showSearchBar);
                    setMessageSearchInput("");
                  }}
                >
                  <X className="text-[#00203f]" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardHeader>

      {/* Messages List */}
      <ContextMenu>
        <ContextMenuTrigger className="flex-1">
          <div className="flex-grow overflow-hidden h-full relative">
            <div id="message-scroll-area" className="absolute inset-0 overflow-y-auto px-4 py-2 space-y-2" ref={scrollAreaRef}>
              <Separator text="Chat initiated" className="px-2" />
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
                  <div key={message.id} ref={(el) => (messageRefs.current[message.id] = el)} className={cn("flex", message.fromId === userId && "flex-row-reverse", "")}>
                    <div className={cn("group flex flex-col max-w-[75vw] lg:max-w-[50vw]", message.fromId === userId && "items-end")}>
                      <div className={cn("px-3 py-2.5 rounded-md min-w-32 text-sm md:text-base transition-colors duration-500", message.fromId === userId ? "bg-[#2665d1] text-primary-foreground rounded-br-none" : "bg-muted rounded-bl-none", highlightedMessage === message.id ? "bg-blue-300" : "")}>
                        {message.isDeleted ? (
                          <div className={cn("flex items-center gap-2", message.fromId === userId ? "text-gray-200" : "text-gray-500")}>
                            <MessageCircleOff size={16} />
                            <p className="text-md break-words">
                              <i>{message.message}</i>
                            </p>
                          </div>
                        ) : message?.repliedTo?.message ? (
                          <div className="flex flex-col">
                            <div onClick={() => scrollToMessage({ messageId: message?.repliedTo?.id })} className="cursor-pointer w-full rounded-md bottom-full text-[10px] border-l-4 border-blue-300 flex justify-between bg-gray-200 items-center p-2">
                              <div className="flex items-center gap-1">
                                <div className="flex-1 flex flex-col text-sm">
                                  <span className="mr-2 font-medium text-primary">{message?.repliedTo?.fromId == userId ? "You" : selectedChatroom.fromId === userId ? selectedChatroom.toId : selectedChatroom.fromId}</span>
                                  <span style={{ overflowWrap: "anywhere" }} className="whitespace-pre-wrap text-muted-foreground">
                                    {formatMessageForEditOrReply({ message: message?.repliedTo?.message })}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className={cn("whitespace-pre-wrap text-sm md:text-base")} style={{ overflowWrap: "anywhere" }}>
                              {message.message}
                            </p>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap text-sm md:text-base min-w-24" style={{ overflowWrap: "anywhere" }}>
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
            {false && (
              <Button
                variant="outline"
                size="icon"
                className="[&_svg]:size-5 absolute bottom-5 left-8"
                onClick={() => {
                  scrollToBottom("smooth");
                }}
              >
                <ArrowDown />
                <span className="sr-only">Scroll to bottom</span>
              </Button>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem className="gap-2" onClick={handleChatroomClose}>
            <X size={18} />
            <div>Close Chat</div>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* Input and Other actions */}
      <div className="bg-background border-t">
        {files.length > 0 && (
          <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex w-max space-x-4 p-4">
              {files.map((fileUpload) => (
                <FilePreview key={fileUpload.id} file={fileUpload.file} error={fileUpload.error} progress={fileUpload.progress} onRemove={() => removeFile(fileUpload.id)} />
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
        <CardFooter id="room-footer" className="p-2 space-x-1 border-none">
          <Input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileSelect} />
          <Button variant="ghost" size="icon" className="rounded-full [&_svg]:size-5" onClick={() => fileInputRef.current?.click()}>
            <Paperclip />
          </Button>
          <Popover>
            <PopoverTrigger>
              <Button variant="ghost" size="icon" className="rounded-full [&_svg]:size-5">
                <Smile />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="border-none shadow-none p-0">
              <EmojiPicker emojiStyle="native" className="sm:w-96 w-72" onEmojiClick={(e) => setInputMessage((prev) => prev + e.emoji)} />
            </PopoverContent>
          </Popover>
          <SpeechToText onTranscript={handleTranscript} />
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
                  sendMessage({ chatroom: selectedChatroom, fromId: userId, message: inputMessage.trim(), repliedTo: { message: replyMessageRef.message, id: replyMessageRef.id, fromId: replyMessageRef.fromId } });
                } else {
                  sendMessage({ chatroom: selectedChatroom, fromId: userId, message: inputMessage.trim() });
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
                editMessage({ selectedChatroom, messageId: editMessageRef.id, newContent: inputMessage.trim() });
              } else if (replyActive) {
                setReplyActive(false);
                setReplyMessageRef(null);
                sendMessage({ chatroom: selectedChatroom, fromId: userId, message: inputMessage.trim(), repliedTo: { message: replyMessageRef.message, id: replyMessageRef.id, fromId: replyMessageRef.fromId } });
              } else {
                sendMessage({ chatroom: selectedChatroom, fromId: userId, message: inputMessage.trim() });
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
              <Textarea rows={1} maxLength={10000} ref={inputRef} className={`min-h-10 max-h-28 resize-none py-1 outline-none flex-grow overflow-hidden p-2 rounded-m ${(editActive || replyActive) && "rounded-t-none border-l-4 border-l-blue-300"}`} id="message" placeholder="Type your message..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} autoComplete="off" />
            </div>
            <Button type="submit" variant="ghost" disabled={inputMessage.trim().length < 1} size="icon" className="[&_svg]:size-5">
              <Send className="text-[#00203f]" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </div>
    </div>
  );
};
