import React from 'react';
import Avatar from 'avataaars';
import gameIcon from '../../wom.png';

function Node() {
  this.addProperty("interval", 1500);
  this.addProperty("avatarType", 0);
  this.addProperty("event", "tick");
  this.addInput("", -1);
  this.addInput("", -1);
  this.addInput("", -1);
  this.addInput("", -1);
  this.addInput("", -1);
  this.horizontal = false;
  this.size[0] = 140;

}


Node.title = "Game";
Node.desc = "Game";
Node.title_color = "#6b6b6b";

Node.prototype.onStart = function() {
  this.time = 0;
};

Node.prototype.getTitle = function() {
  return this.title;
};

Node.on_color = "#AAA";
Node.off_color = "#222";

Node.prototype.onDrawBackground = function() {
  this.boxcolor = this.triggered
  ? Node.on_color
  : Node.off_color;
  this.triggered = false;

  if (this.flags.collapsed) {
    this.destory()///SHOULD WE DESTORY THE ELEMENT FROM THE DOM OR JUST NOT SHOW IT?! THIS SEEMS WEIRD
  }else{
    this.render(
      <div>
        <img
          alt="gameIcon"
          src={gameIcon}
          style={{width: '150px', height: '100px'}}
        />
      </div>
    )
  }
};


Node.prototype.onGetInputs = function() {
  return [["interval", "number"]];
};

Node.prototype.onGetOutputs = function() {
  return [["tick", "boolean"]];
};

export default Node
