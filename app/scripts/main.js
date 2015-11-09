
var arr = [];
var width = 1024,
    height = 512,
    canvasWidth = width;


d3.select("#save").on("click", function() {
  /*
  Convert any html children with a class of 'target_child' 
  within '#target_content' to svg and add them all to 
  a new div with the id of 'output'
  */
  multiSVGtoPNG.convertToSVG({
    input:'#target_content',
    selector:'.target_child',
    output:'#my_svg'
  });
  /*
  Write the now svg only contents of 'output' to a canvas element
  */
  var imgData = multiSVGtoPNG.encode({
    input:'#my_svg',
    output:'#my_canvas'
  });
  /*
  Download the rendered images as an .png
  */
  multiSVGtoPNG.downloadPNG({
    data:imgData,
    filename:'my_image'
  });
  
});