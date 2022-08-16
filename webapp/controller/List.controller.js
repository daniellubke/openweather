sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "openweathermap/openweather/util/Service",
    "openweathermap/openweather/util/Formatter",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Service, Formatter, JSONModel) {
        "use strict";

        return Controller.extend("openweathermap.openweather.controller.List", {

            Formatter: Formatter,

            onInit: function () {
            },

            onGetCities: function (evt) {
                var oValue = evt.getSource().getValue();
                this._getCities(oValue);
            },

            _getTempNow: function (objCity) {
                this.getInfo_AJAX("Weather", "List", null, "?lat=" + objCity.lat + "&lon=" + objCity.lon + "&units=metric&appid=");
            },

            _getCities: function (strCity) {
                this.getInfo_AJAX("GeoCoding", "List", null, "?q=" + strCity + "&limit=5&appid=");
            },

            _getForeCast5days: function (objCity) {
                this.getInfo_AJAX("ForeCast5days", "List", null, "?lat=" + objCity.lat + "&lon=" + objCity.lon + "&units=metric&appid=");
            },

            _onexpandPanel: function (oEvent) {
                var row = oEvent.getSource();
                var context = row.getBindingContext("MDL_Cities");

                if (context) {
                    this.objContext = oEvent.getSource().getBindingContext("MDL_Cities");
                    this._getForeCast5days(context.getObject());
                    this._getTempNow(oEvent.getSource().getBindingContext("MDL_Cities").getObject());
                }
            },

            handleTitlePress: function (oEvent) {
                this.objContext = oEvent.getSource().getBindingContext("MDL_Cities");
                this._getTempNow(oEvent.getSource().getBindingContext("MDL_Cities").getObject());
            },

            formatUnidadeTemp: function (value) {
                var bundle = this.getView().getModel("i18n").getResourceBundle();
                return (value ? bundle.getText("medidatemperatura") : "");
            },

            getInfo_AJAX: function (oURL, oLocal, oObj, oCompURL) {
                var t = this;
                Service.getValuefromAJAX(this.getCallBack, oURL, oLocal, null, t, oObj, oCompURL);
            },

            getCallBack: function (data, sURL, sFromWhere, oDialog, t, xhr, oParent) {

                if (sURL === "GeoCoding") {
                    if (data) {
                        if ((data.responseJSON) && (data.responseJSON.cod !== "200")) {
                            data = [];
                        }

                        data.forEach(function (obj) {
                            obj.expanded = false
                        });

                        var oModel = new JSONModel();
                        oModel.setData(data);
                        t.getView().setModel(oModel, "MDL_Cities");

                    }

                } else if (sURL === "ForeCast5days") {

                    if (data.cod === "200") {
                        data.list.forEach(function (obj) {
                            obj.weatherdate = t.Formatter.date(obj.dt_txt.substring(0, obj.dt_txt.indexOf(' ')))
                        });
                        t.getView().getModel("MDL_Cities").setProperty(t.objContext.getPath() + "/forecast5days", data);
                    }

                } else if (sURL === "Weather") {
                    if (data.cod === 200) {
                        t.getView().getModel("MDL_Cities").setProperty(t.objContext.getPath() + "/weatherNow", data.main);
                    }
                }
            }
        });
    });
