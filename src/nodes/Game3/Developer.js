import React from 'react';
import ReactDOM from 'react-dom'
import Avatar from 'avataaars'

function Developer() {
  this.addProperty("interval", 1500);
  this.addProperty("avatarType", 0);
  this.addProperty("event", "tick");
  this.addOutput("", -1);
  this.addOutput("", -1);
  this.addOutput("", -1);
  this.addOutput("", -1);
  this.addOutput("", -1);
  this.horizontal = false;
  this.time = 0;
  this.cash = "💸💸💸💸💸"
  this.mouthType = 'Serious'
  this.last_interval = 1500;
  this.triggered = false;
  this.size[0] = 140;
  this.min = 1500;
  this.max = 1500;

  // avatar settings
  this.avatarSettings = {
    avatarStyle: 'Circle',
    topType: 'ShortHairShortFlat',
    accessoriesType: 'Round',
    hairColor: 'BrownDark',
    facialHairType: 'Blank',
    clotheType: 'CollarSweater',
    clotheColor: 'PastelGreen',
    eyeType: 'Default',
    eyebrowType: 'DefaultNatural',
    skinColor: 'Pale',
    mouthType: 'Serious'
  }

}


Developer.title = "Developer";
Developer.desc = "Devo";

Developer.prototype.onStart = function() {
  this.time = 0;
};

Developer.prototype.getTitle = function() {
  return this.title;
};

Developer.on_color = "#AAA";
Developer.off_color = "#222";

Developer.prototype.onDrawBackground = function() {
  this.boxcolor = this.triggered
  ? Developer.on_color
  : Developer.off_color;
  this.triggered = false;

  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR JUST NOT SHOW IT?! THIS SEEMS WEIRD
  }else{
    this.render(
      <div>
        <Avatar
          style={{width: '100px', height: '100px'}}
          mouthType={this.mouthType}
          {...this.avatarSettings}
        />
      </div>
    )
  }
};

Developer.prototype.onExecute = function() {
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

Developer.prototype.onGetInputs = function() {
  return [["interval", "number"]];
};

Developer.prototype.onGetOutputs = function() {
  return [["tick", "boolean"]];
};

export default Developer
