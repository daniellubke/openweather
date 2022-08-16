sap.ui.define(function () {
    "use strict";

    var Service = {

        _keyStr: "069008748a893df62031a800bbc7b528",

        _baseDestination: {
            "base": "api.openweathermap.org"
        },

        _mockData: true,

        _baseService: {
            "Weather": "/data/2.5/weather",
            "ForeCast5days": "/data/2.5/forecast",
            "GeoCoding": "/geo/1.0/direct"
        },

        getValuehelpData: function (oModel, entity, filters) {
            var d = $.Deferred();
            var sEntity = ""; //var sEntity = "/" + entity;
            if (entity.indexOf("/") === -1) {
                sEntity = "/" + entity;
            } else {
                sEntity = entity;
            }
            oModel.read(sEntity, {
                filters: filters,
                success: function (data) {
                    d.resolve(data);
                },
                error: function (data) {
                    d.reject(data.message);
                }
            });
            return d.promise();
        },

        getValuefromAJAX: function (callback, sURL, sFromWhere, oDialog, t, oObject, sURLComp) {
            var map = this._baseService;
            var strBase = (sURL && map[sURL]) ? map[sURL] : "";
            var strUrl = "https://" + this._baseDestination.base + strBase;

            if (sURLComp) {
                strUrl = strUrl + sURLComp + this._keyStr;
            }

            $.ajax({
                type: "GET",
                url: strUrl,
                async: false,
                headers: oObject,
                dataType: "json",
                success: function (data) {
                    callback(data, sURL, sFromWhere, oDialog, t);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    callback(jqXHR, sURL, sFromWhere, oDialog, t);
                }
            });
        },

        postValuetoAJAX: function (callback, sURL, sFromWhere, oDialog, t, oObject, oHeader, sURLComp, oParent) {

            var map = this._baseService;
            var strBase = (sURL && map[sURL]) ? map[sURL] : "";
            var strUrl = "https://" + this._baseDestination.base + strBase;
            var sContentType = "";
            var oData = null;

            if (sURLComp) {
                strUrl = strUrl + sURLComp;
            }

            sContentType = "application/json";
            oData = JSON.stringify(oObject);

            $.ajax({
                type: 'POST',
                url: strUrl,
                data: oData,
                headers: oHeader,
                contentType: sContentType,
                //dataType: "xml",
                success: function (data, textStatus, xhr) {
                    callback(data, sURL, sFromWhere, oDialog, t, xhr, oParent);
                },
                error: function (e) {
                    callback(e, sURL, sFromWhere, oDialog, t);
                }
            });
        },

        putValuetoAJAX: function (callback, sURL, sFromWhere, oDialog, t, oObject, oHeader, sURLComp, oParent) {

            var map = this._baseService;
            var strBase = (sURL && map[sURL]) ? map[sURL] : "";
            var strUrl = "https://" + this._baseDestination.base + strBase;
            var sContentType = "";
            var oData = null;

            if (sURLComp) {
                strUrl = strUrl + sURLComp;
            }

            sContentType = "application/json";
            oData = JSON.stringify(oObject);

            $.ajax({
                type: 'PUT',
                url: strUrl,
                data: oData,
                headers: oHeader,
                contentType: sContentType,
                success: function (data, textStatus, xhr) {
                    callback(data, sURL, sFromWhere, oDialog, t, xhr, oParent);
                },
                error: function (e) {
                    callback(e, sURL, sFromWhere, oDialog, t, oParent);
                }
            });
        },

        deleteValuetoAJAX: function (callback, sURL, sFromWhere, oDialog, t, oObject, oHeader, sURLComp) {

            var map = this._baseService;
            var strBase = (sURL && map[sURL]) ? map[sURL] : "";
            var strUrl = "https://" + this._baseDestination.base + strBase;
            var sContentType = "";
            var oData = null;

            sContentType = "application/json";

            if (sURLComp) {
                strUrl = strUrl + sURLComp;
            }

            if (sURL === "Delete_V1" || sURL === "Delete_Lancamento_V1" || sURL === "Portfolios_Delete_V1") {
                oData = JSON.stringify(oObject);
            } else {
                oData = null;
            }

            $.ajax({
                type: 'DELETE',
                url: strUrl,
                data: oData,
                headers: oHeader,
                contentType: sContentType,
                success: function (data, textStatus, xhr) {
                    callback(xhr, sURL, sFromWhere, oDialog, t);
                },
                error: function (e) {
                    callback(e, sURL, sFromWhere, oDialog, t);
                }
            });
        }

    };

    return Service;

}, true);