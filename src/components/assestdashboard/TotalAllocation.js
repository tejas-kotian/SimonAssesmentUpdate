import React from "react";
import PropTypes from "prop-types";

const TotalAllocation = ({ allocation, onConfirm, onReset }) => (
  <div className="col md-12 h-45">
  <div className="row border rounded  border-lightgray content-color">
    <div className="col-md-1 align-self-center p-1">
    <span className={"border " + (allocation <100?' border-danger':' border-success') }>
 {allocation} </span>
    </div>
    <div className="col-md-3 align-self-center p-1">
      <span className="small align-self-center" style={{color:"#052948"}}> Total Allocation </span>
    </div>
    <div className="col-md-2" />
    <div className="col-md-6 ml-auto p-2">
      <button type="button" className={"m-3 btn btn-default pull-right text-center " + (allocation ===100?'':'disabled') }onClick={onConfirm}>Confirm</button>
      <a className="m-3 anchor pull-right text-center" onClick={onReset}>Reset</a>
    </div>
  </div>
  </div>
);

TotalAllocation.propTypes = {
  allocation: PropTypes.number,
  onConfirm: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired
};

export default TotalAllocation;
