'use strict';

//
// Require lib
// -------------------------

var $ = require('jquery'),
    TweenMax = require('gsap');

TweenLite.defaultEase = Power1.easeInOut;

require('selectordie');
require('icheck');

function App() {

    var _this = this;

    this.width;
    this.height;    

    App.prototype.initialize = function(){

        this.resize();
        this.events();  

        console.log('in app.js')
        $("select").selectOrDie({
            size: 5
        });

        // resize
        // -------------------------
        $(window).resize(function(){
            _this.resize();
        });

    };

    //
    // Events
    // -------------------------
    App.prototype.events = function() {
        $('.step-wrapper a').on('click', function(e) {
            e.preventDefault();
            var active = $(this).attr('data-step');

            active == 4 ? $('.step-wrapper .control-group').addClass('active') : $('.step-wrapper .control-group').removeClass('active');
            
            $('.step-wrapper li').removeClass('active');
            $(this).parent().addClass('active');
            $('.content-form-inner').removeClass('active');
            $('.content-form-inner.step'+active).addClass('active');
        });

        $('.infos-wrapper a').on('click', function(e) {
            e.preventDefault();
            var active = $(this).attr('data-step');
            
            $('.infos-wrapper li').removeClass('active');
            $(this).parent().addClass('active');
            $('.content-dashboard-inner').removeClass('active');
            $('.content-dashboard-inner.step'+active).addClass('active');
        });  

        $('.facture-wrapper a').on('click', function(e) {
            e.preventDefault();
            var active = $(this).attr('data-step');
            
            $('.facture-wrapper li').removeClass('active');
            $(this).parent().addClass('active');
            $('.content-facture-inner').removeClass('active');
            $('.content-facture-inner.step'+active).addClass('active');
        });    

        $('.vehicule-wrapper a').on('click', function(e) {
            e.preventDefault();
            var active = $(this).attr('data-step');
            
            $('.vehicule-wrapper li').removeClass('active');
            $(this).parent().addClass('active');
            $('.content-vehicule-inner').removeClass('active');
            $('.content-vehicule-inner.step'+active).addClass('active');
        }); 
    };

    //
    // Resize stage
    // -------------------------
    App.prototype.resize = function() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;        
    };


    App.prototype.calculateAspectRatioFit = function(srcWidth, srcHeight, maxWidth, maxHeight) {
        var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

        return { width: srcWidth*ratio, height: srcHeight*ratio };
    };

    this.initialize();
}

// init app
// window.onload = new App();
$(window).load(function(){
    new App();
});