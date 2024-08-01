import { UserButton } from "@clerk/nextjs";
import React, { useEffect, useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { FaImage, FaVideo, FaPoll, FaHeart, FaComment } from "react-icons/fa";
import Image from "next/image";
import { Textarea, User } from "@nextui-org/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";
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
  const { user } = useUser();
  return (
    <div className="p-3">
      <div className="flex gap-3">
        <img src={user?.imageUrl} alt="" className="rounded-full w-10 h-10" />

        <div className="flex-grow">
          <div className="flex gap-1">
            <span className="font-semibold">{user?.fullName}</span>
            <span className="text-sm text-gray-600 content-center">
              @{user?.username}
            </span>
          </div>
          <div className="text-wrapper">
            <p className="text-wrap break-all">{comment}</p>
            {image && (
              <Image
                src={image}
                alt="post content"
                className="w-full h-auto mt-2 rounded-md"
                width={100}
                height={100}
              />
            )}
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
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useUser();

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
      const updatedComments = [newComment, ...comments];
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
    <div className="post-feed shadow-lg rounded-large border-gray-300 p-5 flex flex-col gap-5 w-[60%] h-auto max-[768px]:w-full max-[640px]:w-full">
      <div className="flex gap-3">
        <UserButton />
        <Textarea
          isRequired
          variant="underlined"
          value={comment}
          label="What's for Today?"
          className="max-w-full"
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <hr />
      <div className="pt-5">
        <div className="flex justify-between gap-4 items-center text-blue-600 max-[600px]:flex-col">
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
            className="bg-black text-white font-bold px-10 py-2 font-Inconsolata relative rounded max-[600px]:w-full"
            onClick={handlePost}
          >
            POST
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-5">
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
