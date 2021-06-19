let imgElement = document.getElementById('img_copy');
let inputElement = document.getElementById('fileInput');
var output = $("#contour").position();
var x_cor, ycor;
var img = document.querySelector('#img_element');
var owi = document.getElementById('original_width');
var ohi = document.getElementById('original_height');
var mycan = document.getElementById('myCanvas');
var mycancopy = document.getElementById('myCanvasCopy');
var con = document.getElementById('contour');

x_cor = (output.top - 8)*(img.naturalHeight/img.height)
y_cor = (output.left - 8)*(img.naturalWidth/img.width)

img.onload = function(){
  $(function() { $("#contour").draggable({containment:"#img_element"}).resizable({containment:"#img_element"}); });
  document.getElementById('original_width').innerHTML = img.naturalWidth;
  document.getElementById('original_height').innerHTML = img.naturalHeight;
  document.getElementById('contour').style.width = String(mycan.width/(img.naturalWidth/img.width)) + "px";
  document.getElementById('contour').style.height = String(mycan.height/(img.naturalHeight/img.height)) + "px";
  let src = cv.imread(imgElement);
  let dst = new cv.Mat();
  let rect = new cv.Rect(0,0,150,150);
  dst = src.roi(rect);
  cv.imshow('myCanvas', dst);
  mycan.style.display = "none";
  cv.imshow('myCanvasCopy', dst);
  mycancopy.style.width = "250px";
  mycancopy.style.height = "250px";
  src.delete();
  dst.delete();
  // let mat = cv.imread(imgElement);
  // cv.imshow('myCanvas', mat);
  // mat.delete();
}
var contour_element = document.getElementById('contour');
contour_element.ondrag = function(){
  //console.log("moved");
  var output = $("#contour").position();
  x_cor = (output.top - 8)*(img.naturalHeight/img.height)
  y_cor = (output.left - 8)*(img.naturalWidth/img.width)
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
  // let rect = new cv.Rect((output.left - 8)*(img.naturalWidth/img.width), (output.top - 8)*(img.naturalHeight/img.height), mycan.width, mycan.height);
  let rect = new cv.Rect((output.left - 8)*(img.naturalWidth/img.width), (output.top - 8)*(img.naturalHeight/img.height), Math.ceil((parseInt(contour_element.style.width.slice(0,-2))/img.width)*img.naturalWidth), Math.ceil((parseInt(contour_element.style.height.slice(0,-2))/img.height)*img.naturalHeight));
  dst = src.roi(rect);
  cv.imshow('myCanvas', dst);
  mycan.style.display = "none";
  cv.imshow('myCanvasCopy', dst);
  mycancopy.style.width = "250px";
  mycancopy.style.height = "250px";
  src.delete();
  dst.delete();
}

$('#contour').bind('mousemove', function(e){
    $('#tail').show();
    if(e.pageY > 335){
      if(e.pageX > 990){
        $('#tail').css({
           left:  e.pageX - 250,
           top:   e.pageY - (e.pageY - 335)
        });
      }else{
        $('#tail').css({
           left:  e.pageX + 20,
           top:   e.pageY - (e.pageY - 335)
        });
      }
    }else{
      if(e.pageX > 990){
        $('#tail').css({
           left:  e.pageX - 250,
           top:   e.pageY
        });
      }else{
        $('#tail').css({
           left:  e.pageX + 20,
           top:   e.pageY
        });
      }  
    }
    $('#contour').bind('mouseleave', function(e){
    $('#tail').hide();
});
});

contour_element.onresize = function(){
  //console.log("moved");
  // console.log(parseInt(contour_element.style.width.slice(0,-2)));
  var output = $("#contour").position();
  x_cor = (output.top - 8)*(img.naturalHeight/img.height)
  y_cor = (output.left - 8)*(img.naturalWidth/img.width)
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
  let rect = new cv.Rect((output.left - 8)*(img.naturalWidth/img.width), (output.top - 8)*(img.naturalHeight/img.height),  Math.ceil((parseInt(contour_element.style.width.slice(0,-2))/img.width)*img.naturalWidth), Math.ceil((parseInt(contour_element.style.height.slice(0,-2))/img.height)*img.naturalHeight));
  dst = src.roi(rect);
  // console.log(dst,src)
  cv.imshow('myCanvas', dst);
  mycan.style.display = "none";
  cv.imshow('myCanvasCopy', dst);
  mycancopy.style.width = "250px";
  mycancopy.style.height = "250px";
  src.delete();
  dst.delete();
  document.getElementById('res').innerHTML = String(Math.ceil((parseInt(contour_element.style.width.slice(0,-2))/img.width)*img.naturalWidth)) + " X " + String(Math.ceil((parseInt(contour_element.style.height.slice(0,-2))/img.height)*img.naturalHeight));
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
function function2(){
  $('#result_img').css("display","none");
  $('#compare_img').css("display","none");
  document.getElementById("result_img").width = document.getElementById("result_img").naturalWidth;
  document.getElementById("result_img").height = document.getElementById("result_img").naturalHeight;
  var downloadimage_file = document.getElementById('result_img');
  var canvas2 = document.getElementById('downloadfile');
  var ctx2 = canvas2.getContext('2d');
  canvas2.width = downloadimage_file.width;
  canvas2.height = downloadimage_file.height;
  ctx2.drawImage(downloadimage_file,0,0);

  download(canvas2,'cropped.jpeg');
  var buttondownload = document.getElementById('downloadcrop');
  buttondownload.scrollIntoView({behavior: "smooth"})
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

// JavaScript function to get cookie by name; retrieved from https://docs.djangoproject.com/en/3.1/ref/csrf/
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

function function1(){
  var formData = new FormData();  
  formData.append('image',$('#fileInput')[0].files[0])
  formData.append('data',JSON.stringify({'x': x_cor,'y': y_cor}))
  formData.append('resolution',JSON.stringify({'width': Math.ceil((parseInt(contour_element.style.width.slice(0,-2))/img.width)*img.naturalWidth),'height':Math.ceil((parseInt(contour_element.style.height.slice(0,-2))/img.height)*img.naturalHeight)}))
  $.ajax({
    type: 'POST',
    url: 'cropped_image',
    enctype: 'multipart/form-data',
    cache: false,
    processData: false,
    contentType: false,
    headers: { "X-CSRFToken": getCookie('csrftoken')},
    //data: {'data': JSON.stringify({'x': x_cor,'y': y_cor})},
    data: formData,
    beforeSend:function(){
      // Show image container
      $("#ajax_status").text("Processing - Approx 30 Sec to render ...");
      var complete = document.getElementById('ajax_status');
      complete.scrollIntoView({behavior: "smooth"})
    },
    complete:function(data){
      // Hide image container_taken
      $("#ajax_status").text("Successfully rendered in "+String(JSON.parse(data.responseText).time_taken)+" Seconds.");
      var instance = JSON.parse(JSON.parse(data.responseText).instance);
      $('#result_img').attr("src","http://127.0.0.1:8000/media/"+instance[0].fields.super_resolution_Img);
      $('#result_img').css("display","inline-block");
      $('#compare_img').attr("src","http://127.0.0.1:8000/media/images/lowresolution/cropped.jpg");
      $('#compare_img').css("display","inline-block");
      $('#downloadcrop').css("display","block");
      var images = document.getElementById('result_img');
      images.scrollIntoView({behavior: "smooth"})
    }
  });
}