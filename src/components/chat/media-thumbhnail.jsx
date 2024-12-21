import axios from "axios";
import { FileAudio, FileIcon, FileImage, FileText, FileVideo, Music, VideoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";

const MediaThumbnail = ({ filename, originalKey, thumbhKey, contentType, chatroomId }) => {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const fetchThumbnail = async () => {
      try {
        if (!thumbhKey) return;
        const response = await axios.post(`http://localhost:8089/get-download-url`, {
          key: thumbhKey,
          chatroomId,
        });
        console.log("MediaThumbnail -> response", response);
        setThumbnail(response.data);
      } catch (error) {
        console.error("Error fetching thumbnail:", error);
      }
    };
    fetchThumbnail();
  }, [thumbhKey, contentType, chatroomId]);

  const renderIcon = () => {
    const type = contentType.split("/")[0];
    switch (type) {
      case "image":
        return <FileImage className="h-8 w-8" />;
      case "video":
        return <FileVideo className="h-8 w-8" />;
      case "audio":
        return <FileAudio className="h-8 w-8" />;
      case "application":
      case "text":
        return <FileText className="h-8 w-8" />;
      default:
        return <FileIcon className="h-8 w-8" />;
    }
  };

  const getOriginalMedia = async () => {
    try {
      const response = await axios.post(`http://localhost:8089/get-download-url`, {
        key: originalKey,
        chatroomId,
      });
      console.log("MediaThumbnail -> response", response);
      window.open(response.data, "_blank");
    } catch (error) {
      console.error("Error fetching thumbnail:", error);
    }
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes'
  
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  
    const i = Math.floor(Math.log(bytes) / Math.log(k))
  
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
  }

  return (
    <Card className="w-56 rounded-sm overflow-hidden" key={originalKey} onClick={() => getOriginalMedia()}>
      <CardContent className="py-4 px-2 cursor-pointer">
        <div className="flex items-center space-x-2">
          <div className="flex-shrink-0">
            {thumbnail ? (
              <img src={thumbnail} alt="thumbhnail" className="h-12 w-12 rounded object-cover" />
            ) : (
              renderIcon()
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">{filename}</p>
            <p className="text-xs text-gray-500">{formatBytes(5678)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MediaThumbnail;
