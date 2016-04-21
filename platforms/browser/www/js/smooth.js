;(function($) {
  'use strict';
  $.fn.restartCSSAnimation = function(cls) {
    var self = this;
    self.removeClass(cls);
    $.smoothStateUtility.redraw(self);
    setTimeout(function () { self.addClass(cls) });
    return self;
  };
  var $body = $('html, body'),
      content = $('#content').smoothState({
        // Runs when a link has been activated
        onStart: {
          duration: 300, // Duration of our animation
          render: function (url, $container) {
            // toggleAnimationClass() is a public method
            // content.toggleAnimationClass('is-exiting');
            $('.anim_element--fadeIn').restartCSSAnimation('anim_element--fadeIn');
            $('.anim_element--fadeInLeft').restartCSSAnimation('anim_element--fadeInLeft');
            // Scroll user to the top
            $body.animate({scrollTop: 0});
          }
        }
      }).data('smoothState');
})(jQuery);
