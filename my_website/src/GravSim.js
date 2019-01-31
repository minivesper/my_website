import React, { Component } from 'react';
import './App.css';

class ibody {
  constructor(id,mass,xpos,ypos,xvel,yvel,radius) {
    this.id = id;
    this.mass = mass;
    this.x = xpos;
    this.y = ypos;
    this.xvel = xvel;
    this.yvel = yvel;
    this.radius = radius;
  }

  toString() {
    console.log("Body: "+this.id+" "+this.mass+" "+this.x+" "+this.y+" "+this.xvel+" "+this.yvel+" "+this.radius)
  }
}

class GravSim extends Component {
  randomInt(min,max) // min and max included
  {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  initializeBodies() {
    var bodyList = [new ibody(1,100,100,150,0,5,5),new ibody(2,1000,300,225,0,0,50),new ibody(3,100,500,300,0,-5,5)]
    // for (var i = 0; i < 100; i++) {
    //   bodyList.push(new ibody(i,100,this.randomInt(40, 600),225,0,0,5))
    // }
    return bodyList
  }

  updateSingle(curr_body, rel_body) {
    var id, mass, x_pos, y_pos, x_vel, y_vel, radius

    var t = 0.5, g = 0.067

    var ax_sign, ay_sign
    if(rel_body.x - curr_body.x < 0) {
      ax_sign = -1;
    }
    else if(rel_body.x - curr_body.x > 0) {
      ax_sign = 1;
    }
    else {
      ax_sign = 0;
    }

    //set up signs
    if(rel_body.y - curr_body.y < 0) {
      ay_sign = -1;
    }
    else if(rel_body.y - curr_body.y > 0) {
      ay_sign = 1;
    }
    else {
      ay_sign = 0;
    }

    var accel = (g*(curr_body.mass + rel_body.mass))/(Math.sqrt(Math.pow((rel_body.x - curr_body.x),2)+Math.pow((rel_body.y - curr_body.y),2)))

    var angleBetween = Math.atan(Math.abs(rel_body.y - curr_body.y)/Math.abs(rel_body.x - curr_body.x));
    var x_accel = ax_sign*accel*Math.cos(angleBetween);
    var y_accel = ay_sign*accel*Math.sin(angleBetween);


    id = curr_body.id
    mass = curr_body.mass
    x_pos = curr_body.x + curr_body.xvel*t + (.5*x_accel*(Math.pow(t,2)))
    y_pos = curr_body.y + curr_body.yvel*t + (.5*y_accel*(Math.pow(t,2)))
    x_vel = curr_body.xvel + x_accel*t
    y_vel = curr_body.yvel + y_accel*t
    radius = curr_body.radius

    var ret_body = new ibody(id, mass, x_pos, y_pos, x_vel, y_vel, radius)
    // ret_body.toString()
    return ret_body
  }

  updateBodies(bodylist) {
    var newBodies = []
    for(var curr_body in bodylist) {
      for(var rel_body in bodylist) {
        if(bodylist[curr_body].id !== bodylist[rel_body].id) {
          var updatedBody = this.updateSingle(bodylist[curr_body], bodylist[rel_body]);
          bodylist[curr_body] = updatedBody
        }
      }
      newBodies.push(bodylist[curr_body])
    }
    return newBodies
  }

  drawBody(body) {
    const canvas = this.refs.Grav_canvas
    const ctx = canvas.getContext("2d")
    ctx.beginPath();
    ctx.ellipse(body.x, body.y, body.radius, body.radius, Math.PI / 4, 0, 2 * Math.PI);
    ctx.stroke()
    ctx.fillStyle = "black"
    ctx.fill()
  }


  animate(context, bodies) {
    const canvas = context.refs.Grav_canvas
    const ctx = canvas.getContext("2d")
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    bodies = context.updateBodies(bodies)
    for (var b in bodies) {
      context.drawBody(bodies[b])
    }
  }

  componentDidMount() {
    const canvas = this.refs.Grav_canvas
    const ctx = canvas.getContext("2d")
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    var bodies = this.initializeBodies()
    var that = this
    setInterval(this.animate, 50, that, bodies);
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
