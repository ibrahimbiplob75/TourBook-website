import React from 'react';

const PopularTag = () => {
    return (
      <div>
        <div>
          <h2 className="text-3xl font-bold text-center">Popular Tag</h2>
          <div className="grid grid-cols-3 gap-3 m-12">
            <div className="badge badge-secondary badge-outline">secondary</div>
            <div className="badge badge-secondary badge-outline">secondary</div>
            <div className="badge badge-secondary badge-outline">secondary</div>
            <div className="badge badge-secondary badge-outline">secondary</div>
            <div className="badge badge-secondary badge-outline">secondary</div>
            <div className="badge badge-secondary badge-outline">secondary</div>
          </div>
        </div>
      </div>
    );
};

export default PopularTag;