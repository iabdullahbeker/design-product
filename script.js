  var canvas = new fabric.Canvas('tshirt-canvas', {
      width: 500,
      height: 490,
      backgroundColor: "#fff",
      selectionLineWidth: 5,
  });

  fabric.Image.fromURL('hoodie_front.png', (img) => {
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height
      })
      canvas.renderAll();
  })
  var text = new fabric.Text('hello world', {
      fontSize: 30,
      fontFamily: 'Impact',
      stroke: '#f00',
      strokeWidth: 3,
  });
  canvas.centerObject(text);

  canvas.add(text);
  canvas.renderAll();

  function updateTshirtImage(imageURL) {
      fabric.Image.fromURL(imageURL, function(img) {
          img.scaleToHeight(300);
          img.scaleToWidth(300);
          canvas.centerObject(img);
          canvas.add(img);
          canvas.renderAll();
      });
  }

  //hide front control
  fabric.Object.prototype.setControlsVisibility({
      ml: false,
      mr: false,
      mtr: false,
      mt: false,
      mb: false
  });


  fabric.Canvas.prototype.customiseControls({
      tl: {
          action: 'rotate',
      },
      tr: {
          action: 'scale',
      },
      bl: {
          action: 'remove',
          cursor: 'pointer',
      },

      br: {
          action: 'scaleY',
      },
      mr: {
          action: function(e, target) {
              target.set({
                  left: 200,
              });
              canvas.renderAll();
          },
          cursor: 'pointer',
      },

  });
  fabric.Object.prototype.transparentCorners = false;
  // basic settings
  fabric.Object.prototype.customiseCornerIcons({
      settings: {
          borderColor: 'black',
          cornerSize: 25,
          cornerShape: 'rect',
          cornerBackgroundColor: 'black',
          cornerPadding: 10,
      },
      tl: {
          icon: 'icons/rotate.svg',
      },
      tr: {
          icon: 'icons/resize.svg',
      },
      bl: {
          icon: 'icons/remove.svg',
      },
      br: {
          icon: 'icons/down.svg',
      },
      mr: {
          icon: 'icons/repair-tools-cross.svg',
      },
      mtr: {
          icon: 'icons/rotate.svg',
      },
  }, function() {
      canvas.renderAll();
  });

  document.getElementById('save').addEventListener("click", () => {

      var svg = document.createElement("div"); // Create a <button> element
      svg.innerHTML = this.canvas.toSVG(); // Insert text
      document.body.appendChild(svg); // Append <button> to <body> 

  })
  // Update the TShirt color according to the selected color by the user
  document.getElementById("tshirt-color").addEventListener("change", function() {
      if (canvas.getActiveObject()) {
          canvas.getActiveObject().set({ stroke: this.value })
          canvas.getActiveObject().set({ fontFamily: "Arial" })
          canvas.getActiveObject().set({ fontSize: 40 })
      } else
          canvas.backgroundColor = this.value;
      canvas.requestRenderAll();
  }, false);

  // Update the TShirt color according to the selected color by the user
  document.getElementById("tshirt-design").addEventListener("change", function() {

      // Call the updateTshirtImage method providing as first argument the URL
      // of the image provided by the select
      updateTshirtImage(this.value);
  }, false);

  // When the user clicks on upload a custom picture
  document.getElementById('tshirt-custompicture').addEventListener("change", function(e) {
      var reader = new FileReader();

      reader.onload = function(event) {
          var imgObj = new Image();
          imgObj.src = event.target.result;

          // When the picture loads, create the image in Fabric.js
          imgObj.onload = function() {
              var img = new fabric.Image(imgObj);

              img.scaleToHeight(300);
              img.scaleToWidth(300);
              canvas.centerObject(img);
              canvas.add(img);
              canvas.renderAll();
          };
      };

      // If the user selected a picture, load it
      if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
      }
  }, false);

  // // When the user selects a picture that has been added and press the DEL key
  // // The object will be removed !
  // document.addEventListener("keydown", function(e) {
  //     var keyCode = e.keyCode;

  //     if (keyCode == 46) {
  //         console.log("Removing selected element on Fabric.js on DELETE key !");
  //         canvas.remove(canvas.getActiveObject());
  //     }
  // }, false);