'use strict';

//
// collapse
// -------------------------

(function($){
    $.collapse = function(el, options){

        var _this = this;
        _this.$el = $(el);
        _this.$elInner = _this.$el.children('.collapse-inner');

        _this.initialize = function(){
            _this.options = $.extend({},$.collapse.defaultOptions, options);

            var id = _this.$el.attr('id'),
                dataTarget = $('[data-target='+id+']');

            if(dataTarget.length){
                dataTarget.bind('click', function(e){

                    e.preventDefault();
                    $(this).toggleClass('active');
                    _this.toggle();
                });
            }

            if(_this.$el.hasClass('unfold')){
                TweenMax.set(_this.$el, { height: height, ease: Expo.easeInOut,  onComplete: function(){
                    _this.$el.css('height', 'auto');
                }});
            }
        };

        _this.toggle= function(){

            if(!_this.$el.hasClass('unfold')){
                _this.$el.addClass('unfold');

                var height = _this.$elInner.outerHeight(true);

                TweenMax.to(_this.$el, 0.5, { height: height, ease: Expo.easeInOut,  onComplete: function(){
                    _this.$el.css('height', 'auto');
                }});
            }
            else {
                TweenMax.to(_this.$el, 0.5, { height: 0, ease: Expo.easeInOut, onComplete: function(){
                    _this.$el.removeClass('unfold');
                }});
            }

        };

        _this.initialize();

    };

    $.collapse.defaultOptions = {};
    
    $.fn.collapse = function(options){
        return this.each(function(){
            (new $.collapse(this, options));
        });
    };
    
})(jQuery);
