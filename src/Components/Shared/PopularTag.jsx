import React from 'react';
import AxiosPublic from '../../AxiosPublic/AxiosPublic';
import { useQuery } from '@tanstack/react-query';

const PopularTag = () => {
  const [publicAxios] = AxiosPublic();
  const {
    data: tags = [],
    
  } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await publicAxios.get("/tags");
      return res.data;
    },
  });
    return (
      <div>
        <div>
          <h2 className="text-3xl font-bold text-center">Popular Tag</h2>
          <div className="grid grid-cols-1 gap-3 ml-20 mt-10">
            {tags.map((tag) => (
              <div className="badge badge-info badge-outline">
                {tag.tags}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default PopularTag;