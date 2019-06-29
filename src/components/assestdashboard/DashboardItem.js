import React from "react";
import PropTypes from "prop-types";
import LogoComponent from "../assestdashboard/LogoComponent";

const DashboardItem = ({ assestsEntered, handleSubmit, allocation }) => (
  <div className="small">
   
   
    {allocation > 0 ?
      assestsEntered.map(assests => {
        return (
          <div
            key={assests.id}
            className="itemBorder mt-3 h-3 d-flex justify-content-between mb-3 text-center bg-white d-flex p-2"
          >
            <span className="text-center flex-wrap">{assests.name}</span>
            <span className="text-center">{assests.val}%</span>
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
);

DashboardItem.propTypes = {
  assestsEntered: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  allocation: PropTypes.number
};

export default DashboardItem;
