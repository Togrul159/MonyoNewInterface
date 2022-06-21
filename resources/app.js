// Search

// Search

var slidebars = function() {
    var t = $("[canvas]"),
        e = {},
        i = !1,
        n = !1,
        s = ["top", "right", "bottom", "left"],
        r = ["reveal", "push", "overlay", "shift"],
        o = function(i) {
            var n = $(),
                s = "0px, 0px",
                r = 1e3 * parseFloat(e[i].element.css("transitionDuration"), 10);
            return ("reveal" === e[i].style || "push" === e[i].style || "shift" === e[i].style) && (n = n.add(t)), ("push" === e[i].style || "overlay" === e[i].style || "shift" === e[i].style) && (n = n.add(e[i].element)), e[i].active && ("top" === e[i].side ? s = "0px, " + e[i].element.css("height") : "right" === e[i].side ? s = "-" + e[i].element.css("width") + ", 0px" : "bottom" === e[i].side ? s = "0px, -" + e[i].element.css("height") : "left" === e[i].side && (s = e[i].element.css("width") + ", 0px")), { elements: n, amount: s, duration: r }
        },
        c = function(t, i, n, s) { return a(t) ? !1 : void(e[t] = { id: t, side: i, style: n, element: s, active: !1 }) },
        a = function(t) { return e.hasOwnProperty(t) ? !0 : !1 };
    this.init = function(t) { return i ? !1 : (n || ($("[off-canvas]").each(function() { var t = $(this).attr("off-canvas").split(" ", 3); return t && t[0] && -1 !== s.indexOf(t[1]) && -1 !== r.indexOf(t[2]) ? void c(t[0], t[1], t[2], $(this)) : !1 }), n = !0), i = !0, this.css(), $(f).trigger("init"), void("function" == typeof t && t())) }, this.exit = function(t) {
        if (!i) return !1;
        var e = function() { i = !1, $(f).trigger("exit"), "function" == typeof t && t() };
        this.getActiveSlidebar() ? this.close(e) : e()
    }, this.css = function(t) {
        if (!i) return !1;
        for (var n in e)
            if (a(n)) {
                var s;
                s = "top" === e[n].side || "bottom" === e[n].side ? e[n].element.css("height") : e[n].element.css("width"), ("push" === e[n].style || "overlay" === e[n].style || "shift" === e[n].style) && e[n].element.css("margin-" + e[n].side, "-" + s)
            }
        this.getActiveSlidebar() && this.open(this.getActiveSlidebar()), $(f).trigger("css"), "function" == typeof t && t()
    }, this.open = function(t, n) {
        if (!i) return !1;
        if (!t || !a(t)) return !1;
        var s = function() {
            e[t].active = !0, e[t].element.css("display", "block"), $(f).trigger("opening", [e[t].id]);
            var i = o(t);
            i.elements.css({ "transition-duration": i.duration + "ms", transform: "translate(" + i.amount + ")" }), setTimeout(function() { $(f).trigger("opened", [e[t].id]), "function" == typeof n && n() }, i.duration)
        };
        this.getActiveSlidebar() && this.getActiveSlidebar() !== t ? this.close(s) : s()
    }, this.close = function(t, n) {
        if ("function" == typeof t && (n = t, t = null), !i) return !1;
        if (t && !a(t)) return !1;
        if (t || (t = this.getActiveSlidebar()), t && e[t].active) {
            e[t].active = !1, $(f).trigger("closing", [e[t].id]);
            var s = o(t);
            s.elements.css("transform", ""), setTimeout(function() { s.elements.css("transition-duration", ""), e[t].element.css("display", ""), $(f).trigger("closed", [e[t].id]), "function" == typeof n && n() }, s.duration)
        }
    }, this.toggle = function(t, n) { return i && t && a(t) ? void(e[t].active ? this.close(t, function() { "function" == typeof n && n() }) : this.open(t, function() { "function" == typeof n && n() })) : !1 }, this.isActive = function() { return i }, this.isActiveSlidebar = function(t) { return i && t && a(t) ? e[t].active : !1 }, this.getActiveSlidebar = function() {
        if (!i) return !1;
        var t = !1;
        for (var n in e)
            if (a(n) && e[n].active) { t = e[n].id; break }
        return t
    }, this.getSlidebars = function() { if (!i) return !1; var t = []; for (var n in e) a(n) && t.push(e[n].id); return t }, this.getSlidebar = function(t) { return i && t && t && a(t) ? e[t] : !1 }, this.events = {};
    var f = this.events;
    $(window).on("resize", this.css.bind(this))
};

(function($) {
    // Create a new instance of Slidebars
    var controller = new slidebars();

    // Events
    $(controller.events).on('init', function() {
        console.log('Init event');
    });

    $(controller.events).on('exit', function() {
        console.log('Exit event');
    });

    $(controller.events).on('css', function() {
        console.log('CSS event');
    });

    $(controller.events).on('opening', function(event, id) {
        console.log('Opening event of slidebar with id ' + id);
    });

    $(controller.events).on('opened', function(event, id) {
        console.log('Opened event of slidebar with id ' + id);
    });

    $(controller.events).on('closing', function(event, id) {
        console.log('Closing event of slidebar with id ' + id);
    });

    $(controller.events).on('closed', function(event, id) {
        console.log('Closed event of slidebar with id ' + id);
    });

    // Initialize Slidebars
    controller.init();

    // Left Slidebar controls
    $('.js-open-left-slidebar').on('click', function(event) {
        event.stopPropagation();
        controller.open('slidebar-1');
    });

    $('.js-close-left-slidebar').on('click', function(event) {
        event.stopPropagation();
        controller.close('slidebar-1');
    });

    $('.js-toggle-left-slidebar').on('click', function(event) {
        event.stopPropagation();
        controller.toggle('slidebar-1');
    });

    // Right Slidebar controls
    $('.js-open-right-slidebar').on('click', function(event) {
        event.stopPropagation();
        controller.open('slidebar-2');
    });

    $('.js-close-right-slidebar').on('click', function(event) {
        event.stopPropagation();
        controller.close('slidebar-2');
    });

    $('.js-toggle-right-slidebar').on('click', function(event) {
        event.stopPropagation();
        controller.toggle('slidebar-2');
    });

    // Top Slidebar controls
    $('.js-open-top-slidebar').on('click', function(event) {
        event.stopPropagation();
        controller.open('slidebar-3');
    });

    $('.js-close-top-slidebar').on('click', function(event) {
        event.stopPropagation();
        controller.close('slidebar-3');
    });

    $('.js-toggle-top-slidebar').on('click', function(event) {
        event.stopPropagation();
        controller.toggle('slidebar-3');
    });

    // Bottom Slidebar controls
    $('.js-open-bottom-slidebar').on('click', function(event) {
        event.stopPropagation();
        controller.open('slidebar-4');
    });

    $('.js-close-bottom-slidebar').on('click', function(event) {
        event.stopPropagation();
        controller.close('slidebar-4');
    });

    $('.js-toggle-bottom-slidebar').on('click', function(event) {
        event.stopPropagation();
        controller.toggle('slidebar-4');
    });

    // Close any
    $(controller.events).on('opened', function() {
        $('[canvas="container"]').addClass('js-close-any-slidebar');
    });

    $(controller.events).on('closed', function() {
        $('[canvas="container"]').removeClass('js-close-any-slidebar');
    });

    $('body').on('click', '.js-close-any-slidebar', function(event) {
        event.stopPropagation();
        controller.close();
    });

    // Initilize, exit and css reset
    $('.js-initialize-slidebars').on('click', function(event) {
        event.stopPropagation();
        controller.init();
    });

    $('.js-exit-slidebars').on('click', function(event) {
        event.stopPropagation();
        controller.exit();
    });

    $('.js-reset-slidebars-css').on('click', function(event) {
        event.stopPropagation();
        controller.css();
    });

    // Is and get
    $('.js-is-active').on('click', function(event) {
        event.stopPropagation();
        console.log(controller.isActive());
    });

    $('.js-is-active-slidebar').on('click', function(event) {
        event.stopPropagation();
        var id = prompt('Enter a Slidebar id');
        console.log(controller.isActiveSlidebar(id));
    });

    $('.js-get-active-slidebar').on('click', function(event) {
        event.stopPropagation();
        console.log(controller.getActiveSlidebar());
    });

    $('.js-get-all-slidebars').on('click', function(event) {
        event.stopPropagation();
        console.log(controller.getSlidebars());

    });

    $('.js-get-slidebar').on('click', function(event) {
        event.stopPropagation();
        var id = prompt('Enter a Slidebar id');
        console.log(controller.getSlidebar(id));
    });

    // Callbacks
    $('.js-init-callback').on('click', function(event) {
        event.stopPropagation();
        controller.init(function() {
            console.log('Init callback');
        });
    });

    $('.js-exit-callback').on('click', function(event) {
        event.stopPropagation();
        controller.exit(function() {
            console.log('Exit callback');
        });
    });

    $('.js-css-callback').on('click', function(event) {
        event.stopPropagation();
        controller.css(function() {
            console.log('CSS callback');
        });
    });

    $('.js-open-callback').on('click', function(event) {
        event.stopPropagation();
        controller.open('slidebar-1', function() {
            console.log('Open callback');
        });
    });

    $('.js-close-callback').on('click', function(event) {
        event.stopPropagation();
        controller.close(function() {
            console.log('Close callback');
        });
    });

    $('.js-toggle-callback').on('click', function(event) {
        event.stopPropagation();
        controller.toggle('slidebar-1', function() {
            console.log('Toggle callback');
        });
    });
})(jQuery);


// End


// Plus Minus Start
jQuery(document).ready(function() {
    // This button will increment the value
    $('[data-quantity="plus"]').click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('data-field');
        // Get its current value
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name=' + fieldName + ']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name=' + fieldName + ']').val(0);
        }
    });
    // This button will decrement the value till 0
    $('[data-quantity="minus"]').click(function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('data-field');
        // Get its current value
        var currentVal = parseInt($('input[name=' + fieldName + ']').val());
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name=' + fieldName + ']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name=' + fieldName + ']').val(0);
        }
    });
});


// Plus Minus End


// Start






(function(window) {
    let HorizontalNav = function(selector) {
        this.nav = window.document.querySelector(selector);
        this.options = {
            items: { attribute: "data-page" },
            submenu: {
                selector: ".nav-horizontal-scroll-onhover-items",
                show: "nav-show"
            },
            page: { nav: "nav-active", show: "page-active" }
        };
        this.init();
        return this;
    };

    HorizontalNav.prototype = {
        active: undefined,
        mouseLeaveEvent: undefined,
        init: function() {
            let self = this;
            this.mouseLeaveEvent = self.mouseLeave.bind(self);
            if ("ontouchstart" in window) {
                this.nav.addEventListener("touchstart", self.hoverEvent.bind(self));
            } else {
                this.nav.addEventListener("mouseover", self.hoverEvent.bind(self));
            }
            this.nav.addEventListener("click", function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                let item = self.item(evt.target);
                self.showPage(item);
            });
        },
        item: function(target) {
            let self = this;
            if (self.options.items.attribute) {
                while (
                    target.getAttribute(self.options.items.attribute) == undefined ||
                    target == self.nav
                )
                    target = target.parentNode;
            }
            return target == self.nav ? undefined : target;
        },
        hideSubNavs: function() {
            let self = this;
            (
                this.nav.querySelectorAll("." + self.options.submenu.show) || []
            ).forEach(function(n) {
                n.classList.remove(self.options.submenu.show);
            });
        },
        showSubNav: function(item) {
            let self = this;
            console.dir(item);
            let submenu = item.querySelector(self.options.submenu.selector);
            if (submenu) {
                submenu.classList.add(self.options.submenu.show);
                submenu.style.top = item.scrollHeight + 10 + "px";
                submenu.style.left =
                    item.offsetLeft - item.parentNode.scrollLeft + "px";
                submenu.removeEventListener("mouseleave", self.mouseLeaveEvent);
                submenu.addEventListener("mouseleave", self.mouseLeaveEvent);
            }
        },
        hoverEvent: function(evt) {
            let self = this;
            let item = self.item(evt.target);
            if (self.active) {
                if (self.active == item) return;
                else if (self.active.contains(item)) return;
                else self.hideSubNavs();
            }
            self.active = item;
            self.showSubNav(item);
        },
        mouseLeave: function(evt) {
            let self = this;
            if (self.active)
                self.active
                .querySelector(self.options.submenu.selector)
                .classList.remove(self.options.submenu.show);
            self.active = undefined;
        },
        showPage: function(item) {
            let self = this;
            let page = item.getAttribute(self.options.items.attribute);
            (
                document.querySelectorAll("." + self.options.page.show) || []
            ).forEach((n) => n.classList.remove(self.options.page.show));
            (
                document.querySelectorAll("." + self.options.page.nav) || []
            ).forEach((n) => n.classList.remove(self.options.page.nav));
            document.querySelector("#" + page).classList.add(self.options.page.show);
            if (self.active) self.active.classList.add(self.options.page.nav);
            if (item != self.active) item.classList.add(self.options.page.nav);
            self.hideSubNavs();
        }
    };

    new HorizontalNav("nav");
})(window);


// Filter Tab Start
// This part is the vanilla js modified code
var update_nav_menu_position;

(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define([], factory);
    else if (typeof exports === 'object')
        exports["VanillaScrollspy"] = factory();
    else
        root["VanillaScrollspy"] = factory();
})(window, function() {
    return /******/ (function(modules) { // webpackBootstrap
            /******/ // The module cache
            /******/
            var installedModules = {};
            /******/
            /******/ // The require function
            /******/
            function __webpack_require__(moduleId) {
                /******/
                /******/ // Check if module is in cache
                /******/
                if (installedModules[moduleId]) {
                    /******/
                    return installedModules[moduleId].exports;
                    /******/
                }
                /******/ // Create a new module (and put it into the cache)
                /******/
                var module = installedModules[moduleId] = {
                    /******/
                    i: moduleId,
                    /******/
                    l: false,
                    /******/
                    exports: {}
                    /******/
                };
                /******/
                /******/ // Execute the module function
                /******/
                modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                /******/
                /******/ // Flag the module as loaded
                /******/
                module.l = true;
                /******/
                /******/ // Return the exports of the module
                /******/
                return module.exports;
                /******/
            }
            /******/
            /******/
            /******/ // expose the modules object (__webpack_modules__)
            /******/
            __webpack_require__.m = modules;
            /******/
            /******/ // expose the module cache
            /******/
            __webpack_require__.c = installedModules;
            /******/
            /******/ // define getter function for harmony exports
            /******/
            __webpack_require__.d = function(exports, name, getter) {
                /******/
                if (!__webpack_require__.o(exports, name)) {
                    /******/
                    Object.defineProperty(exports, name, {
                        /******/
                        configurable: false,
                        /******/
                        enumerable: true,
                        /******/
                        get: getter
                            /******/
                    });
                    /******/
                }
                /******/
            };
            /******/
            /******/ // define __esModule on exports
            /******/
            __webpack_require__.r = function(exports) {
                /******/
                Object.defineProperty(exports, '__esModule', { value: true });
                /******/
            };
            /******/
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/
            __webpack_require__.n = function(module) {
                /******/
                var getter = module && module.__esModule ?
                    /******/
                    function getDefault() { return module['default']; } :
                    /******/
                    function getModuleExports() { return module; };
                /******/
                __webpack_require__.d(getter, 'a', getter);
                /******/
                return getter;
                /******/
            };
            /******/
            /******/ // Object.prototype.hasOwnProperty.call
            /******/
            __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
            /******/
            /******/ // __webpack_public_path__
            /******/
            __webpack_require__.p = "";
            /******/
            /******/
            /******/ // Load entry module and return exports
            /******/
            return __webpack_require__(__webpack_require__.s = "./index.js");
            /******/
        })
        /************************************************************************/
        /******/
        ({

            /***/
            "./index.js":
            /*!******************!*\
              !*** ./index.js ***!
              \******************/
            /*! no static exports found */
            /***/
                (function(module, exports, __webpack_require__) {

                "use strict";


                module.exports = __webpack_require__( /*! ./src/index */ "./src/index.js").default;

                /***/
            }),

            /***/
            "./src/index.js":
            /*!**********************!*\
              !*** ./src/index.js ***!
              \**********************/
            /*! no static exports found */
            /***/
                (function(module, exports, __webpack_require__) {

                "use strict";


                Object.defineProperty(exports, "__esModule", {
                    value: true
                });

                var _createClass = function() {
                    function defineProperties(target, props) {
                        for (var i = 0; i < props.length; i++) {
                            var descriptor = props[i];
                            descriptor.enumerable = descriptor.enumerable || false;
                            descriptor.configurable = true;
                            if ("value" in descriptor) descriptor.writable = true;
                            Object.defineProperty(target, descriptor.key, descriptor);
                        }
                    }
                    return function(Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; };
                }();

                function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

                var fncAnimation = function fncAnimation(callback) {
                    window.setTimeout(callback, 1000 / 60);
                    return callback;
                };

                window.requestAnimFrame = function() {
                    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || fncAnimation;
                }();

                var VanillaScrollspy = function() {
                    function VanillaScrollspy(menu) {
                        var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
                        var easing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'easeOutSine';

                        _classCallCheck(this, VanillaScrollspy);

                        this.menu = menu;
                        this.speed = speed;
                        this.easing = easing;
                    }

                    _createClass(VanillaScrollspy, [{
                        key: 'scrollToY',
                        value: function scrollToY() {
                            var _this = this;

                            var targetY = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

                            var scrollTargetY = targetY;
                            var scrollY = window.scrollY || document.documentElement.scrollTop;
                            var currentTime = 0;
                            var time = Math.max(0.1, Math.min(Math.abs(scrollY - scrollTargetY) / this.speed, 0.8));

                            var easingEquations = {
                                easeOutSine: function easeOutSine(pos) {
                                    return Math.sin(pos * (Math.PI / 2));
                                },
                                easeInOutSine: function easeInOutSine(pos) {
                                    return -0.5 * (Math.cos(Math.PI * pos) - 1);
                                },
                                easeInOutQuint: function easeInOutQuint(pos) {
                                    /* eslint-disable-next-line */
                                    if ((pos /= 0.5) < 1) {
                                        return 0.5 * Math.pow(pos, 5);
                                    }
                                    return 0.5 * (Math.pow(pos - 2, 5) + 2);
                                }
                            };

                            var tick = function tick() {
                                currentTime += 1 / 60;
                                var p = currentTime / time;
                                var t = easingEquations[_this.easing](p);

                                if (p < 1) {
                                    window.requestAnimFrame(tick);
                                    window.scrollTo(0, scrollY + (scrollTargetY - scrollY) * t);
                                } else {
                                    window.scrollTo(0, scrollTargetY);
                                }
                            };

                            tick();
                        }
                    }, {
                        key: 'menuControl',
                        value: function menuControl() {
                            var i = void 0;
                            var currLink = void 0;
                            var refElement = void 0;
                            var links = this.menu.querySelectorAll('a[href^="#"]');
                            var scrollPos = window.scrollY || document.documentElement.scrollTop;

                            for (i = 0; i < links.length; i += 1) {
                                currLink = links[i];
                                refElement = document.querySelector(currLink.getAttribute('href'));

                                if (refElement.offsetTop <= scrollPos && refElement.offsetTop + refElement.clientHeight > scrollPos) {
                                    currLink.classList.add('active');
                                } else {
                                    currLink.classList.remove('active');
                                }
                                update_nav_menu_position();
                            }
                        }
                    }, {
                        key: 'animated',
                        value: function animated() {
                            var self = this;

                            function control(e) {
                                e.preventDefault();
                                var target = document.querySelector(this.hash);
                                self.scrollToY(target.offsetTop);
                            }

                            var i = void 0;
                            var link = void 0;
                            var links = this.menu.querySelectorAll('a[href^="#"]');

                            for (i = 0; i < links.length; i += 1) {
                                link = links[i];
                                link.addEventListener('click', control);
                            }
                        }
                    }, {
                        key: 'init',
                        value: function init() {
                            var _this2 = this;

                            this.animated();
                            document.addEventListener('scroll', function() {
                                _this2.menuControl();
                            });
                        }
                    }]);

                    return VanillaScrollspy;
                }();

                exports.default = VanillaScrollspy;

                /***/
            })

            /******/
        });
});
//# sourceMappingURL=vanillajs-scrollspy.js.map

/**
 * Here goes custom js
 **/

update_nav_menu_position = function() {
    // using jquery here
    var $active_nav_item = $("#navbar").find('a.active'),
        $scroll_elem = $(".navbar-start"),
        left_pos, right_limit, active_elem_left_pos, active_elem_right_pos, scroll_pos, new_scroll_pos;

    if (!$active_nav_item.length) {
        return false;
    }

    left_pos = $scroll_elem.offset().left;
    right_limit = $scroll_elem.width() + left_pos;
    active_elem_left_pos = $active_nav_item.offset().left;
    active_elem_right_pos = $active_nav_item.width() + active_elem_left_pos;
    scroll_pos = $scroll_elem.scrollLeft();

    if (active_elem_left_pos > left_pos && active_elem_right_pos < (right_limit - 50)) {
        return true;
    } else {
        new_scroll_pos = (left_pos + right_limit) / 2;
        new_scroll_pos = active_elem_left_pos - new_scroll_pos;
        new_scroll_pos = scroll_pos + new_scroll_pos;
        $scroll_elem.scrollLeft(new_scroll_pos);
    }

}

const navbar = document.querySelector("#navbar");
const scrollspy = new VanillaScrollspy(navbar);
scrollspy.init();





//