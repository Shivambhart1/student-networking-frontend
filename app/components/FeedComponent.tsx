import React, { useState } from "react";
// import Avatar from "./public/Avatar.svg";
import { FaImage, FaVideo, FaPoll, FaHeart, FaComment } from "react-icons/fa";
// import {} from "../../fontawesome-free-6.5.2-web/js/fontawesome";

const FeedContainer = ({ comment }: any) => {
  return (
    <div className="p-3">
      <div className="flex gap-3">
        <img src="Avatar.svg" alt="" className="flex w-[10%] h-[10%]" />
        <div>
          <div className="flex gap-1">
            <span className="font-semibold">Shivam Bharti</span>
            <span className="text-xs self-center">@bharti_shivam</span>
          </div>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum
            quidem quam porro cum molestiae magnam in at cumque officia dicta
            amet quos, expedita laboriosam aperiam odio aspernatur quibusdam
            nobis minima necessitatibus eligendi beatae recusandae neque
            nesciunt nam. Assumenda, animi in.
          </p>
          <img src="fearOfGod.jpg" alt="" />
          <div className="flex gap-3 mt-3 justify-around">
            <FaComment className="cursor-pointer" />
            <FaComment className="cursor-pointer" />
            <FaHeart className="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeedComponent = () => {
  const [comment, SetComment] = useState<string>("");

  const handlePost = (e: any) => {};

  return (
    <div className="post-feed border border-grey p-5 flex flex-col gap-5 w-[60%]">
      <div className="flex gap-3">
        <img src="Avatar.svg" alt="" />
        <input
          type="text"
          value={comment}
          className="p-4 w-full"
          placeholder="What's for Today?"
          onChange={(e) => SetComment(e.target.value)}
        />
      </div>
      <hr />
      <div className="border-t-1 pl-5">
        <div className="icons text-blue-600 flex justify-between gap-4 items-center">
          <div className="flex gap-4">
            <FaImage className="cursor-pointer" />
            <FaVideo className="cursor-pointer" />
            <FaPoll className="cursor-pointer" />
          </div>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full">
            Post
          </button>
        </div>
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <FeedContainer key={index} comment={comment} />
      ))}
    </div>
  );
};

export default FeedComponent;
