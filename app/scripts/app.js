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
        var scope = this;
        $('.step-wrapper a').on('click', function(e) {
            e.preventDefault();
            var active = $(this).attr('data-step');

            active == 4 ? $('.step-wrapper .control-group').addClass('active') : $('.step-wrapper .control-group').removeClass('active');
            
            $('.resume').removeClass('active').addClass('not-active');
            $('.step-wrapper li').removeClass('active');
            $(this).parent().addClass('active');
            $('.content-form-inner').removeClass('active');
            $('.content-form-inner.step'+active).addClass('active');
        });

        $('.infos-wrapper a').on('click', function(e) {
            e.preventDefault();
            var active = $(this).attr('data-step');
            
            $('.resume').removeClass('active').addClass('not-active');
            $('.infos-wrapper li').removeClass('active');
            $(this).parent().addClass('active');
            $('.content-dashboard-inner').removeClass('active');
            $('.content-dashboard-inner.step'+active).addClass('active');
        });  

        $('.facture-wrapper a').on('click', function(e) {
            e.preventDefault();
            var active = $(this).attr('data-step');
            
            $('.resume').removeClass('active').addClass('not-active');
            $('.facture-wrapper li').removeClass('active');
            $(this).parent().addClass('active');
            $('.content-facture-inner').removeClass('active');
            $('.content-facture-inner.step'+active).addClass('active');
        });    

        $('.vehicule-wrapper a').on('click', function(e) {
            e.preventDefault();
            var active = $(this).attr('data-step');
            
            $('.resume').removeClass('active').addClass('not-active');
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
            if ( $(this).hasClass('active') ) {
                $(this).removeClass('active');
                $('.panel-second').removeClass('active');
            }else {
                $('.panel-first').removeClass('active');
                $(this).addClass('active');
                $('.panel-second').addClass('active');
            }                    
        });

        $('.panel-second li').on('click', function() {
            $(this).addClass('active');
        })

        // Tooltip page en cours et action
        $('.list-tab, .avance-tab').on('click', function() {            

            var wResume = $('.resume').width();
            var hResume = $('.resume').height();
            var size = $(this).offset();
            var targetSizeWidth = $(this).width();
            
            if ( $(this).hasClass('active') ) {
                $('.list-tab, .avance-tab').removeClass('active');
                $('.resume').removeClass('active').addClass('not-active');
            }else {

                $('.list-tab, .avance-tab').removeClass('active');
                $(this).addClass('active');

                var position = scope.calculateTooltip( size.left, size.top, targetSizeWidth, wResume, hResume, false );

                $('.resume').css({
                    top: position.top,
                    left: position.left
                }).removeClass('not-active').addClass('active');
            }        
            
        });

        // Tooltip page apply -> informations bancaire
        $('a.link-more').on('click', function() {            
            
            var wResume = $('.resume').width();
            var hResume = $('.resume').height();
            var size = $(this).offset();
            var targetSizeWidth = $(this).width();
                    
            if ( $(this).hasClass('active') ) {
                $('a.link-more').removeClass('active');
                $('.resume').removeClass('active').addClass('not-active');
            }else {
                $('a.link-more').removeClass('active');
                $(this).addClass('active');
                
                var position = scope.calculateTooltip( size.left, size.top, targetSizeWidth, wResume, hResume, true );

                $('.resume').css({
                    top: position.top,
                    left: position.left
                }).removeClass('not-active').addClass('active');    
            }
        });

    }; 





    // Calcul x position
            // if ( Math.floor(size.left) + $(this).width() + 30 + wResume > wWidth) {
            //     // Si tooltip supérieur a la size de la window, on affiche tooltip a gauche
            //     pLeft = Math.floor(size.left) - wResume - 10;
            // }else {
            //     // Si tooltip inferieur a la size de la window, donc a droite
            //     pLeft = Math.floor(size.left) + $(this).width() + 30;
            // }

            // // calcul y position
            // if ( size.top - (hResume/2) < 50) {
            //     pTop = size.top;
            // }else {
            //     pTop = size.top - (hResume/2);
            // }

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

    App.prototype.calculateTooltip = function(sizeLeft, sizeTop, targetSize, tooltipWidth, tooltipHeight, tooltipInfo ) {
        var pTop = 0,
            pLeft = 0,
            wWidth = window.innerWidth;

        // Calcul x position
        if ( tooltipInfo ) {
            wWidth < 768 ? pLeft = Math.floor(sizeLeft) - tooltipWidth - 10 : pLeft = Math.floor(sizeLeft) + targetSize + 30;            
        }else {
            if ( Math.floor(sizeLeft) + targetSize + 30 + tooltipWidth > wWidth) {
                // Si tooltip supérieur a la size de la window, on affiche tooltip a gauche
                pLeft = Math.floor(sizeLeft) - tooltipWidth - 10;
            }else {
                // Si tooltip inferieur a la size de la window, donc a droite
                pLeft = Math.floor(sizeLeft) + targetSize + 30;
            }
        }        

        // calcul y position
        if ( sizeTop - (tooltipHeight/2) < 50) {
            pTop = sizeTop;
        }else {
            pTop = sizeTop - (tooltipHeight/2);
        }

        var position = {
            top: pTop,
            left: pLeft
        }

        return position;
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