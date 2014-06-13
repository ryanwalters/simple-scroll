/*!
 * Simple Scroll - v0.1.1
 * http://ryanwalters.github.io/simple-scroll
 *
 * Copyright (c) 2014 Ryan Walters <shout@ryanwalters.co>
 * Licensed under the MIT License
 */

;(function ($, window, document, undefined) {
    'use strict';

    var pluginName = 'scroll',
        defaults = {
            speed: 400    // scroll speed in ms
        };

    function Scroll(element, options) {
        this.element = element;
        this.$element = $(element);
        this.options = $.extend({}, defaults, options);

        this._init();
    }

    $.extend(Scroll.prototype, {
        _init: function () {

            // Create the necessary DOM elements and classes

            this.$element.toggleClass('ui-scrolling-div', true)
                .wrap('<div class="ui-scrolling-div-wrapper" />')
                .children().toggleClass('ui-scrolling-item', true);

            var $el = this.$element,
                $items = $el.children(),
                $wrapper = $el.parent().toggleClass('ui-mobile', $.support.mobile),
                $controls = $('<nav class="ui-scroll-controls" />')
                    .append('<div class="ui-scroll-control ui-scroll-left" />')
                    .append('<div class="ui-scroll-control ui-scroll-right" />')
                    .insertAfter($wrapper),
                $left = $controls.find('.ui-scroll-left'),
                $right = $controls.find('.ui-scroll-right'),
                options = this.options,
                distance = 0,
                length = $items.length,
                pos = 0,
                resizeTimeout,
                itemWidth = $items.eq(0).outerWidth(true),
                width = itemWidth * length,
                wrapperWidth = 0;

            /* Initial setup */

            var _setup = function () {
                $el.width(width);
                wrapperWidth = $wrapper.width();
                $controls.trigger('click');
            };

            /* Directional calculations */

            var _left = function () {
                if (pos < 0 && $left.not('.disabled')) {
                    distance = Math.min(width - wrapperWidth, Math.floor(wrapperWidth / itemWidth) * itemWidth);
                    pos += distance;
                }
            };

            var _right = function () {
                if (Math.abs(pos) < width - wrapperWidth && $right.not('.disabled')) {
                    distance = Math.min(width - wrapperWidth, Math.floor(wrapperWidth / itemWidth) * itemWidth);
                    pos -= distance;
                }
            };

            /* Scroll action */

            var _go = function () {
                $.support.transition ?
                    $el.css({ 'left': pos, 'transition': options.speed + 'ms all' }) :
                    $el.animate({ 'left': pos }, options.speed);
            };

            /* Events */

            $left.on('click', _left);
            $right.on('click', _right);
            $controls.on('click', function () {
                $left.toggleClass('disabled', (pos >= 0));
                $right.toggleClass('disabled', (Math.abs(pos) >= width - wrapperWidth));
                _go();
            });

            /* Reset when window resizes */

            $(window).on('resize', function () {
                window.clearTimeout(resizeTimeout);
                resizeTimeout = window.setTimeout(_setup, 250);
            });

            _setup();
        }
    });

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Scroll(this, options));
            }
        });
    };

    // Feature support

    $.extend($.support, {

        // Detect transition support

        transition: (function () {
            var b = document.body || document.documentElement, s = b.style;
            return s.transition !== undefined || s.WebkitTransition !== undefined || s.MozTransition !== undefined || s.MsTransition !== undefined || s.OTransition !== undefined;
        })(),


        // Detect if using mobile device

        mobile: (function () {
            var m = false;
            ['mobile', 'opera mobi', 'opera mini', 'android', 'nucleus', 'nokia', 'iemobile', 'blackberry', 'windows phone', 'bb10', 'playbook', 'kindle', 'silk', 'arm;'].forEach(function (v) {
                if (navigator.userAgent.toLowerCase().indexOf(v) !== -1) {
                    m = true;
                    return false;
                }
            });
            return m;
        })()
    });

})(jQuery, window, document);