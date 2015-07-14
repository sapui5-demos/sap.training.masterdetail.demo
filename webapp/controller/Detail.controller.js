sap.ui.define([
			"sap/ui/core/mvc/Controller"
	], function(Controller) {
	"use strict";

	return Controller.extend("sap.training.masterdetail.controller.Detail", {

		onInit: function() {
			this.getRouter().getRoute("object")
				.attachPatternMatched(this._onObjectMatched, this);
		},

		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},

		_onObjectMatched: function(oEvent) {
			var sObjectPath =
				"/Products(" + oEvent.getParameter("arguments").objectId + ")";
			this._bindView(sObjectPath);
		},

		_bindView: function(sObjectPath) {
			var oView = this.getView();

			this.getView().bindElement({
				path: sObjectPath,
				parameters: {
					expand: "Supplier"
				},
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function() {
						oView.setBusy(true);
					},
					dataReceived: function() {
						oView.setBusy(false);
					}
				}
			});
		},

		_onBindingChange: function() {

			var oView = this.getView(),
				oElementBinding = oView.getElementBinding();

			if (!oElementBinding.getBoundContext()) {

				this.getRouter().getTargets().display("detailObjectNotFound");

				this.getOwnerComponent().oListSelector.clearMasterListSelection();

				return;
			}

			var sPath = oElementBinding.getPath();
			this.getOwnerComponent().oListSelector.selectAListItem(sPath);

		},

		onNavBack: function() {
			var sPreviousHash = sap.ui.core.routing.History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("master", {}, bReplace);
			}
		}

	});
});