sap.ui.define([
    'sap/ui/core/mvc/Controller'
], function(Controller) {
    'use strict';
    return Controller.extend("sap.mlf.bar8.controller.FaceRecognition",{
        
        onInit: function(){
            this.getView().byId("fileUploader").addStyleClass("fileUploaderStyleObject");
        },
        
        handleValueChange: function(oEvent){
            var oBusyIndicator = new sap.m.BusyDialog();
            oBusyIndicator.open();
            
            
            var oView = this.getView();
            if (oEvent.getParameters().files[0]) {
                this._generateRequest(oEvent,oBusyIndicator);
            } else {
                oBusyIndicator.close();
                //TO-DO - errorrrr
            }
        },
        
        _generateRequest(oEvent,oBusyIndicator){

            var img = oEvent.getParameters().files[0]

            var reader = new FileReader();

            reader.onload = function(e) {
                var file = e.target.result;

                var sHeaders = {"content-type":"multipart/form-data","APIKey":"jqgT31xhkdDcAwr7YCjtIYd6ATphPaaf"};
                var data = new FormData();
                data.set('files', file );
                
                var oData = { 'files': file };
                
                var oModel = new sap.ui.model.json.JSONModel();

                console.log({ oData });

                oModel.loadData("https://sandbox.api.sap.com/ml/facedetection/face-detection", data , false, "POST", null, false, sHeaders);
                
                oModel.attachRequestCompleted(function(oEvent){
                    var oData = oEvent.getSource().oData;
                    console.log(oData);
                    oBusyIndicator.close();
                });

            }

            reader.read(img);
			
        }
        
        
    });
});