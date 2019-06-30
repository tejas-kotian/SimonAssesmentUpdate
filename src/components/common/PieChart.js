import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

function degsToRadians(degs) {
  return (degs / 360) * (2 * Math.PI)
}

class PieChart extends React.Component {
  
  static propTypes = {
    colors: PropTypes.array,
    data: PropTypes.array.isRequired,
    size: PropTypes.number,
    lineWidth: PropTypes.number
  };
  
  static defaultProps = {
    colors: ['#3299CC', '#236B8E', '#4E78A0', '#0276FD'],
    size: 200,
    lineWidth: 25
  };
  
  componentDidMount() {

    this.draw();
  }
  

  componentDidUpdate(){
    this.draw();
  }
  draw() {
    // eslint-disable-next-line react/no-find-dom-node
    const canvas = ReactDOM.findDOMNode(this);
    const c = canvas.getContext('2d');
    const center = this.props.size / 2;
    const lineWidth = this.props.lineWidth;
    const radius = center - (lineWidth / 2);
    c.lineWidth = lineWidth;
    
    const dataTotal = this.props.data.reduce((r, dataPoint) => r + dataPoint, 0);
    let startAngle = degsToRadians(-90);
    let colorIndex = 0;
    this.props.data.forEach((dataPoint, i) => {
      const section = dataPoint / dataTotal * 360;
      const endAngle = startAngle + degsToRadians(section);
      const color = this.props.colors[colorIndex];
      colorIndex++;
      if (colorIndex >= this.props.colors.length) {
        colorIndex = 0;
      }
      c.strokeStyle = color;
      c.beginPath();
      c.arc(center, center, radius, startAngle, endAngle);
      c.stroke();
      startAngle = endAngle;
    });
  }

  render() {
    return (
      <canvas
        height={this.props.size}
        width={this.props.size}
      />
    );
  }
}
PieChart.propTypes = {
  data: PropTypes.array.isRequired
};
export default PieChart;
