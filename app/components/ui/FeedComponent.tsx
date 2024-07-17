import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { FaImage, FaVideo, FaPoll, FaHeart, FaComment } from "react-icons/fa";
import Image from "next/image";

interface FeedContainerProps {
  comment: string;
  image?: string | null;
  userFullName?: string | null | undefined;
}

const FeedContainer: React.FC<FeedContainerProps> = ({
  comment,
  image,
  userFullName,
}) => {
  return (
    <div className="p-3">
      <div className="flex gap-3">
        <div>
          <UserButton />
        </div>
        <div className="flex-grow">
          <div className="flex gap-1">
            <span className="font-semibold">{userFullName}</span>
          </div>
          <div className="text-wrapper overflow-auto">
            <p className="text-wrap w-full">{comment}</p>
            {image && (
              <Image
                src={image}
                alt="post content"
                className="w-full h-auto mt-2"
                width={100}
                height={100}
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
  image?: string | null;
  userFullName?: string | null;
}

const FeedComponent: React.FC = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const storedComments = localStorage.getItem("comments");
        if (storedComments) {
          const parsedComments: CommentItem[] = JSON.parse(storedComments);
          setComments(parsedComments);
        }
      } catch (err) {
        console.error(`Error parsing comments from localStorage: ${err}`);
      }
    };

    fetchComments();
  }, []);

  const handlePost = async () => {
    if (comment.trim() !== "" || selectedImage) {
      const newComment = {
        comment,
        image: selectedImage,
        userFullName: user?.fullName,
      };
      const updatedComments = [...comments, newComment];
      setComments(updatedComments);
      setComment("");
      setSelectedImage(null);
      localStorage.setItem("comments", JSON.stringify(updatedComments));

      try {
        const res = await axios.post("/posts/create-post", {
          id: uuidv4(),
          comment,
          image: selectedImage,
          userFullName: user?.fullName,
        });
      } catch (error) {
        console.error(`Error posting comment: ${error}`);
      }
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
          <div>
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
        {comments.map((item: CommentItem, index: number) => (
          <FeedContainer
            key={index}
            comment={item.comment}
            image={item.image}
            userFullName={item.userFullName}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedComponent;
