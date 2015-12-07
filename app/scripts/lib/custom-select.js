/*
 * jQuery outside events - v1.1 - 3/16/2010
 * http://benalman.com/projects/jquery-outside-events-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function ($, c, b) {
    $.map("click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup".split(" "), function (d) {
        a(d)
    });
    a("focusin", "focus" + b);
    a("focusout", "blur" + b);
    $.addOutsideEvent = a;
    function a(g, e) {
        e = e || g + b;
        var d = $(), h = g + "." + e + "-special-event";
        $.event.special[e] = {setup:function () {
            d = d.add(this);
            if (d.length === 1) {
                $(c).bind(h, f)
            }
        }, teardown:function () {
            d = d.not(this);
            if (d.length === 0) {
                $(c).unbind(h)
            }
        }, add:function (i) {
            var j = i.handler;
            i.handler = function (l, k) {
                l.target = k;
                j.apply(this, arguments)
            }
        }};
        function f(i) {
            $(d).each(function () {
                var j = $(this);
                if (this !== i.target && !j.has(i.target).length) {
                    j.triggerHandler(e, [i.target])
                }
            })
        }
    }
})(jQuery, document, "outside");

/* ---- CUSTOM SELECT --- */

var customSelect = {
    select_wrapper:'custom_select_ctn',
    prefix_id:'select_nb_',
    option_ctn:'custom_select_option',
    extraclass: '',
    maxcar:22,
    headerLabel:null,
    init:function (select) {
        //return true;
        var _this = this, that, fakeSelect = "", i = 1, text, value, option, select_id, custom_select_id;
        _this.select_class = select;
        $('.' + select).each(function () {
            that = $(this);
            _this.extraclass = "";
            if (!that.hasClass('active')) {

                that.hide();
                that.addClass('active');

                //get default option

                if ((typeof that.data('select_wrapper') != 'undefined') && (that.data('select_wrapper') != '')) {
                    _this.select_wrapper = that.data('select_wrapper');
                } else {
                    _this.select_wrapper = 'custom_select_ctn';
                }
                if ((typeof that.data('maxcar') != 'undefined') && (that.data('maxcar') != '')) {
                    _this.maxcar = that.data('maxcar');
                }
                if ((typeof that.data('prefix_id') != 'undefined') && (that.data('prefix_id ') != '')) {
                    _this.prefix_id = that.data('prefix_id');
                } else {
                    _this.prefix_id = 'select_nb_';
                }

                if ((typeof that.data('header_label') != 'undefined') && (that.data('header_label ') != '')) {

                    _this.headerLabel = that.data('header_label');

                }

                if ((typeof that.data('extraclass') != 'undefined') && (that.data('extraclass ') != '')) {
                    _this.extraclass = that.data('extraclass');
                }

                // check if disabled
                var disabled = (that.hasClass('disabled')) ? 'disabled' : '';

                //check if select has id

                if ((typeof that.attr('id') != 'undefined') && (that.attr('id') != '')) {
                    select_id = that.attr('id');
                    that.wrap('<div id="custom_' + select_id + '" class="' + _this.select_wrapper + ' ' + disabled + '"/>');
                    custom_select_id = "custom_" + select_id;
                } else {
                    if ((typeof that.data('prefix_id') != 'undefined') && (that.data('prefix_id ') != '')) {
                        that.wrap('<div id="' + _this.prefix_id + '" class="' + _this.select_wrapper + ' ' + disabled + '"/>');
                        custom_select_id = _this.prefix_id;
                    } else {
                        that.wrap('<div id="' + _this.prefix_id + i + '" class="' + _this.select_wrapper + ' ' + disabled + '"/>');
                        custom_select_id = _this.prefix_id + i;
                    }

                }

                //get header
                //Check si option selected

                if (that.find('option[selected="selected"]').length > 0) {
                    that.val(that.find('option[selected="selected"]').val());
                    $('#' + custom_select_id).append('<a href="#" class="header">' + that.find('option[selected="selected"]').text() + '</a>');
                } else {
                    if (_this.headerLabel != null) {
                        $('#' + custom_select_id).append('<a href="#" class="header">' + _this.headerLabel + '</a>');
                    } else {
                        text = that.find('option:eq(0)').text();
                        that.val(that.find('option:eq(0)').val());
                        $('#' + custom_select_id).append('<a href="#" class="header">' + text + '</a>');
                    }
                }

                //get option
                fakeSelect += "<ul class='" + _this.option_ctn +' '+ _this.extraclass + "'>";
                that.find('option').each(function () {
                    text = $(this).text();
                    value = $(this).val();
                    if ((text != "") && (value != "")) {
                        fakeSelect += "<li><a title='" + text + "' data-value='" + value + "' href='#'>" + text + "</a></li>";
                    }
                }).promise().done(function () {
                        fakeSelect += "</ul>";
                        option = $('#' + custom_select_id);
                        option.append(fakeSelect);
                        option.bind('clickoutside', function () {
                            if ($(this).is(':visible')) {
                                $(this).find('.' + _this.option_ctn).fadeOut(200);
                                $(this).find('.header').removeClass('active');
                            }
                        });
                        option.find('.header').on('click', function (e) {
                            e.preventDefault();
                            if($(this).prev('select').hasClass('disabled')) return;
                            if ($(this).parent().find('.' + _this.option_ctn).is(':hidden')) {
                                $(this).parent().find('.' + _this.option_ctn).fadeIn(200);
                                $(this).addClass('active');
                            } else {
                                $(this).parent().find('.' + _this.option_ctn).fadeOut(200);
                                $(this).removeClass('active');
                            }
                        });
                        option.find(' > .' + _this.option_ctn + ' > li > a').on('click', function (e) {
                            e.preventDefault();
                            $(this).closest('div').find('select').val($(this).data('value'));
                            $(this).closest('div').find('.header').text($(this).text()).removeClass('active');
                            $(this).closest('ul').fadeOut(200);
                        });
                    });
            }
            _this.filtercar(that);
            fakeSelect = "";
            i++;
        }).promise().done(function () {

                /*$('.custom_select_gmap_ctn .custom_select_option').each(function () {
                 $(this).perfectScrollbar();
                 });
                 $('.custom_select_filter_products_ctn .custom_select_option').each(function () {
                 $(this).perfectScrollbar();
                 });*/

            });
    },
    filtercar:function (carr) {
        var _this = this;

        if (_this.maxcar != null) {

            carr.find('a').each(function () {
                _this.textLimitResize($(this), _this.maxcar);
            });
        }
    },
    textLimitResize:function (fieldname, limit) {
        $(fieldname).each(function () {

            var textinfo = $(this).text();
            var stringlength = textinfo.length;
            if (stringlength > limit) {
                textinfo = textinfo.substr(0, limit);
                $(this).text(textinfo + "…");
            }
        });
    },
    unwrap:function (id) {
        var _this = this;
        var select_copy = $('#' + id + ' select').clone();
        select_copy.removeClass('active');
        $('#' + id).closest('div').replaceWith(select_copy);
    }
}