Photos = new Meteor.Collection("photos");

if (Meteor.is_client) {

  function upload_mi() {
    var doc = document.documentElement;
        doc.ondragover = function () { this.className = 'hover'; return false; };
        doc.ondragend = function () { this.className = ''; return false; };
      doc.ondrop = function (event) {
        event.preventDefault && event.preventDefault();
        this.className = '';

      var file = event.dataTransfer.files[0];

      var fd = new FormData();
      fd.append("image", file); // Append the file
      fd.append("key", "c879db26338d4bf3867d6d4e4cbc7bf9"); // Get your own key: http://api.imgur.com/

      $('.second').html('and wait............');
     
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "http://api.imgur.com/2/upload.json"); // Boooom!
      xhr.onload = function() {
        var img_src = JSON.parse(xhr.responseText).upload.links.original;

        var timez = new Date();
        var sec = timez.getTime();
        
        Photos.insert({
          photourl: img_src,
          text: $('textarea').val(),
          time: sec
        });

        $('.second').html('then, drag your pic anywhere on this page');
      }

      // whatever, errors
      xhr.send(fd);
      return false;
    };

    setTimeout(function(){  $('.side, textarea').okhover(); }, 500);

  }



  upload_mi();   

  Template.photos.all_photos = function() {
    var items = Photos.find({}).fetch();
    return items.reverse();
  }
}

if (Meteor.is_server) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
