sap.ui.define(["sap/ui/core/format/NumberFormat"], function (NumberFormat) {
    "use strict";

    var Formatter = {

        date: function (value) {

            var oPattern = "dd/MM/yyyy";

            if (value) {
                var year = new Date().getFullYear();
                if (year === 9999) {
                    return "";
                } else {
                    var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                        pattern: oPattern
                    });
                    return oDateFormat.format(new Date(value));
                }

            } else {
                return value;
            }

        }

    };

    return Formatter;

}, true);

