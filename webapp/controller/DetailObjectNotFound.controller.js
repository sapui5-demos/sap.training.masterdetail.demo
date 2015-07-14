sap.ui.define([
		"sap/ui/core/mvc/Controller"
	], function(Controller) {
	"use strict";

	return Controller.extend("sap.training.masterdetail.controller.DetailObjectNotFound", {

		onNavBack: function() {
			var sPreviousHash = sap.ui.core.routing.History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				var bReplace = true;
				this.getRouter().navTo("master", {}, bReplace);
			}
		}

	});

});