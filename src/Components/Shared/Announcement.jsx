import React from 'react';
import { Link } from 'react-router-dom';
import AxiosPublic from '../../AxiosPublic/AxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Announcement = () => {
  const [publicAxios] = AxiosPublic();
  const { data: annaunces = [] } = useQuery({
    queryKey: ["annaunces"],
    queryFn: async () => {
      const res = await publicAxios.get("/anouncement");
      return res.data;
      
    },
  });
    return (
      <div>
        <h2 className="text-3xl font-bold text-center">Anouncement</h2>
        {annaunces.map((annaunce) => (
          <div key={annaunce._id} className="overflow-x-auto m-4 shadow-xl h-12">
            <Link to={`/announcement/${annaunce._id}`}>
              <h1 className='m-4'>{annaunce.title}</h1>
            </Link>
          </div>
        ))}
      </div>
    );
};

export default Announcement;