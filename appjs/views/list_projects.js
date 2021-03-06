"use strict";

var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    models = require('../models'),
    utils = require('../utils'),
    BaseView = require('./base_view');

module.exports = BaseView.extend(require('./mixins/actions'), require('./mixins/form'), {
  template: require('../templates/project_list.ejs'),

  afterInit: function() {
    this.listenForChanges();
  },

  afterRender: function() {
    $('.selectize-target').selectize({
      highlight: false,
      onDropdownOpen: function(){
        utils.fixSelectizeInputSizing($('.selectize-target'), $('.selectize-dropdown-content'));
      }
    });
  },

  listenForChanges: function() {
    this.listenTo(this.app.listener, 'change:project',
                  this.updateStatus, this);
  },

  stopListeningForChanges: function() {
    this.stopListening(this.app.listener);
  },

  updateStatus: function(data) {
    var model = this.collection.get(data.id);
    if ( model ) {
      model.set('status', data.status);
      this.render();
    }
  }
} );
