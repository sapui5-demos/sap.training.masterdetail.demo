sap.ui.define([
			"sap/ui/core/mvc/Controller",
			"sap/ui/Device"
	], function(Controller, Device) {
	"use strict";
	return Controller.extend("sap.training.masterdetail.controller.Master", {

		onInit: function() {

			var oList = this.byId("list");
			this._oList = oList;

			this.getOwnerComponent().oListSelector.setBoundMasterList(oList);

			this.getRouter().getRoute("master").attachPatternMatched(this._onMasterMatched, this);
			this.getRouter().attachBypassed(this.onBypassed, this);
		},

		getRouter: function() {
			return this.getOwnerComponent().getRouter();
		},

		onSelect: function(oEvent) {
			this._showDetail(oEvent.getParameter("listItem") || oEvent.getSource());
		},

		_showDetail: function(oItem) {
			var bReplace = !Device.system.phone;
			this.getRouter().navTo("object", {
				objectId: oItem.getBindingContext().getProperty("ID")
			}, bReplace);
		},

		/**
		 * Event handler for the bypassed event, which is fired when no routing pattern matched.
		 * If there was an object selected in the master list, that selection is removed.
		 */
		onBypassed: function() {
			this._oList.removeSelections(true);
		},

		/**
		 * If the master route was hit (empty hash) we have to set
		 * the hash to to the first item in the list as soon as the
		 * listLoading is done and the first item in the list is known
		 */
		_onMasterMatched: function() {
			this.getOwnerComponent().oListSelector.oWhenListLoadingIsDone.then(
				function(mParams) {
					if (mParams.list.getMode() === "None") {
						return;
					}
					var sObjectId = mParams.firstListitem.getBindingContext().getProperty("ID");
					this.getRouter().navTo("object", {
						objectId: sObjectId
					}, true);
				}.bind(this)
			);
		}
	});
});