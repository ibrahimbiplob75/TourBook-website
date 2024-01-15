import React, { useEffect } from 'react';
import DiscussionCard from './DiscussionCard';
import { Link } from 'react-router-dom';
import AxiosPublic from '../../AxiosPublic/AxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Discussion = () => {
  const [publicAxios] = AxiosPublic();
    const {
      data: discussion = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ["discussion"],
      queryFn: async () => {
        const res = await publicAxios.get("/discussion");
        return res.data;
      },
    });
    // console.log(discussion)
    return (
      <div>
        {/* header */}
        <div className="flex flex-row justify-around items-center">
          <h2 className="text-3xl font-bold">Popular Discussion</h2>
          <div className="flex flex-row">
            <div className="dropdown dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-outline btn-info m-1"
              >
                Latest Activity
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Latest Activity</a>
                </li>
                <li>
                  <a>Top Liked</a>
                </li>
                <li>
                  <a>Tags</a>
                </li>
              </ul>
            </div>
            <div className="mt-1">
              <Link to="discussion/form">
                <button className="btn btn-info">Start a Discussion</button>
              </Link>
            </div>
          </div>
        </div>

        {/* body */}
        <div>
          {discussion.map((data) => (
            <DiscussionCard key={data._id} discuss={data}></DiscussionCard>
          ))}
        </div>
      </div>
    );
};

export default Discussion;