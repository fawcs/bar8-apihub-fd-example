sap.ui.define([
    'sap/ui/core/mvc/Controller'
], function(Controller) {
    'use strict';
    
    return Controller.extend("sap.mlf.bar8.controller.InferenceResult", {
        onInit: function() {
            
            var {image, response} = sap.ui.getCore().getModel('InferenceResults');
            console.log(response)
            var uImg = this.byId("uploadedImage");
            uImg.attachBrowserEvent('load',() => this._onImageLoad(this,response));
            var path = URL.createObjectURL(image);
            
            console.log({uImg,path})
            uImg.useMap = 'map1';
            uImg.setSrc(path)
            
        },
        
        _onImageLoad: function(context,results) {
            var oCanvas = document.createElement("canvas");
            var ctx = oCanvas.getContext("2d");
            
            for( var i = 0; i < results.predictions[0].numberOfFaces; i++){
            var oMap = new sap.ui.commons.ImageMap();
            oMap.setName("map1");
                context._drawBoundingBox(ctx,results.predictions[0].faces[i],"Area_"+i,map);
            }
        },
        
        _drawBoundingBox : function(ctx, item, name,map) {
            var coords = ""+item.left+","+item.top+","+item.right - item.left +","+ item.bottom - item.top;
            var aArea1 = new sap.ui.commons.Area (name, {
                shape: "rect", 
                alt: "Bee",
                href: "http://www.sap.com",
                coords: coords
            });
            map.addArea(aArea1);
            map.placeAt("uploadedImage");
            // draw the box
            //ctx.strokeRect(item.left, item.top, item.right - item.left , item.bottom - item.top);
            //ctx.fillStyle = 'red';
            //ctx.save();
        },
        
        _drawCanvas : function(oController,oImage) {
            var oCanvas = document.createElement("canvas");
            var ctx = oCanvas.getContext("2d");
            var oImage = new Image();
            var FR= new FileReader();
            FR.onload = function(e) {
                //oImage.onLoad = function(){
                oCanvas.width  = oImage.width;
                oCanvas.height = oImage.height;
                
                //ctx.drawImage(oImage, 0, 0);
                ctx.drawImage(oImage, 0, 0, oCanvas.width, oCanvas.height);
                ctx.lineWidth="3";
                ctx.strokeStyle="red";
                ctx.fillStyle = "white";
                ctx.font = fontSize + "px Arial";
                //};
            };       
            oImage.src = oController.srcFileURL;
            FR.readAsDataURL(oController.srcFile);
            //oImg.style.display = "none";
            return ctx;
        },
        
    })
});