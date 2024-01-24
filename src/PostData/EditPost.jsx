import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import AxiosPublic from '../AxiosPublic/AxiosPublic';
import UseAxiosSecure from '../AxiosSecure/UseAxiosSecure';
import { AuthProvider } from '../ContextProvider/ContextProvider';
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const imgApi = import.meta.env.VITE_IMGBB_API_KEY;
const hostApi = `https://api.imgbb.com/1/upload?key=${imgApi}`;
const EditPost = () => {
    const { register, handleSubmit } = useForm();
       const { user } = useContext(AuthProvider);
       const [axiosPublic] = AxiosPublic();
       const [axiosSecure] = UseAxiosSecure();
       const [selectedTag, setSelectedTag] = useState("");
       const [subTags, setSubTags] = useState([]);
       const Prevdata=useLoaderData();
       const navigate=useNavigate()

       const tags = [
         "Select One",
         "Travel Activities",
         "Travel Planning",
         "Accommodations",
         "Transportation",
         "Local Cuisine",
         "Photography and Videography",
         "Cultural Exchange",
         "Events and Festivals",
         "Challenges and Adventures",
         "Community and Meetups",
         "Gear and Essentials",
         "Travel Tips and Hacks",
         "Safety and Health",
         "Environmental Sustainability",
       ];

       // Map of tags to their corresponding subtags
       const subTagsMap = {
         "Travel Activities": [
           "Select One",
           "Adventure Travel",
           "Beach Vacations",
           "Hiking and Trekking",
           "Cultural Experiences",
           "Wildlife Safari",
           "City Exploration",
           "Road Trips",
         ],
         "Travel Planning": [
           "Select One",
           "Trip Planning",
           "Itinerary Ideas",
           "Budget Travel",
           "Solo Travel",
           "Family-Friendly Travel",
           "Travel Insurance",
         ],
         Accommodations: [
           "Select One",
           "Hotels",
           "Hostels",
           "Vacation Rentals",
           "Camping",
         ],
         Transportation: [
           "Select One",
           "Flights",
           "Trains",
           "Buses",
           "Car Rentals",
           "Cruises",
         ],
         "Local Cuisine": [
           "Select One",
           "Foodie Adventures",
           "Local Restaurants",
           "Culinary Experiences",
         ],
         "Photography and Videography": [
           "Select One",
           "Travel Photography",
           "Video Diaries",
           "Camera Gear",
         ],
         "Cultural Exchange": [
           "Select One",
           "Cultural Insights",
           "Language Learning",
           "Local Traditions",
         ],
         "Events and Festivals": [
           "Select One",
           "Oktoberfest",
           "Carnival",
           "New Year's Eve Celebrations",
         ],
         "Challenges and Adventures": [
           "Select One",
           "Backpacking",
           "Digital Nomad Lifestyle",
           "Extreme Adventures",
         ],
         "Community and Meetups": [
           "Select One",
           "Travel Meetups",
           "Community Spotlights",
         ],
         "Gear and Essentials": [
           "Select One",
           "Packing Tips",
           "Travel Gadgets",
           "Outdoor Gear",
         ],
         "Travel Tips and Hacks": [
           "Select One",
           "Insider Tips",
           "Travel Hacks",
           "Saving Money While Traveling",
         ],
         "Safety and Health": [
           "Select One",
           "Travel Safety Tips",
           "Health Precautions",
         ],
         "Environmental Sustainability": [
           "Select One",
           "Eco-Friendly Travel",
           "Responsible Tourism",
         ],
       };

       const handleTagChange = (selectedTag) => {
         setSelectedTag(selectedTag);
         setSubTags(subTagsMap[selectedTag] || []);
       };
       

       const onSubmit = async (data) => {
         const imgFile = { image: data.image[0] };
         const res = await axiosPublic.post(hostApi, imgFile, {
           headers: {
             "content-type": "multipart/form-data",
           },
         });

         const formData = {
           title: data.name,
           userName: user?.displayName,
           profileURL: user?.photoURL,
           email: user?.email,
           tag: data.tag,
           subTag: data.subTag,
           descriptions: data.descriptions,
           image: res?.data.data.display_url,
           date: new Date(),
         };

         console.log(formData);
         const result = await axiosSecure
           .patch(`/discussion/${Prevdata._id}`, formData)
           .then((res) => {
             if (res.data.modifiedCount>0) {
               Swal.fire({
                 position: "center",
                 icon: "success",
                 title: ` Your Discussion has updated`,
                 showConfirmButton: false,
                 timer: 1500,
               });
               navigate("/");
             }
           });
       };
    return (
      <div>
        <div className="m-12 text-center">
          <h2 className="text-5xl font-light mb-2">Update Discussion</h2>
          <h1 className="mb-8 text-red-600">
            Remember that posts are subject to Tourbook Community Policy.
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="label-text font-semibold">Title*</span>
              </label>
              <input
                type="text"
                placeholder="Discussion Title"
                defaultValue={Prevdata.title}
                {...register("name", { required: true, maxLength: 120 })}
                className="input input-bordered w-full "
              />
            </div>
            <div className="flex my-4">
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text">Tag*</span>
                </label>
                <select
                  {...register("tag", { required: true })}
                  className="select select-bordered"
                  defaultValue={Prevdata.tag}
                  onChange={(e) => handleTagChange(e.target.value)}
                >
                  <option disabled>select One</option>
                  {tags.map((tag) => (
                    <option key={tag}>{tag}</option>
                  ))}
                </select>
              </div>
              <div className="form-control w-full mx-4">
                <label className="label">
                  <span className="label-text">Sub Tag*</span>
                </label>
                <select
                  {...register("subTag", { required: true })}
                  className="select select-bordered"
                  defaultValue={Prevdata.subTag}
                >
                  <option disabled>select One</option>
                  {subTags.map((subTag) => (
                    <option key={subTag}>{subTag}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                {...register("descriptions", { required: true })}
                className="textarea textarea-bordered h-24"
                placeholder="Discussion description"
                defaultValue={Prevdata.descriptions}
              ></textarea>
            </div>
            <div className="form-control w-full my-4">
              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                type="file"
                {...register("image")}
                className="file-input file-input-bordered w-full "
                required
              />
            </div>
            <div className="text-center">
              <input
                className="btn btn-info text-white"
                type="submit"
                value="Update post"
              />
            </div>
          </form>
        </div>
      </div>
    );
};

export default EditPost;