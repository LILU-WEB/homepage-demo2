# This is a clone for [red-company](https://www.red-company.nl/) homepage in angular9

original Made by: http://www.buildinamsterdam.com/

ps: you have to Comment out the following code to make animation to go smoothly in draggabilly.js in node_modules
```
proto.animate = function() {
  // only render and animate if dragging
  if ( !this.isDragging ) {
    return;
  }

  // this.positionDrag();  <===here

  var _this = this;
  requestAnimationFrame( function animateFrame() {
    _this.animate();
  } );

};
```
