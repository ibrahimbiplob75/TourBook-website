import React, { useContext } from 'react';
import AxiosPublic from '../AxiosPublic/AxiosPublic';
import { AuthProvider } from '../ContextProvider/ContextProvider';
import { useQuery } from '@tanstack/react-query';

const PostData = () => {
    const [axiosPublic] = AxiosPublic();
    const { user } = useContext(AuthProvider);

    const { refetch, data: discussion = [] } = useQuery({
      queryKey: ["discussion", user?.email],
      queryFn: async () => {
        const res = await axiosPublic.get(`/discussion`);
        console.log("Data of discussion", res);
        return res.data;
      },
    });
    return [discussion, refetch];
    
};

export default PostData;