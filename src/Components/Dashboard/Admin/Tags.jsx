import React, { useState, useEffect } from "react";
import axios from "axios";
import UseAxiosSecure from "../../../AxiosSecure/UseAxiosSecure";

const TagForm = () => {
  const [axiosSecure]=UseAxiosSecure();
  const [newTag, setNewTag] = useState("");
  const [newSubTag, setNewSubTag] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await axiosSecure.get("/tags");
      setTags(response.data);
    };

    fetchTags();
  }, []);

  const handleAddTag = async () => {
    try {
      const response = await axiosSecure.post("/tags", {
        tags: newTag,
      });
      setTags((prevTags) => [...prevTags, response.data]);
      setNewTag("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddSubTag = async (tagId) => {
    try {
      const response = await axiosSecure.post(`/tags/${tagId}/subtags`, {
        subTag: newSubTag,
      });

      setTags((prevTags) =>
        prevTags.map((tag) =>
          tag._id === tagId ? { ...tag, subTags: response.data.subTags } : tag
        )
      );

      setNewSubTag("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-center shadow-md m-2 h-64">
        <h2 className="text-xl mt-4 ml-2">Add New Tag</h2>
        <div className="flex flex-row">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Enter new tag"
            className="m-2 input input-bordered input-primary w-full max-w-xs"
          />
          <button className="m-2 btn btn-primary" onClick={handleAddTag}>
            Add Tag
          </button>
        </div>

        <h2 className="text-xl mt-4 ml-2">Add New SubTag</h2>
        <select className="h-12 m-2 border-none rounded-xl p-2">
          {tags.map((tag) => (
            <option key={tag._id} value={tag._id}>
              {tag.tags}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={newSubTag}
          onChange={(e) => setNewSubTag(e.target.value)}
          placeholder="Enter new sub-tag"
          className="m-2 input input-bordered input-primary w-full max-w-xs"
        />
        <button
          className="m-2 btn btn-primary"
          onClick={() => handleAddSubTag(selectedTag)}
        >
          Add SubTag
        </button>
      </div>

      <h2 className="mt-10 text-2xl uppercase">Current Tags</h2>
      <pre>{JSON.stringify(tags, null, 2)}</pre>
    </div>
  );
};

export default TagForm;
