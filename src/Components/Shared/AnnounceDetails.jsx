import React from 'react';
import { useLoaderData } from 'react-router-dom';

const AnnounceDetails = () => {
    const discuss=useLoaderData();
    return (
      <div className="w-1/2 m-auto">
        <div className="m-4 lg:w-1/2">
          <h1 className="text-2xl mb-2">{discuss.title}</h1>
          <div className="w-96 h-56">
            <img className="w-full h-full" src={discuss?.image}></img>
          </div>
          <h1 className="text-xl mt-4 mb-2">{discuss.details}</h1>
        </div>
        <div className="mt-4 mb-40 ml-4 lg:w-1/2">
          Posted By :<div className="ml-4 ">{discuss.admin}</div>
        </div>
      </div>
    );
};

export default AnnounceDetails;