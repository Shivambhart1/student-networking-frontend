import { UserButton } from "@clerk/nextjs";
import React, { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
// import Avatar from "./public/Avatar.svg";
import { FaImage, FaVideo, FaPoll, FaHeart, FaComment } from "react-icons/fa";
// import {} from "../../fontawesome-free-6.5.2-web/js/fontawesome";
import Image from "next/image";

interface FeedContainerProps {
  comment: string;
  image?: string;
}

const FeedContainer: React.FC<FeedContainerProps> = ({ comment, image }) => {
  const { isLoaded, isSignedIn, user } = useUser();
  return (
    <div className="p-3">
      <div className="flex gap-3">
        <div>
          {/* <Image src={user?. ?? ""} alt="" />
           */}
          <UserButton />
        </div>
        <div className="flex-grow">
          <div className="flex gap-1">
            <span className="font-semibold"></span>
            <span className="text-xs self-center">{user?.fullName}</span>
          </div>
          <div className="text-wrapper overflow-auto">
            <p className="text-wrap w-full">{comment}</p>
            {image && (
              <Image
                src={image}
                alt="post content"
                className="max-w-full h-auto mt-2"
              />
            )}
          </div>
          <div className="flex gap-3 mt-3 justify-around">
            <FaComment className="cursor-pointer" />
            <FaHeart className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface CommentItem {
  comment: string;
  image?: string;
}

const FeedComponent: React.FC = () => {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePost = () => {
    if (comment.trim() !== "" || selectedImage) {
      setComments([{ comment, image: selectedImage }, ...comments]);
      setComment("");
      setSelectedImage(null);
    }
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="post-feed border border-gray-300 p-5 flex flex-col gap-5 w-[60%] max-h-screen overflow-y-auto">
      <div className="flex gap-3">
        <UserButton />
        <input
          type="text"
          value={comment}
          className="p-4 w-full"
          placeholder="What's for Today?"
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <hr />
      <div className="pt-5">
        <div className="flex justify-between gap-4 items-center text-blue-600">
          <div className="">
            <input
              type="file"
              accept="image/*"
              className="file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
            onClick={handlePost}
          >
            Post
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5 overflow-y-auto max-h-96">
        {comments.map((item, index) => (
          <FeedContainer
            key={index}
            comment={item.comment}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedComponent;
