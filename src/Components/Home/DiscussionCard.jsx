import { FaCommentAlt, FaRegThumbsDown, FaRegThumbsUp, FaShareAlt } from "react-icons/fa";

const DiscussionCard = () => {
  return (
    <div>
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
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>

          {/* post summary */}
          <div className="ml-4">
            <h1 className="text-2xl">Post title</h1>
            <h3 className="text-xl">Post description</h3>
            <h2>Post time</h2>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1">
          <FaRegThumbsUp />
          <FaRegThumbsDown />
          <FaCommentAlt />
          <FaShareAlt />
        </div>
      </div>
      <div className="divider divider-info"></div>
    </div>
  );
};

export default DiscussionCard;
