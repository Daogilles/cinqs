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

        
        var column = document.querySelectorAll('.column');
        Array.prototype.forEach.call(column, function(el, i){
            Array.prototype.forEach.call(el.querySelectorAll('.list .list-tab'), function(el, i){
                if ( i > 5 ) {
                    el.classList.add('hide');
                }
            });
        });

        if ( $('#map').length > 0 ) this.initMap();
        

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


        $('a.show-more').on('click', function() {
            var list = $(this).attr('data-list');
            $('.list.'+list+ ' .list-tab.hide').each(function(i, el){                        
                if ( i < 6 ) el.classList.remove('hide');
                if ( $('.list.'+list+ ' .list-tab.hide').length == 1) $('a.show-more[data-list="'+list+'"]').addClass('hide');
            });        
        })

        $('.panel-first li').on('click', function() {
            $('.panel-second').addClass('active');
        });

        $('.panel-second li').on('click', function() {
            $(this).addClass('active');
        })

        $('.list-tab').on('click', function() {

            
            var wResume = $('.resume').width();
            var hResume = $('.resume').height();
            var size = $(this).offset();
            var wWidth = window.innerWidth;
            var pLeft = 0;
            var pTop = 0;

            if ( Math.floor(size.left) + $(this).width() + 30 + wResume > wWidth) {
                // Si tooltip supérieur a la size de la window, on affiche tooltip a gauche
                pLeft = Math.floor(size.left) - wResume - 10;
            }else {
                // Si tooltip inferieur a la size de la window, donc a droite
                pLeft = Math.floor(size.left) + $(this).width() + 30;
            }

            if ( size.top - (hResume/2) < 50) {
                pTop = size.top;
            }else {
                pTop = size.top - (hResume/2);
            }
            // console.log(Math.floor(size.left) + $(this).width() + 30 + wResume);
            // console.log(size.top - (hResume/2))

            $('.resume').css({
                top: pTop,
                left: pLeft
            }).removeClass('not-active').addClass('active');
        })
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


    App.prototype.initMap = function() {
        // Create a map object and specify the DOM element for display.
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 48.8589506, lng: 2.2773455},
            scrollwheel: false,
            zoom: 12
        });   
    }

    this.initialize();
}

// init app
// window.onload = new App();
$(window).load(function(){
    new App();
});