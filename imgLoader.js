var imgLoader = {
  config: {
    container: '.imgContainer',
    images: '#images',
    imageLoadBtn: '.loadImages',
    defaultSplice: 4,
    url: 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?'
  },
  imgData = [],

  init: function(config){
  // extend outer config with our config - future purposes
  $.extend(imgLoader.config, config);
  },

  // get data from Json feed
  loadData: function(){
    $.getJSON(url, {
      tags: 'earthporn',
      tagmode: 'any', 
      format: 'json'
    })
    .done(function(data){
      // set the imgData array to the images of the data we pulled
      imgLoader.imgData = data.items;
      // run the initial add data so we have 4 images loaded automatically
      imgLoader.addData(imgLoader.config.defaultSplice);
    });
  },

  // add more images to the array, take a num as a parameter
  addData: function(num){
    // set splice 1 element from index 0 of the total array (imgData)
    var push = imgLoader.imgData.splice(0,num || 1);
    
    // if the array is greater than 0, add it to the DOM 
    if (push.length > 0){
      console.log(push.length);

      // map iterates through an array and runs a function on every object.
      // We take an individual img (img) pass it through the function and append it to the DOM
      push.map(function(img) {
        $('<img>').attr('src', img.media.m).appendTo(imgLoader.config.images);
      });
    }
    // otherwise disable adding buttons
    else
    $('.loadImages').addClass('disabled');
  },

  // remote an image from the DOM
  removeData: function(num){
    $('#images > img:last').remove();
  }
};

$(document).ready(function() {
  //initialize pulling of Data
  imgLoader.loadData();
  $('.loadImages').click(function(){
    imgLoader.addData(1);
  });
  $('.removeImages').click(function(){
    imgloader.removeData(1);
  });
});
