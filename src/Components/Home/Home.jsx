
import bg_img from "../../assets/forum_banner.jpg";
import Announcement from "../Shared/Announcement";
import PopularTag from "../Shared/PopularTag";
import SectionTitle from "../Shared/SectionTitle";
import Discussion from "./Discussion";
import Featured from "./Featured";




const Home = () => {
    return (
      <div className="-my-44 mb-4">
        <div
          className="hero h-96"
          style={{
            backgroundImage: `URL(${bg_img})`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
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
              <option>Tour</option>
              <option>Hotel</option>
              <option>Discussion</option>
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

        <div className="">
          <SectionTitle
            subTitle={"Hey! Do you want to Ask?"}
            title={"Popular Discussion"}
          ></SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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