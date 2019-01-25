import React, { Component } from 'react';
import './App.css';

class GravSim extends Component {

  drawEllipse() {
    const canvas = this.refs.Grav_canvas
    const ctx = canvas.getContext("2d")
    ctx.beginPath();
    ctx.ellipse(100, 100, 75, 75, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke()
    ctx.fill()
  }

  componentDidMount() {
    this.drawEllipse()
  }

  render() {
    return (
      <div className="GravSim">
        <header className="Grav_header">
          <canvas ref="Grav_canvas" width={640} height={425}></canvas>
        </header>
      </div>
    );
  }
}

export default GravSim
