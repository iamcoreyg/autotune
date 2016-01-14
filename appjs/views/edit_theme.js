"use strict";

var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    models = require('../models'),
    helpers = require('../helpers'),
    logger = require('../logger'),
    BaseView = require('./base_view'),
    ace = require('brace'),
    slugify = require("underscore.string/slugify");

require('brace/mode/json');
require('brace/theme/textmate');

var EditTheme = BaseView.extend(require('./mixins/actions'), require('./mixins/form'), {
  template: require('../templates/theme.ejs'),
  afterRender: function() {
    var view = this, promises = [];

    // Setup editor for data field
    this.editor = ace.edit('data');
    this.editor.setShowPrintMargin(false);
    this.editor.setTheme("ace/theme/textmate");
    this.editor.setWrapBehavioursEnabled(true);

    var session = this.editor.getSession();
    session.setMode("ace/mode/json");
    session.setUseWrapMode(true);

    this.editor.renderer.setHScrollBarAlwaysVisible(false);
    var editor_data = JSON.stringify( this.model.get('data'), null, "  " );
    this.editor.setValue(editor_data ? editor_data : "{}", -1 );
  },

  formValues: function($form) {
    var values = {};
    _.each($form.serializeArray(), function(val){
      values[val.name] = val.value;
    });
    try {
      values.data = JSON.parse(this.editor.getValue());
    } catch (ex) {
      logger.error("Theme data JSON is bad");
      return {};
    }
    return values;
  },

  formValidate: function(){
    var valid = false;
    try {
      JSON.parse(this.editor.getValue());
      valid = true;
    } catch (ex) {
      logger.error("Theme data JSON is bad");
    }
    return valid;
  }
});

module.exports = EditTheme;
