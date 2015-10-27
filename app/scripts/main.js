
var arr = [];
var pos = 0;
var fillColor = "#666";
var partyName = "other";
var renderInt;
var width = 1024,
    height = 512,
    active = d3.select(null),
    canWidth = width,
    canHeight = height;





function save(){

  //remove existing  canvas
  d3.selectAll('#theCanvas').remove();
  var svgs = d3.select('#multi_svg').selectAll("svg")[0];
  var canvasHeight = 0;
  var currentHeight = 0;

  for(var i=0;i<svgs.length;i++) {
    //add the height of the current object to the currentHeight variable - which is used to position the elements
    canvasHeight += d3.select(svgs[i]).node().getBoundingClientRect().height;
  }

  //set the width and height of the canas element to the required dimensions 
  var theCanvas = d3.select('body').append('canvas')
  .attr('id','theCanvas')
  .attr('width',canWidth)
  .attr('height',canvasHeight);
  
  //create a canvas/context to write to
  var canvas = document.querySelector("canvas"),

  context = canvas.getContext("2d");
  
  //loop through each and draw it to the target context
  for(var i=0;i<svgs.length;i++) {
    //grab a reference to the target elements outerHTML
    var item = d3.select(svgs[i]).attr("version", 1.1).node().outerHTML;
    //console.log(d3.select(svgs[i]).node().getBoundingClientRect().height);
    //encode it as base64
    var imgsrc = 'data:image/svg+xml;base64,'+ btoa(item);
    //create an image
    var image = new Image;
    //assign the base64 encoded data as its src attribute
    image.src = imgsrc;
    //draw the image to the context at the right position
    context.drawImage(image, 0, currentHeight);
    //add the height of the current object to the currentHeight variable - which is used to position the elements
    currentHeight += d3.select(svgs[i]).node().getBoundingClientRect().height;
  }

  //create a reference to the canvas's data URL
  var canvasdata = canvas.toDataURL("image/png");

  //create a link to kick off the download from and trigger it.
  var a = document.createElement("a");
    a.download = "combo.png";
    a.href = canvasdata;
    a.click();

}

function convert_fo(){
   var fos = d3.select('#multi_svg').selectAll(".fo_obj").attr('xmlns','http://www.w3.org/1999/xhtml')[0];
   for(var i=0; i<fos.length; i++) {
    var item = d3.select(fos[i]).node().outerHTML; 
    var elRef = d3.select(fos[i]);
    var elHeight = d3.select(fos[i]).node().getBoundingClientRect().height;
    var elWidth = d3.select(fos[i]).node().getBoundingClientRect().width;
    var newSVG = d3.select(fos[i]).append('svg')
      .attr('xmlns','http://www.w3.org/2000/svg')
      .attr('width',elWidth)
      .attr('height',elHeight)
      .append('foreignObject')
      .attr('width',elWidth)
      .attr('height',elHeight)
      .style('font-family','PrattHeavy')
      .style('width',elWidth)
      .html(item);
   }
   //newSVG.selectAll(".fo_obj").classed("fo_obj", false);
   
}
convert_fo();


d3.select("#save").on("click", function(){
  save();
});