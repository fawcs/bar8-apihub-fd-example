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
            form.append('files', image, image.name );
            
            var oModel = new sap.ui.model.json.JSONModel();
            
            var sHeaders = {"content-type":"multipart/form-data", "APIKey":"<API_KEY>"};
            oModel.loadData("https://sandbox.api.sap.com/ml/facedetection/face-detection", form, true, "POST", null, false, sHeaders);
            
            oModel.attachRequestCompleted(function(oEvent){
                var oData = oEvent.getSource().oData;
                console.log(oData);
            });
        }   
        
    });
});
