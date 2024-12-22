import { formatAvatar } from "@/lib/utils";
import { Calendar, FileQuestion, FileText, ImageIcon, Link, MapPin, Music, Star, VideoIcon, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import Separator from "../ui/separator";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useEffect, useState } from "react";
import { fetchMedia } from "@/actions/firebase-actions";

export const ProfileInfo = ({ profiles, setShowProfileInfo, selectedChatroom }) => {
  // const sharedMedia = [
  //   { type: "image", url: "/placeholder.svg?height=50&width=50", name: "Image 1" },
  //   { type: "image", url: "/placeholder.svg?height=50&width=50", name: "Image 2" },
  //   { type: "image", url: "/placeholder.svg?height=50&width=50", name: "Image 3" },
  // ];
  const [sharedMedia, setSharedMedia] = useState([]);

  useEffect(() => {
    if (selectedChatroom) {
      fetchMedia({ chatroomId: selectedChatroom?.id, setSharedMedia });
    }
  }, [selectedChatroom]);
  console.log("All media", sharedMedia);

  const generateThumbnail = (type) => {
    if (type?.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      return URL.revokeObjectURL(url);
    } else if (type?.startsWith("video/")) {
      generateVideoThumbnail(file)
        .then(setThumbnail)
        .catch(() => setThumbnail(null));
    }
  };

  const generateVideoThumbnail = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.playsInline = true;
      video.muted = true;

      const tryToGenerateThumbnail = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnailUrl = canvas.toDataURL();
        if (thumbnailUrl === "data:,") {
          reject(new Error("Failed to generate thumbnail"));
        } else {
          resolve(thumbnailUrl);
        }
      };

      video.onloadeddata = () => {
        video.currentTime = 1;
      };

      video.onseeked = () => {
        tryToGenerateThumbnail();
      };

      video.onerror = () => {
        reject(new Error("Failed to load video"));
      };

      video.src = URL.createObjectURL(file);

      // Fallback if seeking doesn't trigger or fails
      setTimeout(() => {
        if (!thumbnail) {
          tryToGenerateThumbnail();
        }
      }, 1000);
    });
  };

  const getFileIcon = (mediaType) => {
    const type = mediaType.split("/")[0];
    switch (type) {
      case "image":
        return <ImageIcon className="h-6 w-6" />;
      case "video":
        return <VideoIcon className="h-6 w-6" />;
      case "audio":
        return <Music className="h-6 w-6" />;
      case "application":
        return <FileText className="h-6 w-6" />;
      case "text":
        return <FileText className="h-6 w-6" />;
      default:
        return <FileQuestion className="h-6 w-6" />;
    }
  };

  const sharedLinks = [
    { url: "https://example.com", name: "Example Link 1" },
    { url: "https://example.com", name: "Example Link 2" },
    { url: "https://example.com", name: "Example Link 3" },
  ];

  if (!profiles[selectedChatroom?.id]) return null;

  return (
    <div className="relative space-y-6 p-6">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger className="block md:hidden absolute top-3 right-3">
            <Button variant={"ghost"} size={"icon"} onClick={() => setShowProfileInfo(false)} className="[&_svg]:size-8 p-5 rounded-full">
              <X className="text-[#00203f]" />
            </Button>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
      <div className="text-2xl text-left font-medium" style={{ marginTop: 0 }}>
        Profile Information
      </div>
      <div className="flex flex-col items-center">
        <Avatar className="h-20 w-20">
          <AvatarImage src={profiles[selectedChatroom?.id].image} alt={profiles[selectedChatroom?.id].name} />
          <AvatarFallback>{formatAvatar({ name: profiles[selectedChatroom?.id].name })}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h2 className="text-2xl font-semibold">{profiles[selectedChatroom?.id].name}</h2>
          <p className="text-sm text-muted-foreground">{profiles[selectedChatroom?.id].timezone}</p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          <span className="text-sm">Member since {profiles[selectedChatroom?.id].memberSince}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          <span className="text-sm">{profiles[selectedChatroom?.id].location}</span>
        </div>
        <div className="flex items-center">
          <Star className="mr-2 h-4 w-4 text-yellow-400" />
          <span className="text-sm">{profiles[selectedChatroom?.id].rating} / 5</span>
        </div>
      </div>
      <Separator />
      <div>
        <Tabs defaultValue="media">
          <TabsList className="grid w-full grid-cols-2 h-10">
            <TabsTrigger value="media" className="text-base">
              Media Files
            </TabsTrigger>
            <TabsTrigger value="links" className="text-base">
              Links
            </TabsTrigger>
          </TabsList>
          <TabsContent value="media">
            <div className="grid grid-cols-3 gap-4">
              {sharedMedia.map((item, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square overflow-hidden rounded-md flex justify-center items-center">{item.mediaType?.startsWith("image/") ? <Image width={100} height={100} src={generateThumbnail} className="object-cover w-full h-full" alt="image" /> : getFileIcon(item.mediaType)}</div>
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="links">
            <div className="grid grid-cols-3 gap-4">
              {sharedLinks.map((item, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square flex items-center justify-center bg-muted rounded-md">
                    <Link className="h-8 w-8" />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
