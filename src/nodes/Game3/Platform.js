import React from 'react';

function Platform() {
  this.properties =  {titleColor: "#222", fontSize: 44,blockieSize: 50,placeholder:"",title:"Title",fontFamily:"'Rubik Mono One', sans-serif",color:"#dddddd"}
  this.addProperty("interval", 1500);
  this.addProperty("event", "tick");
  this.addProperty("emoji", "🚂");
  this.addInput("", -1);
  this.addOutput("", -1);
  this.horizontal = false;
  this.time = 0;
  this.last_interval = 1500;
  this.triggered = false;
  this.size[0] = 140;
  this.min = 1500;
  this.max = 1500;
}


Platform.title = "Platform";
Platform.desc = "Platform";
Platform.title_color = "#222";

Platform.prototype.onStart = function() {
  this.time = 0;
};

Platform.prototype.getTitle = function() {
  return this.title;
};

Platform.on_color = "#AAA";
Platform.off_color = "#222";

Platform.prototype.onDrawBackground = function() {
  this.boxcolor = this.triggered
  ? Platform.on_color
  : Platform.off_color;
  this.triggered = false;

  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR JUST NOT SHOW IT?! THIS SEEMS WEIRD
  }else{
    this.render(
      <div>
      </div>
    )
  }
};

Platform.prototype.onPropertyChanged = function() {
this.title_color = this.properties.titleColor;
}

Platform.prototype.onExecute = function() {
  var dt = this.graph.elapsed_time * 1000; //in ms

  var trigger = this.time == 0;

  this.time += dt;
  this.last_interval = Math.max(
    1,
    this._last_v = Math.random() * (this.max - this.min) + this.min
    // this.getInputOrProperty("interval") | 0
  );

  if (
    !trigger &&
    (this.time < this.last_interval || isNaN(this.last_interval))
  ) {
    if (this.inputs && this.inputs.length > 1 && this.inputs[1]) {
      this.setOutputData(1, false);
    }

    if (this.time > 2000)
      this.mouthType = "Smile"

    return;
  }

  this.triggered = true;
  this.time = this.time % this.last_interval;
  this.trigger("", this.properties.event);
  if (this.inputs && this.inputs.length > 1 && this.inputs[1]) {
    this.setOutputData(1, true);
  }
};

Platform.prototype.onGetInputs = function() {
  return [["interval", "number"]];
};

Platform.prototype.onGetOutputs = function() {
  return [["tick", "boolean"]];
};

export default Platform
