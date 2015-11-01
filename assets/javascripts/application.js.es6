//= require jquery/dist/jquery
//= require jquery.cookie/jquery.cookie
//= require underscore/underscore
//= require backbone/backbone
//= require backbone.babysitter/lib/backbone.babysitter
//= require backbone.wreqr/lib/backbone.wreqr
//= require backbone.marionette/lib/backbone.marionette

//= require jade/runtime

//= require ./lib/tag_script_builder
//= require ./lib/ga
//= require_tree ./config

//= require ./backbone/app

//= require_tree ./backbone/lib/utilities
//= require_tree ./backbone/lib/controllers
//= require_tree ./backbone/lib/views
//= require_tree ./backbone/lib/components

//= require_tree ./backbone/entities

//= require_tree ./backbone/behaviors

//= require_tree ./backbone/apps

//= require_self

$(document).ready(() => {
    PlanningPoker.start();
});
