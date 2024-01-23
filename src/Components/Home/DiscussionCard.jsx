import { FaCommentAlt, FaRegThumbsDown, FaRegThumbsUp, FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
const formateDate=(date)=>{
    const currentDate=new Date();
    const postDate=new Date(date);
    const timeDef=currentDate - postDate;

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

}
const DiscussionCard = ({ discuss }) => {
  const {date}=discuss;
  const postTime=formateDate(date);

  
  return (
    <div>
      <Link to={`/discussion/${discuss._id}`}>
        <div className="grid grid-cols-3 gap-4 items-center mt-10">
          {/* publisher profile photo */}
          <div className="flex flex-wrap col-span-2 items-center">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={discuss.profileURL}
                />
              </div>
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-semibold">{discuss.userName}</h1>
            </div>

            {/* post summary */}
            <div className="ml-4">
              <h1 className="text-2xl">{discuss.title}</h1>

              <h2>{postTime}</h2>
            </div>
            <div className="m-4">
              <div className="badge badge-secondary badge-outline">
                {discuss.tag}
              </div>
              <div className="badge badge-accent badge-outline ml-4">
                {discuss.subTag}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1">
            <FaRegThumbsUp />
            <FaRegThumbsDown />
            <FaCommentAlt />
            <FaShareAlt />
          </div>
        </div>
      </Link>
      <div className="divider divider-info"></div>
    </div>
  );
};

export default DiscussionCard;
