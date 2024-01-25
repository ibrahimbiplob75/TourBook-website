
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SectionTitle from "../../Shared/SectionTitle";
import AxiosPublic from "../../../AxiosPublic/AxiosPublic";
import UseAxiosSecure from "../../../AxiosSecure/UseAxiosSecure";
import { useContext } from "react";
import { AuthProvider } from "../../../ContextProvider/ContextProvider";


const imgApi=import.meta.env.VITE_IMGBB_API_KEY;
const hostApi = `https://api.imgbb.com/1/upload?key=${imgApi}`;

const AddItem = () => {
  const { register, handleSubmit, reset } = useForm();
  const [axiosPublic]=AxiosPublic()
  const [axiosSecure] = UseAxiosSecure();
  const {user}=useContext(AuthProvider)
  
  const onSubmit = async(data) => {
    const imgFile = { image: data.image[0] };
    const res = await axiosPublic.post(hostApi, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(user)
    if(res.data.success){
      const announce={
        title:data.title,
        admin:user?.displayName,
        date:new Date(),
        details:data.details,
        image:res.data.data.display_url,
      }
      const result = await axiosSecure
        .post("/anouncement", announce)
        .then((res) => {
          if (res.data.insertedId) {
            reset();
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Announcement Added by ${user?.displayName}`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });


    }
    
  };

  return (
    <div className="w-full px-10">
      <SectionTitle
        subTitle="Make Anouncement"
        title="Add as A Notice"
      ></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold"> Title*</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true, maxLength: 120 })}
            className="input input-bordered w-full "
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Announce Details</span>
          </label>
          <textarea
            {...register("details", { required: true })}
            className="textarea textarea-bordered h-24"
            placeholder="Descriptions"
          ></textarea>
        </div>
        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Announce Image*</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full "
          />
        </div>
        <div>
          <input
            className="btn btn-info mt-4 text-white"
            type="submit"
            value="Annaunce"
          />
        </div>
      </form>
    </div>
  );
};

export default AddItem;
