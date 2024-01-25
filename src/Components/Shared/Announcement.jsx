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
          <div key={annaunce._id} className="overflow-x-auto m-4">
            <table className="table">
              <tbody>
                <tr className="bg-base-200">
                  <Link to={`/announcement/${annaunce._id}`}>
                    <td>{annaunce.title}</td>
                  </Link>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
};

export default Announcement;