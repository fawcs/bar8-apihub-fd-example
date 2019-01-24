sap.ui.define([
    'sap/ui/core/mvc/Controller',
], function(Controller,) {
    'use strict';
    return Controller.extend("sap.mlf.bar8.controller.FaceRecognition",{
        
        onInit: function(){
            this.getView().byId("fileUploader").addStyleClass("fileUploaderStyleObject");
        },
        
        handleValueChange: function(oEvent){
            var oBusyIndicator = new sap.m.BusyDialog();
            oBusyIndicator.open();
            
            if (oEvent.getParameters().files[0]) {
                this._generateRequest(oEvent,oBusyIndicator);
            } else {
                oBusyIndicator.close();
                //TO-DO - handle error properly
            }
        },
        
        _generateRequest(oEvent,oBusyIndicator){
            
            var image = oEvent.getParameters().files[0]
            
            var form = new FormData();
            form.append('files', image );
            
            var sHeaders = {"APIKey":"jqgT31xhkdDcAwr7YCjtIYd6ATphPaaf"};
            $.ajax({
                "url": "https://sandbox.api.sap.com/ml/facedetection/face-detection",
                "headers": sHeaders,
                "method": "POST",
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
                "data": form, 
            })
            .done(res => {
                sap.ui.getCore().setModel({image: image, response: JSON.parse(res)}, 'InferenceResults');
                this.getOwnerComponent().getRouter().navTo("InferenceResult");
            })
            .fail(function(res){
                console.log(res.responseText);
            })
            .always(function(){
                oBusyIndicator.close();
            })
        }   
        
    });
});
