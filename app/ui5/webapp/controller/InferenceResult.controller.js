sap.ui.define([
    'sap/ui/core/mvc/Controller'
], function(Controller) {
    'use strict';

    return Controller.extend("sap.mlf.bar8.controller.InferenceResult", {
        onInit: function() {

            var {image, results} = sap.ui.getCore().getModel('InferenceResults');

            var uImg = this.byId("uploadedImage");
            var path = URL.createObjectURL(image);
            
            console.log({uImg,path})
            uImg.setSrc(path);
        }
    })
});