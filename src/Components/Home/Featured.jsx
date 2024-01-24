import React from 'react';
import kuyakata from "../../assets/Kuyakata.jpg"
import picture2 from "../../assets/Rangamai.jpeg"
import picture3 from "../../assets/sentmartin.jpg"
import picture4 from "../../assets/sundorBon.jpg"
const Featured = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="card  bg-base-100 shadow-xl">
          <figure>
            <img src={picture2} alt="place" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Rangamati
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>
              Rangamati is surrounded by natural features like as mountains,
              rivers, lakes, and waterfalls.
            </p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Rangamati</div>
              <div className="badge badge-outline">Chittagang</div>
            </div>
          </div>
        </div>
        <div className="card  bg-base-100 shadow-xl">
          <figure>
            <img src={kuyakata} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Kuyakata
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>It is known as "Sagor Konya" (Daughter of Sea).</p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Kuyakata</div>
              <div className="badge badge-outline">Poyuakhali</div>
            </div>
          </div>
        </div>

        <div className="card  bg-base-100 shadow-xl">
          <figure>
            <img src={picture3} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Sent-Martin
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>
              Saint Martin Island (Bengali: সেন্টমার্টিন দ্বীপ) is a small
              island (area only 3 km2) in the northeastern part of the Bay of
              Bengal, about 9 km south of the tip of the Cox's Bazar-Teknaf
              peninsula
            </p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Sentmartin</div>
              <div className="badge badge-outline">Cox's Bazar</div>
            </div>
          </div>
        </div>
        <div className="card  bg-base-100 shadow-xl">
          <figure>
            <img src={picture4} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Sundarban
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p>
              Sundarbans is a mangrove area in the delta formed by the
              confluence of the Ganges, Brahmaputra and Meghna Rivers in the Bay
              of Bengal.
            </p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">Sundorban</div>
              <div className="badge badge-outline">Khulna</div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Featured;