import React from "react";
import PropTypes from "prop-types";


const StrategyList = ({ strategies, onPercentEnter}) => {

  return  (
  <table className="table table-bordered mt-3 small">
    <thead className="content-color">
      <tr>
        <td className="font-weight-bold">Index Crediting Strategies</td>
        <td colSpan={2} className="font-weight-bold">1 Year P2P</td>
      </tr>
    </thead>
    <tbody>
      {strategies.map(strategy => {
        return (
          <tr key={strategy.id}>
            <td>{strategy.name}</td>
            <td><span className="font-weight-bold">{strategy.options[0].value}% Cap</span></td>
            <td style={{borderLeft:"0px"}}><span className="percentInput"><  input type="text" name={strategy.name} id={strategy.id}  value={strategy.val || 0}  onChange={onPercentEnter} ></input><span>%</span></span></td>
          </tr>
        );
      })}
    </tbody>
  </table>
);
    }

StrategyList.propTypes = {
  strategies: PropTypes.array.isRequired,
  onPercentEnter: PropTypes.func.isRequired
};

export default StrategyList;
