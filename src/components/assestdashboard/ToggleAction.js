import React from "react";
import PropTypes from "prop-types";
import Toggle from "../common/Toggle";
import "../common/Toggle.scss";

const ToggleAction = ({ handleSelectedToggle,toggleSelected }) => {


  return (
   <div className="col-md-12" >
      <div className="row toggleBody">
      <div className="col-md-5 p-3">
      <Toggle label="Surrender Charge Period"
        leftText="5-Years"  rightText="7-Years" onToggle={handleSelectedToggle} id="surrenderCharge"
        toggleSelected={toggleSelected}
        >
        </Toggle>
      </div>
      <div className="col-md-2 p-3">

      </div>
    <div className="col-md-5 p-3">
    <Toggle label="Intial Premium"
       leftText="25K-100K" rightText="100K+" onToggle={handleSelectedToggle} id="intialPremium"
       toggleSelected={toggleSelected}
       ></Toggle>
    </div>
       
        </div>
        </div>
        
  );
}
    ToggleAction.propTypes = {
      handleSelectedToggle:PropTypes.func.isRequired,
      toggleSelected:PropTypes.array.isRequired
};

export default ToggleAction;
