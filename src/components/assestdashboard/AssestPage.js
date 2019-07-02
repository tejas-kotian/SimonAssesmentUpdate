import React from "react";
import { connect } from "react-redux";
import * as assestActions from "../../redux/actions/assestActions";
import StrategyList from "../assestdashboard/StrategyList";
import TotalAllocation from "../assestdashboard/TotalAllocation";
import ToggleAction from "../assestdashboard/ToggleAction";
import Dashboard from "../assestdashboard/Dashboard";
import DashboardItem from "../assestdashboard/DashboardItem";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
import { allocationUtil, filterItems,filterItemsPie } from "../../util/allocationUtil";


class AssestPage extends React.Component {
  componentDidMount() {
    const { assests, actions } = this.props;

    if (assests.length === 0) {
      actions.loadAssests().catch(error => {
        alert("Loading assests failed" + error);
      });
    }
  }

  handleSelectedToggle = (toggleID, isSelected) => {

      this.props.actions.setSelectedToggle(toggleID, isSelected);
  };

  handlePercentageChange = event => {

      let _totalAllocation = 0;
      let _actualTotal = allocationUtil(this.props.assests);
       let _itemExist = this.props.assests.filter (c => c.id == event.target.id && c.val !== undefined &&  isNaN(c.val) ==false);
       if(_itemExist && _itemExist.length > 0){
          _totalAllocation = _actualTotal - _itemExist[0].val;
           if(event.target.value != '') {
          _totalAllocation += parseInt(event.target.value);
           }
       } 
     

    if (event.target.value <= 100 && _totalAllocation <=100) {
      
        this.props.actions.onPercentEnter(
          event.target.id,
          parseInt(event.target.value)
        );
      
    } else {
      event.preventDefault();
    }
  };

  handleReset = () => {
    this.props.actions.resetAssestEntered();

    toast.info("Reset the data successfully");
  };

  handleConfirm = () => {
    if (this.props.allocation === 100) {
      toast.success("Confirming the data successfully");
    } else {
      toast.info("Allocation should be complete 100 % to submit the strategy plan");
    }
  };

  handleSubmit = () => {
    if (this.props.allocation === 100) {
    toast.success("Submit the data successfully");
    }else  {
      toast.info("Allocation should be complete 100 % to submit the strategy plan");
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <h2>Allocation Strategy</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
            <div className="row border">
              <div className="col-md-12 rounded headerBackground headerfontcolor">
                 Allocation Strategy
                </div>
              <div className="col-sm-3 col-md-6 col-lg-4 content-color">
                <div className="row mt-3">
                  
                      
                      <Dashboard pieItems={this.props.pieItems}></Dashboard>
                  
                </div>
                <div className="row ml-2" style={{"width":"276px"}}>
                  <DashboardItem
                    assestsEntered={this.props.assestsEntered}
                    handleSubmit={this.handleSubmit}
                    allocation={this.props.allocation}
                  />
                </div>
              </div>
              <div className="col-sm-9 col-md-6 col-lg-8">
              <div className="row ml-3 mr-3 mb-3 mt-3">
                <ToggleAction
                  handleSelectedToggle={this.handleSelectedToggle}
                  toggleSelected={this.props.toggleSelected}
                />
                </div>
                <div className="row ml-3 mr-3 mb-3 mt-3">
                <StrategyList
                  strategies={this.props.assests}
                  onPercentEnter={this.handlePercentageChange.bind(this)}
                />
                </div>
                <div className="row ml-3 mr-3 mb-3 mt-3">
                <TotalAllocation
                  allocation={this.props.allocation}
                  onConfirm={this.handleConfirm}
                  onReset={this.handleReset}
                />
                </div>
              </div>
            </div>
          
        )}
      </div>
    );
  }
}

AssestPage.propTypes = {
  assests: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  allocation: PropTypes.number,
  toggleSelected:PropTypes.array.isRequired,
  assestsEntered:PropTypes.array.isRequired,
  pieItems:PropTypes.array
};

function mapStateToProps(state) {
  return {
    assests: state.assests,
    loading: state.apiCallsInProgress > 0,
    allocation: allocationUtil(state.assests),
    assestsEntered: filterItems(state.assests),
    toggleSelected : state.toggle,
    pieItems:filterItemsPie(filterItems(state.assests))

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadAssests: bindActionCreators(assestActions.loadAssest, dispatch),
      setSelectedToggle: bindActionCreators(
        assestActions.setSelectedToggle,
        dispatch
      ),
      onPercentEnter: bindActionCreators(
        assestActions.onPercentEnter,
        dispatch
      ),
      resetAssestEntered: bindActionCreators(
        assestActions.resetAssestEntered,
        dispatch
      )
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssestPage);
