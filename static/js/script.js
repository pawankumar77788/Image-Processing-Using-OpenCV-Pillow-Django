let imgElement = document.getElementById('img_copy');
let inputElement = document.getElementById('fileInput');

var img = document.querySelector('#img_element');
var owi = document.getElementById('original_width');
var ohi = document.getElementById('original_height');
var mycan = document.getElementById('myCanvas');
var con = document.getElementById('contour');
img.onload = function(){
  document.getElementById('original_width').innerHTML = img.naturalWidth;
  document.getElementById('original_height').innerHTML = img.naturalHeight;
  document.getElementById('contour').style.width = String(mycan.width/(img.naturalWidth/img.width)) + "px";
  document.getElementById('contour').style.height = String(mycan.height/(img.naturalHeight/img.height)) + "px";
  // let mat = cv.imread(imgElement);
  // cv.imshow('myCanvas', mat);
  // mat.delete();
}
$( function() {
    $( "#contour" ).draggable({containment:"#img_element"});
  } );
var contour_element = document.getElementById('contour');
contour_element.ondrag = function(){
  //console.log("moved");
  var output = $("#contour").position();
  // document.getElementById('outputposition').innerHTML = String((output.top - 8)*(img.naturalHeight/500)) + " , " + String((output.left - 8)*(img.naturalWidth/1000));
  let src = cv.imread(imgElement);
  // console.log('image width: ' + src.cols + '\n' +
  //             'image height: ' + src.rows + '\n' +
  //             'image size: ' + src.size().width + '*' + src.size().height + '\n' +
  //             'image depth: ' + src.depth() + '\n' +
  //             'image channels ' + src.channels() + '\n' +
  //             'image type: ' + src.type() + '\n');
  let dst = new cv.Mat();
  // You can try more different parameters
  let rect = new cv.Rect((output.left - 8)*(img.naturalWidth/img.width), (output.top - 8)*(img.naturalHeight/img.height), mycan.width, mycan.height);
  dst = src.roi(rect);
  cv.imshow('myCanvas', dst);
  src.delete();
  dst.delete();
}

inputElement.addEventListener('change', (e) => {
  imgElement.src = URL.createObjectURL(e.target.files[0]);
  img.src = URL.createObjectURL(e.target.files[0]);
  owi.style.display = "inline-block";
  img.style.display = "inline-block";
  mycan.style.display = "inline-block";
  con.style.display = "inline-block";
}, false);
// imgElement.onload = function() {
//   let mat = cv.imread(imgElement);
//   cv.imshow('myCanvas', mat);
//   mat.delete();
// };
// function onOpenCvReady() {
//   document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
// }
function function1(){
  download(myCanvas,'cropped.jpeg');
}

function download(canvas, filename) {
  /// create an "off-screen" anchor tag
  var lnk = document.createElement('a'), e;

  /// the key here is to set the download attribute of the a tag
  lnk.download = filename;

  /// convert canvas content to data-uri for link. When download
  /// attribute is set the content pointed to by link will be
  /// pushed as "download" in HTML5 capable browsers
  lnk.href = canvas.toDataURL("image/jpeg;base64");

  /// create a "fake" click-event to trigger the download
  if (document.createEvent) {
    e = document.createEvent("MouseEvents");
    e.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false,
                     false, 0, null);

    lnk.dispatchEvent(e);
  } else if (lnk.fireEvent) {
    lnk.fireEvent("onclick");
  }
}