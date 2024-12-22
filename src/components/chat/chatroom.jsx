import { deleteMessage, editMessage, fetchMessages, markMessageAsStarred, markMessageAsUnstarred, markMessagesAsRead, sendMessage } from "@/actions/firebase-actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn, formatDate } from "@/lib/utils";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { AlertCircle, ArrowDown, ArrowLeft, CalendarPlus, CheckCheck, ChevronDown, ChevronUp, Copy, EllipsisVerticalIcon, FileQuestion, FileText, MessageCircleOff, Music, PanelRightClose, PanelRightOpen, Paperclip, Pencil, PencilIcon, Search, Send, Smile, Star, Trash, Undo, Video, VideoIcon, X } from "lucide-react";
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
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import MediaThumbnail from "./media-thumbhnail";

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
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const [filesSize, setFilesSize] = useState(0);
  const [isSendDisabled, setIsSendDisabled] = useState(false);

  console.log("Messages", messages);
  const scrollAreaRef = useRef(null);
  const inputRef = useRef(null);
  const messageRefs = useRef({});
  const fileInputRef = useRef(null);
  const userId = "123";

  const unSupportedFileTypes = [".ade", ".adp", ".bat", ".chm", ".cmd", ".com", ".cpl", ".exe", ".hta", ".ins", ".isp", ".jar", ".jse", ".lib", ".lnk", ".mde", ".msc", ".msp", ".mst", ".pif", ".scr", ".sct", ".shb", ".skp", ".sys", ".vb", ".vbe", ".vbs", ".vxd", ".wsc", ".wsf", ".wsh"];

  const compressImage = async (file, { quality = 1, type = file.type }) => {
    try {
      // Get as image data
      const imageBitmap = await createImageBitmap(file);

      // Draw to canvas
      const canvas = document.createElement("canvas");
      canvas.width = imageBitmap.width;
      canvas.height = imageBitmap.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(imageBitmap, 0, 0);

      // Turn into Blob
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, type, quality));

      // Turn Blob into File
      return new File([blob], file.name, {
        type: blob.type,
      });
    } catch (error) {
      console.error("Error creating image thumbh", error);
      return null;
    }
  };

  const handleFileSelect = async (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const newFiles = [];

      for (const file of selectedFiles) {
        setFilesSize((prev) => prev + file.size);

        if (file.size > 1073741824) {
          newFiles.push({
            file,
            progress: 0,
            error: "File size exceeds 1GB limit",
            id: Math.random().toString(36).substring(7),
          });
        } else if (unSupportedFileTypes.includes(file.name.slice(-4).toLowerCase())) {
          newFiles.push({
            file,
            progress: 0,
            error: "File blocked by Ditansource, due to security reasons.",
            id: Math.random().toString(36).substring(7),
          });
        } else {
          let thumbh = null;
          if (file.type.includes("image")) {
            thumbh = await compressImage(file, {
              quality: 0.1,
              type: "image/webp",
            });
          }
          newFiles.push({
            file,
            progress: 0,
            id: Math.random().toString(36).substring(7),
            ...(thumbh ? { thumbh } : {}),
          });
        }
      }

      setFiles((prev) => [...prev, ...newFiles]);
      handleFileUpload(newFiles);
    }
  };

  const handleFileUpload = async (files) => {
    for (const file of files) {
      if (file.error) {
        continue;
      }

      if (!file) return;

      try {
        const response = await axios.post(`http://localhost:8089/get-upload-url`, {
          fileName: file.file.name,
          fileType: file.file.type,
          fileSize: file.file.size.toString(),
          chatroomId: selectedChatroom.id,
        });

        const putObject = response.data;

        const config = {
          headers: {
            "Content-Type": file.file.type,
          },

          onUploadProgress: (progressEvent) => {
            // Calculate percentage uploaded
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setFiles((prev) =>
              prev.map((f) => {
                if (f.id === file.id) {
                  return { ...f, progress };
                }
                return f;
              })
            );
            console.log(`Upload progress: ${progress}%`);
          },
        };

        // Make the PUT request to the S3 pre-signed URL
        const responsePut = await axios.put(putObject?.presignedUrl, file.file, config);

        if (responsePut.status === 200) {
          console.log("File uploaded successfully!");
          setFiles((prev) =>
            prev.map((f) => {
              if (f.id === file.id) {
                return { ...f, key: putObject?.keyname, mediaType: putObject?.contentType };
              }
              return f;
            })
          );
        } else {
          setFiles((prev) =>
            prev.map((f) => {
              if (f.id === file.id) {
                return { ...f, error: "Upload failed!" };
              }
              return f;
            })
          );
        }

        if (file.thumbh) {
          const thumbhConfig = {
            headers: {
              "Content-Type": file.thumbh.type,
            },

            onUploadProgress: (progressEvent) => {
              // Calculate thumbhnail percentage uploaded
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

              console.log(`Thumbhnai upload progress: ${progress}%`);
            },
          };

          const thumbhResponsePut = await axios.put(putObject?.thumbPresignedUrl, file.thumbh, thumbhConfig);

          if (thumbhResponsePut.status === 200) {
            console.log("File uploaded successfully!");
            setFiles((prev) =>
              prev.map((f) => {
                if (f.id === file.id) {
                  return { ...f, thumbhKey: putObject?.thumbhKeyname };
                }
                return f;
              })
            );
          } else {
            console.error("Thumbhnail upload failed:", thumbhResponsePut.status, thumbhResponsePut.statusText);
          }
        }
      } catch (error) {
        console.error("Error uploading file", error);
        setFiles((prev) =>
          prev.map((f) => {
            if (f.id === file.id) {
              return { ...f, error: "Upload failed!" };
            }
            return f;
          })
        );
      }
    }
  };

  const removeFile = async (id) => {
    const fileIndex = files.findIndex((f) => f.id === id);
    // const response = await axios.get(`http://localhost:8089/remove-cancelled-upload?fileName=${files[fileIndex].file.name}&fileType=${files[fileIndex].file.type}&chatroomId=${selectedChatroom.id}`);
    // console.log("Response of removal API", response.data);

    setFilesSize((prev) => prev - files[fileIndex].file.size);
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleFileSend = async () => {
    for (const file of files) {
      if (file.error || file.progress < 100) {
        continue;
      }

      sendMessage({ chatroom: selectedChatroom, fromId: userId, message: file.file.name, isMedia: true, mediaType: file.file.type, mediaKey: file.key, mediaThumbnailKey: file.thumbhKey ? file.thumbhKey : "" });
    }

    setFiles([]);
    setFilesSize(0);
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

  const handleMessageSearch = (e) => {
    if (e?.target?.value.trim().length <= 0) {
      return;
    }

    let filteredMessagesList = messages.filter((message) => {
      if (message.message.toLowerCase().includes(e.target.value.toLowerCase()) && !message.message.idDeleted) return message?.id;
    });

    if (filteredMessagesList.length <= 0) {
      console.log("No messages found");
      return;
    }

    setFilteredMessages(filteredMessagesList);

    const currentPointerAt = filteredMessagesList?.length - 1;

    setCurrentMessageIndex(currentPointerAt);

    scrollToMessage({ messageId: filteredMessagesList[currentPointerAt]?.id, block: "end" });
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
    scrollAreaRef.current.scrollTo({
      top: scrollAreaRef.current.scrollHeight,
      behavior,
    });
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

  const handleScroll = () => {
    if (scrollAreaRef.current) {
      if (scrollAreaRef.current.scrollHeight - scrollAreaRef.current.scrollTop - scrollAreaRef.current.clientHeight > 300) {
        setIsScrolledToBottom(false);
      } else {
        setIsScrolledToBottom(true);
      }
    }
  };

  useEffect(() => {
    if (!selectedChatroom) return;

    const container = scrollAreaRef.current;
    if (!container) {
      return;
    }

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [selectedChatroom]);

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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex lg:hidden mr-2 rounded-full [&_svg]:size-5"
                    onClick={() => {
                      setFilesSize(0);
                      handleChatroomClose();
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
              <Tooltip>
                <TooltipTrigger className="relative">
                  <Button variant="ghost" size="icon" className="[&_svg]:size-5 rounded-full" onClick={() => setShowSearchBar(!showSearchBar)}>
                    <Search className="text-[#00203f]" />
                  </Button>
                  <div className="z-50 absolute md:-left-[450%] md:top-[140%] w-[380px] bg-white rounded-lg md:block hidden">
                    <div className={`relative ${showSearchBar ? "block" : "hidden"}`}>
                      <Input
                        placeholder="Search within chat"
                        className="w-full h-11"
                        value={messageSearchInput}
                        onChange={(e) => {
                          setMessageSearchInput(e.target.value);
                          handleMessageSearch(e);
                        }}
                      />
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
              <Input
                placeholder="Search within chat"
                className="w-full h-11"
                value={messageSearchInput}
                onChange={(e) => {
                  setMessageSearchInput(e.target.value);
                  handleMessageSearch(e);
                }}
              />
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
                      {message?.isMedia ? (
                        <MediaThumbnail filename={message.message} originalKey={message?.mediaKey} chatroomId={selectedChatroom?.id} thumbhKey={message?.mediaThumbnailKey} contentType={message?.mediaType} />
                      ) : (
                        <div className={cn("px-3 py-2.5 rounded-md min-w-32 text-sm md:text-base transition-colors duration-500 relative", message.fromId === userId ? "bg-[#2665d1] text-primary-foreground rounded-br-none" : "bg-muted rounded-bl-none", highlightedMessage === message.id ? "bg-blue-300" : "")}>
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
                          {message?.starredBy?.includes(userId) && <Star className="absolute right-2 bottom-2" size={12} fill="yellow" color="yellow" />}
                        </div>
                      )}
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
                    {!message.isDeleted && !message.isMedia && (
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
                            <DropdownMenuItem
                              onClick={() => {
                                if (!message?.starredBy?.includes(userId)) {
                                  return markMessageAsStarred({ message, userId });
                                } else {
                                  return markMessageAsUnstarred({ message, userId });
                                }
                              }}
                            >
                              <Star /> {message?.starredBy?.includes(userId) ? "Unstar Message" : "Star Message"}
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
            {!isScrolledToBottom && (
              <Button
                variant="outline"
                size="icon"
                className="[&_svg]:size-5 absolute bottom-5 left-8 rounded-full"
                onClick={() => {
                  scrollToBottom();
                }}
              >
                <ArrowDown />
                <span className="sr-only">Scroll to bottom</span>
              </Button>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem
            className="gap-2"
            onClick={() => {
              setFilesSize(0);
              handleChatroomClose();
            }}
          >
            <X size={18} />
            <div>Close Chat</div>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* Input and Other actions */}
      <div className="bg-background border-t">
        {filesSize > 1073741824 && (
          <div className="p-2 pb-0">
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>Total file size cannot exceed 1GB limit</AlertDescription>
            </Alert>
          </div>
        )}
        {files.length > 10 && (
          <div className="p-2 pb-0">
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>Maximum 10 files can be uploaded at a time</AlertDescription>
            </Alert>
          </div>
        )}

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
            onKeyDown={async (e) => {
              if (e.key === "Enter" && e.shiftKey) {
                return;
              } else if (e.key === "Enter") {
                e.preventDefault();
                if (files.length > 0) {
                  handleFileSend();
                  return;
                }

                if (inputMessage.trim().length <= 0) {
                  return;
                }

                scrollToBottom("smooth");
                setInputMessage("");
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
              }
            }}
            onSubmit={(e) => {
              e.preventDefault();
              if (files.length > 0) {
                handleFileSend();
                return;
              }
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
              <Textarea rows={1} disabled={files.length > 0} maxLength={10000} ref={inputRef} className={`min-h-12 max-h-28 resize-none py-1 outline-none flex-grow overflow-hidden p-2 rounded-m ${(editActive || replyActive) && "rounded-t-none border-l-4 border-l-blue-300"}`} id="message" placeholder="Type your message..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} autoComplete="off" />
            </div>
            <Button type="submit" variant="ghost" disabled={inputMessage.trim().length < 1 && (files.length == 0 || files.length > 10 || filesSize > 1073741824)} size="icon" className="[&_svg]:size-5">
              <Send className="text-[#00203f]" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </div>
    </div>
  );
};
