import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthProvider } from '../ContextProvider/ContextProvider';
import UseAxiosSecure from '../AxiosSecure/UseAxiosSecure';

const CheckAdmin = () => {
    const { user, loader } = useContext(AuthProvider);
    const [axiosSecure]=UseAxiosSecure();
    const { data: isAdmin, isPending: loadingAdmin } = useQuery({
      queryKey: [user?.email, "isAdmin"],
      enabled: !loader,
      queryFn: async () => {
        const response = await axiosSecure.get(`/users/admin/${user?.email}`);
        console.log(response.data);
        return response.data?.isAdmin;
      },
    });
    return [isAdmin,loadingAdmin];
};

export default CheckAdmin;