
import bg_img from "../../assets/forum_banner.jpg";
import Announcement from "../Shared/Announcement";
import PopularTag from "../Shared/PopularTag";
import SectionTitle from "../Shared/SectionTitle";
import Discussion from "./Discussion";
import Featured from "./Featured";




const Home = () => {
    return (
      <div>
        <div
          className="hero h-96"
          style={{
            backgroundImage: `URL(${bg_img})`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          {/* <div className="hero-content  text-black  w-1/2 h-1/2 text-center">
            <div className="relative w-1/2 ml-40 mt-24">
              <input
                type="text"
                placeholder="Search here...."
                className="input input-bordered input-info w-full pr-16 text-black"
                // value={searchTerm}
                // onChange={handleSearch}
              />
              <button className="btn btn-info text-white text-xl absolute top-0 right-0 rounded-l-none">
                Search
              </button>
            </div>
          </div> */}
          <div className="join">
            <div>
              <div>
                <input
                  className="input input-bordered join-item"
                  placeholder="Search"
                />
              </div>
            </div>
            <select  className="select select-bordered join-item">
              <option disabled defaultValue={"Filter"}>
                Filter
              </option>
              <option>Sci-fi</option>
              <option>Drama</option>
              <option>Action</option>
            </select>
            <div className="indicator">
              {/* <span className="indicator-item badge badge-secondary">new</span> */}
              <button className="btn btn-info join-item">Search</button>
            </div>
          </div>
        </div>

        <div>
          <SectionTitle
            subTitle={"wanna go to a Tour"}
            title={"Featured"}
          ></SectionTitle>
          <Featured></Featured>
        </div>

        <div>
          <SectionTitle
            subTitle={"Hey! Do you want to Ask?"}
            title={"Popular Discussion"}
          ></SectionTitle>
          <div className="grid grid-cols-4 gap-4">
            <div className="felx col-span-1">
              <Announcement></Announcement>
            </div>
            <div className="felx col-span-2">
              <Discussion></Discussion>
            </div>
            <div className="felx col-span-1">
              <PopularTag></PopularTag>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Home;