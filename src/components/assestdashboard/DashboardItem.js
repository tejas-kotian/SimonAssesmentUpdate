import React from "react";
import PropTypes from "prop-types";
import LogoComponent from "../assestdashboard/LogoComponent";

const DashboardItem = ({ assestsEntered, handleSubmit, allocation }) => (
  
  <div className="card small">
   <div className="card-body fixed-width-276">
   
    {allocation > 0 ?
      assestsEntered.map(assests => {
        return (
          <div
            key={assests.id}
            className={"d-flex mt-3 mb-3 bg-white stuff-" + assests.id}
          >
            <span className="ml-1 text-left">{assests.name}</span>
            <span className="ml-auto percentage-font-color">{assests.val}%</span>
          </div>
        );
      }) : <LogoComponent></LogoComponent>
    }
    <>
      {allocation > 0 && (
        <button
          type="button"
          onClick={handleSubmit}
          className={
            "btn btn-default h-10 w-75 pull-bottom " +
            (allocation === 100 ? "" : "disabled")
          }
        >
          SUBMIT
        </button>
      )}
    </>
    </div>
  </div>
);

DashboardItem.propTypes = {
  assestsEntered: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  allocation: PropTypes.number
};

export default DashboardItem;
