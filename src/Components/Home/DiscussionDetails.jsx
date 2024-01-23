import React, { useContext, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import {
  FaCommentAlt,
  FaRegThumbsDown,
  FaRegThumbsUp,
  FaShareAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AxiosPublic from '../../AxiosPublic/AxiosPublic';
import { AuthProvider } from '../../ContextProvider/ContextProvider';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

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
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    // const allcomments=discuss.comments[0].commentData.comment;
    // console.log(allcomments)


    const textareaRef = useRef(null);

    const handleCommentButtonClick = () => {
      textareaRef.current.focus();
    };

    console.log("details user", user?.email);

    const TotalLiked=discuss.likes;
    const likestate = discuss.userID === user?.email ;
    const [liked, setLiked] = useState(!likestate);
    const [likeCount, setLikeCount] = useState(TotalLiked);


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

      try {
        const response = await publicAxios.post(
          `/discussion/${discuss._id}/comments`,
          {
            comment: newComment,
            userPhoto: user.photoURL,
            userName: user?.displayName,
          }
        );

        if (response.data.success) {
          setComments([...comments, newComment]);
          setNewComment("");
        }
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
    };
    

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