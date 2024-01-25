import React, { useContext, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  FaCommentAlt,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaShareAlt,
} from "react-icons/fa";
import AxiosPublic from '../../AxiosPublic/AxiosPublic';
import { AuthProvider } from '../../ContextProvider/ContextProvider';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

const formateDate = (date) => {
  const currentDate = new Date();
  const postDate = new Date(date);
  const timeDef = currentDate - postDate;

  const seconds = Math.floor(timeDef / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (days < 31) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
};


const DiscussionDetails = () => {
    const [publicAxios] = AxiosPublic();
    const discuss = useLoaderData();
    const { date } = discuss;
    const { handleSubmit, reset } = useForm();
    const postTime = formateDate(date);
    const {user}=useContext(AuthProvider);
    const [newComment, setNewComment] = useState("");
 


    const textareaRef = useRef(null);

    const handleCommentButtonClick = () => {
      textareaRef.current.focus();
    };

   
    console.log(discuss);
    const TotalLiked=discuss?.likes || 0;
    const likestate = discuss.userID === user?.email ;
    const [liked, setLiked] = useState(!likestate);
    const [likeCount, setLikeCount] = useState(1);


    const handleLikeClick = async () => {
     
      const updatedLikeCount = liked ? likeCount - 1 : likeCount + 1;
      
      const result = await publicAxios
        .patch(`/discussion/${discuss._id}/like`, 
        {liked:updatedLikeCount,userID:user?.email})
        .then((res) => {
          if (res.data.modifiedCount > 0) {
             reset();
          }
        });

      setLiked(!liked);
      setLikeCount(updatedLikeCount);
    };


 
    

    const handleCommentSubmit = async () => {
        const response = await publicAxios.post(
          `/discussion/${discuss._id}/comments`,
          {
            discuss_id:discuss._id,
            comment: newComment,
            userPhoto: user.photoURL,
            userName: user?.displayName,
          }
          
        );

        if (response.data.insertedId) {
          refetch();
          console.log(response.data);
          // setComments();
           setNewComment("");
        }
      
    };

    
    
    const { data: comments = [], refetch } = useQuery({
      queryKey: ["comments", discuss._id],
      queryFn: async () => {
        const res = await publicAxios.get(
          `/discussion/${discuss._id}/comments`
        );
        console.log("res",res.data);
        return res.data[0];
      },
    });
    
    
    return (
      <div>
        <div className="m-10 ">
          {/* publisher profile photo */}
          <div className="flex flex-wrap col-span-2 items-center">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar "
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={discuss.profileURL}
                />
              </div>
            </div>
            <div className="ml-4 flex flex-col">
              <h1 className="text-xl font-semibold">{discuss.userName}</h1>
              <h2>{postTime}</h2>
            </div>
          </div>
          {/* post summary */}
          <div className="m-4 lg:w-1/2">
            <h1 className="text-2xl">{discuss.title}</h1>
            <div className="w-96 h-56">
              <img className="w-full h-full" src={discuss?.image}></img>
            </div>
            <h1 className="text-xl">{discuss.descriptions}</h1>
          </div>
          <div className="mt-4 mb-2 lg:w-1/2">
            <div className="badge badge-secondary badge-outline">
              {discuss.tag}
            </div>
            <div className="badge badge-accent badge-outline ml-4">
              {discuss.subTag}
            </div>
          </div>
          {/* showing like comment share number */}
          <div className="flex felx-row  lg:w-1/2">
            <button
              className={`btn btn-xs sm:btn-sm md:btn-md lg:btn-lg border-none `}
            >
              <FaRegThumbsUp />
              {likeCount}
            </button>

            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg  bg-base-100 border-none">
              <FaCommentAlt />
            </button>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-base-100 border-none">
              <FaShareAlt />
            </button>
          </div>

          <div className="divider divider-info lg:w-1/2"></div>
          {/* collecting like comment share */}
          <div className="flex felx-row  lg:w-1/2">
            <button
              className={`btn btn-xs sm:btn-sm md:btn-md lg:btn-lg ${
                liked ? "bg-blue-500 text-white" : "bg-base-100"
              } border-none `}
              onClick={handleSubmit(handleLikeClick)}
            >
              {liked ? <FaRegThumbsDown /> : <FaRegThumbsUp />}
              {liked ? "Unlike" : "Like"}
            </button>

            <button
              onClick={handleCommentButtonClick}
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg  bg-base-100 border-none"
            >
              <FaCommentAlt />
              Comment
            </button>
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-base-100 border-none">
              <FaShareAlt />
              <h1>Share</h1>
            </button>
          </div>
          <div className=" divider divider-info lg:w-1/2"></div>
          {/* this section is for show comment */}
          <div>
            <h1>{comments.length}</h1>
            {comments.map((comment) => (
              <h1>{comment.comment}</h1>
            ))}
          </div>

          {/* this section is for write comment */}
          <div>
            <div className="flex flex-row lg:w-1/2 justify-between items-center mb-10 ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar "
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <div className="flex flex-row items-center w-full">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  ref={textareaRef}
                  className="textarea textarea-info w-full"
                  placeholder="white your comment"
                ></textarea>
              </div>
              <button
                onClick={handleCommentSubmit}
                className="btn btn-success ml-2"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
    
};

export default DiscussionDetails;