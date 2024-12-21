import { Progress } from "@/components/ui/progress";
import { Check, FileQuestion, FileText, FileWarning, ImageIcon, Music, VideoIcon, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export function FilePreview({ file, error, progress, onRemove }) {
  const [thumbnail, setThumbnail] = useState(null);

  // const uu = {
  //   uid: "a1d97bb6-76bd-4b2d-a690-02de562590cf",
  //   formKeyValues: [
  //     {
  //       key: "key",
  //       value: "workplace/attachment/2d5e257987efeeb36102c27bc02ec67f",
  //     },
  //     {
  //       key: "acl",
  //       value: "private",
  //     },
  //     {
  //       key: "Content-Disposition",
  //       value: "inline; filename=\"457148196_305090169332797_703480645708390999_n.jpeg\"; filename*=utf-8''457148196_305090169332797_703480645708390999_n.jpeg",
  //     },
  //     {
  //       key: "policy",
  //       value: "eyJleHBpcmF0aW9uIjoiMjAyNC0xMi0xOVQxMjowMTozOS43OTNaIiwiY29uZGl0aW9ucyI6W3siYnVja2V0IjoidXB3b3JrLXVzdzItcHJvZC1maWxlLXN0b3JhZ2Utd3A1In0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ3b3JrcGxhY2UvYXR0YWNobWVudC8yZDVlMjU3OTg3ZWZlZWIzNjEwMmMyN2JjMDJlYzY3ZiJdLHsiYWNsIjoicHJpdmF0ZSJ9LHsiQ29udGVudC1EaXNwb3NpdGlvbiI6ImlubGluZTsgZmlsZW5hbWU9XCI0NTcxNDgxOTZfMzA1MDkwMTY5MzMyNzk3XzcwMzQ4MDY0NTcwODM5MDk5OV9uLmpwZWdcIjsgZmlsZW5hbWUqPXV0Zi04Jyc0NTcxNDgxOTZfMzA1MDkwMTY5MzMyNzk3XzcwMzQ4MDY0NTcwODM5MDk5OV9uLmpwZWcifSxbImNvbnRlbnQtbGVuZ3RoLXJhbmdlIiwwLDEwNzM3NDE4MjRdLHsieC1hbXotY3JlZGVudGlhbCI6IkFTSUEyWVI2UFlXNVFNNjZESlg2LzIwMjQxMjE5L3VzLXdlc3QtMi9zMy9hd3M0X3JlcXVlc3QgIn0seyJ4LWFtei1hbGdvcml0aG0iOiJBV1M0LUhNQUMtU0hBMjU2In0seyJ4LWFtei1zZXJ2ZXItc2lkZS1lbmNyeXB0aW9uIjoiQUVTMjU2In0seyJ4LWFtei1kYXRlIjoiMjAyNDEyMTlUMTEzMTM5WiJ9LFsic3RhcnRzLXdpdGgiLCIkQ29udGVudC1UeXBlIiwiaW1hZ2UvanBlZyJdLHsieC1hbXotc2VjdXJpdHktdG9rZW4iOiJJUW9KYjNKcFoybHVYMlZqRUt2Ly8vLy8vLy8vL3dFYUNYVnpMWGRsYzNRdE1pSkdNRVFDSUJrMjRvS0JCKzY3Q0VqSGZGNW9CVWhKRjBDaksrSVFjNlpERFJVakswY2NBaUJNb3o1Zk04c2h4YXdIVlVpNGlsR1IzcVFRR0VLUFJMa1dMZ1p5bEg4TU55ck5CQWgwRUFBYUREY3pPVGt6T1RFM016Z3hPU0lNN0trOXRtMzJPdWxtMmpCd0txb0VkRXlkT3ZEYVovNXJ6V3h1UUN0OWFDbEtoUXJMYklWMDV5TDhjNXZFMTJ3eVpvTFFyOWVlLzBSakxvaGZIQmc0RUxBTzBZRVBOd2lBUkdVWDlwaHRBcEVUejgwdkN5bHZtVXkySjhCQnZOazUvcnMwY2VxNllYN1ZsSmFGeDJsejYxQkJUdjMvVkpiS3RGRHgydVZrcEo1NUp4UnJqa0E4QUlyMC9Tcnp0dG5TcmEwTjZkM09pbk5vSGsrN3NaelVndWIvZkpDeVZlTWU4bExuQmhiM1dhYVY1UXdMZVBLU1lGZ2ZvVGtDYWlQYTA2c3krNGxxSlpPYnZNTTg2UUlMK1ptQ3VMTEJ4NVVjWkEwTkhRcmRNQlRDNXAvQzlZZkpLM2YvcGxVcUoveHNYa0xmbTg1OW9qQlBhSm04ZmFyeHUrV1hrSzl5WTJIbGxTeE1HV3NjWU1zT2E4dE5reE9PQURFRTJsRWlZYzg3aXdYOHNnSDNQeDdvMFBjUjc3ZkN1dUlaRjJTQ1FqUVhqZlZ3c3YzS0F0SGp1WGFRMDkwOEZBUFhwbmhvT1FWbHVSdEwzUEt1S01wNWNNM0MwTEQ3bzhhK0R5SHlPU0xvS3RRb3hVdVh2QkJwNE1WUkFXQjc0b2loMk5iRUlTS2tiWjRWZHdEQTVUZ016S0kyeUlNdGRaa1R3a09vUjl5K2NDSFpsUHVVWER1bFE0REpVUUhjalBwQVZLdkJsODBlQkFWcUVrWWc4R21QVW9XZ09kdkllWEpMcDY2WVI1dWpEeEFZVEpRd1VWQ0xBUnV0QjF2UW05UFZvMHNPK2lNQkx2bEp2ekt2RUFOZlB1bk9WSWtNb05TOXZsODZxQkphcEQwYXhpWVBMalkreWFDMHhIU2VqQ3F3NXBHWG8rUW40RUNzRFJ5M2J4emthNHJQM1dDcmluQmpHRTNjVGhKVjV6aENYcTljQS9Ma2c2ZncraktVNFJBd3d2U1B1d1k2cUFHdmRkcy9TZ05Sc2pPYmVkaTdTYjFsQ1NmeEI1NDNRbnRVSHRzWTNwbFBPVVBtM1B0NFZEWlRVTlovdEJNY3pFRWFuZi9waitaNW8vdjlVUkM3MGxKOEVZSm9OLzA3cGE4YlpBejVUbC9mT3JOWTdKWlUrOGtKRVNSUlVGY3UwWXVrWHlMbmFLQXQ2TUhLV2NySmQ5c2tDU0pSQWxnazlXQzIxaEpUeHR1MW1VRDZvUS8rYjVHU2dJZ1d4amVtK3pEYjdZKzgwUk1WbVhCa3FXNUVPTkFQR3hTRldvV3ZlSFk9In1dfQ==",
  //     },
  //     {
  //       key: "x-amz-signature",
  //       value: "50a90e14df29c9a02b2d7a30afa37625a7083a7b50f476cff3db0710d1f4e531",
  //     },
  //     {
  //       key: "x-amz-server-side-encryption",
  //       value: "AES256",
  //     },
  //     {
  //       key: "x-amz-algorithm",
  //       value: "AWS4-HMAC-SHA256",
  //     },
  //     {
  //       key: "x-amz-credential",
  //       value: "ASIA2YR6PYW5QM66DJX6/20241219/us-west-2/s3/aws4_request ",
  //     },
  //     {
  //       key: "x-amz-date",
  //       value: "20241219T113139Z",
  //     },
  //     {
  //       key: "Content-Type",
  //       value: "image/jpeg",
  //     },
  //     {
  //       key: "x-amz-security-token",
  //       value: "IQoJb3JpZ2luX2VjEKv//////////wEaCXVzLXdlc3QtMiJGMEQCIBk24oKBB+67CEjHfF5oBUhJF0CjK+IQc6ZDDRUjK0ccAiBMoz5fM8shxawHVUi4ilGR3qQQGEKPRLkWLgZylH8MNyrNBAh0EAAaDDczOTkzOTE3MzgxOSIM7Kk9tm32Oulm2jBwKqoEdEydOvDaZ/5rzWxuQCt9aClKhQrLbIV05yL8c5vE12wyZoLQr9ee/0RjLohfHBg4ELAO0YEPNwiARGUX9phtApETz80vCylvmUy2J8BBvNk5/rs0ceq6YX7VlJaFx2lz61BBTv3/VJbKtFDx2uVkpJ55JxRrjkA8AIr0/SrzttnSra0N6d3OinNoHk+7sZzUgub/fJCyVeMe8lLnBhb3WaaV5QwLePKSYFgfoTkCaiPa06sy+4lqJZObvMM86QIL+ZmCuLLBx5UcZA0NHQrdMBTC5p/C9YfJK3f/plUqJ/xsXkLfm859ojBPaJm8farxu+WXkK9yY2HllSxMGWscYMsOa8tNkxOOADEE2lEiYc87iwX8sgH3Px7o0PcR77fCuuIZF2SCQjQXjfVwsv3KAtHjuXaQ0908FAPXpnhoOQVluRtL3PKuKMp5cM3C0LD7o8a+DyHyOSLoKtQoxUuXvBBp4MVRAWB74oih2NbEISKkbZ4VdwDA5TgMzKI2yIMtdZkTwkOoR9y+cCHZlPuUXDulQ4DJUQHcjPpAVKvBl80eBAVqEkYg8GmPUoWgOdvIeXJLp66YR5ujDxAYTJQwUVCLARutB1vQm9PVo0sO+iMBLvlJvzKvEANfPunOVIkMoNS9vl86qBJapD0axiYPLjY+yaC0xHSejCqw5pGXo+Qn4ECsDRy3bxzka4rP3WCrinBjGE3cThJV5zhCXq9cA/Lkg6fw+jKU4RAwwvSPuwY6qAGvdds/SgNRsjObedi7Sb1lCSfxB543QntUHtsY3plPOUPm3Pt4VDZTUNZ/tBMczEEanf/pj+Z5o/v9URC70lJ8EYJoN/07pa8bZAz5Tl/fOrNY7JZU+8kJESRRUFcu0YukXyLnaKAt6MHKWcrJd9skCSJRAlgk9WC21hJTxtu1mUD6oQ/+b5GSgIgWxjem+zDb7Y+80RMVmXBkqW5EONAPGxSFWoWveHY=",
  //     },
  //   ],
  //   uploadUrl: "https://upwork-usw2-prod-file-storage-wp5.s3.us-west-2.amazonaws.com",
  // };

  useEffect(() => {
    if (file?.type?.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setThumbnail(url);
      return () => URL.revokeObjectURL(url);
    } else if (file?.type?.startsWith("video/")) {
      generateVideoThumbnail(file)
        .then(setThumbnail)
        .catch(() => setThumbnail(null));
    }
  }, [file?.file]);

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

  const getFileIcon = () => {
    const type = file.type.split("/")[0];
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

  const getFileType = () => {
    const type = file.type.split("/")[0];
    switch (type) {
      case "image":
        return "Image";
      case "video":
        return "Video";
      case "audio":
        return "Audio";
      case "application":
        return file.type.includes("pdf") ? "PDF" : "File";
      default:
        return "File";
    }
  };

  const getFileSize = (size) => {
    if (size < 1024) {
      return `${size} B`;
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else {
      return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  const getFileSizeWithUploadProgress = (fileSize, progress) => {
    if(progress === 100) return getFileSize(fileSize);

    return `${getFileSize((fileSize * progress) / 100)}/${getFileSize(fileSize)}`;
  }

  return (
    <div className="relative flex items-center gap-2 w-64 rounded-lg border p-3">
      <Button variant="secondary" size="icon" onClick={onRemove} className="absolute h-6 w-6 -right-2 [&_svg]:size-4 -top-2 p-0 rounded-full">
        <X />
      </Button>

      <div className="aspect-square flex justify-center items-center w-16 overflow-hidden rounded-md bg-gray-100">
        {thumbnail ? (
          <Image height={180} width={180} src={thumbnail} alt={file.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col justify-center items-center gap-1">
            {getFileIcon()}
            <span className="font-medium text-sm">{getFileType()}</span>
          </div>
        )}
      </div>
      <div className="flex-1 flex-col justify-center">
        <div className="mb-2 truncate text-sm">{file?.name?.length > 24 ? file.name?.slice(0, 24) + "..." : file.name}</div>
        <div className="space-y-2">
          {error ? (
            <div className="flex items-center gap-2">
              <FileWarning color="#dc2626" size={20} />
              <p className="text-red-600 text-xs font-semibold text-wrap flex-1">{error}</p>
            </div>
          ) : (
            <>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between">
                <div className="text-[12px] text-gray-600 font-semibold">{getFileSizeWithUploadProgress(file.size, progress)}</div>
                {progress == 100 ? <div className="text-[12px] text-green-600 font-semibold">Uploaded!</div> : <div className="text-[12px] text-gray-600 font-semibold">{progress}%</div>}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
