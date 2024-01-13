import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthProvider } from "../ContextProvider/ContextProvider";
import AxiosPublic from "../AxiosPublic/AxiosPublic";


const UseCart = () => {
    const [axiosPublic]=AxiosPublic()
    const {user}=useContext(AuthProvider);
    
    const { refetch,data: cart = [] } = useQuery({
      queryKey: ["cart", user?.email],
      queryFn: async () => {
        const res = await axiosPublic.get(`/carts?email=${user.email}`);
        console.log("Data of Cart",res)
        return res.data;
      },
    });
    return [cart, refetch];
};

export default UseCart;