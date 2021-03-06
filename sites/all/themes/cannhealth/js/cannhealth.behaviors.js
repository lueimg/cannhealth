(function ($) {

  /**
   * The recommended way for producing HTML markup through JavaScript is to write
   * theming functions. These are similiar to the theming functions that you might
   * know from 'phptemplate' (the default PHP templating engine used by most
   * Drupal themes including Omega). JavaScript theme functions accept arguments
   * and can be overriden by sub-themes.
   *
   * In most cases, there is no good reason to NOT wrap your markup producing
   * JavaScript in a theme function.
   */
  Drupal.theme.prototype.cannhealthExampleButton = function (path, title) {
    // Create an anchor element with jQuery.
    return $('<a href="' + path + '" title="' + title + '">' + title + '</a>');
  };

  /**
   * Behaviors are Drupal's way of applying JavaScript to a page. In short, the
   * advantage of Behaviors over a simple 'document.ready()' lies in how it
   * interacts with content loaded through Ajax. Opposed to the
   * 'document.ready()' event which is only fired once when the page is
   * initially loaded, behaviors get re-executed whenever something is added to
   * the page through Ajax.
   *
   * You can attach as many behaviors as you wish. In fact, instead of overloading
   * a single behavior with multiple, completely unrelated tasks you should create
   * a separate behavior for every separate task.
   *
   * In most cases, there is no good reason to NOT wrap your JavaScript code in a
   * behavior.
   *
   * @param context
   *   The context for which the behavior is being executed. This is either the
   *   full page or a piece of HTML that was just added through Ajax.
   * @param settings
   *   An array of settings (added through drupal_add_js()). Instead of accessing
   *   Drupal.settings directly you should use this because of potential
   *   modifications made by the Ajax callback that also produced 'context'.
   */
  Drupal.behaviors.cannhealthExampleBehavior = {
    attach: function (context, settings) {
      // By using the 'context' variable we make sure that our code only runs on
      // the relevant HTML. Furthermore, by using jQuery.once() we make sure that
      // we don't run the same piece of code for an HTML snippet that we already
      // processed previously. By using .once('foo') all processed elements will
      // get tagged with a 'foo-processed' class, causing all future invocations
      // of this behavior to ignore them.

        $(".page-distributor-register .form-item:even").css('float','left');
        $(".page-distributor-register .form-item:odd").css('float','right');


        //SEARCH PRODUCTS - PLACEHOLDER
        $.each($(".product-filter input[type=text]"),function(){
           var placeholder = jQuery(this).parent().parent().parent().find("label").hide().text().trim();
            jQuery(this).attr("placeholder",placeholder);
        });

        //SELECT VARIETY
        var option_main_text = jQuery("#edit-field-conditions-tid").parent().parent().parent().find("label").hide().text().trim()
        jQuery("#edit-field-conditions-tid").find("option").eq(0).text(option_main_text);


        //USER-LOGIN

        var html = "<span class='forgot-pass'><a href='/user/password'>Forgot password?</a></span>";
        $(".form-item-remember-me").append(html);



        //chekcout
        jQuery(".grams input").keyup(function(){
           var price =  jQuery(this).parent().parent().find(".price").attr("data-price");
           var grams = jQuery(this).val();
           var subtotal = parseFloat(price) * parseFloat(grams);
           jQuery(this).parent().parent().find(".sub-total").text("$" + subtotal).attr("data-subtotal",subtotal);


            //total General
//            var list = _.map(jQuery(".sub-total"),function(i){ return jQuery(i).attr("data-subtotal")})
//            var total = _.reduce(list,function(total,item){ return parseFloat(total) + parseFloat(item) })
//
//            jQuery(".check-total").text("$ "+total)
            CalcularTotal()



        });

        jQuery(".check-remove").click(function(e){
            //e.preventDefault();
            jQuery(this).parent().parent().remove();
            CalcularTotal()

        });

        jQuery(".page-client-register h1").prependTo(jQuery("#cann-general-page-client-register-form"))

        jQuery('.go-to-my-panel').click(function(){
           window.location = "panel"
        });


      $('.some-selector', context).once('foo', function () {


        // Now, we are invoking the previously declared theme function using two
        // settings as arguments.
        var $anchor = Drupal.theme('cannhealthExampleButton', settings.myExampleLinkPath, settings.myExampleLinkTitle);

        // The anchor is then appended to the current element.
        $anchor.appendTo(this);
      });
    }
  };

    function CalcularTotal(){
        var list = _.map(jQuery(".sub-total"),function(i){ return jQuery(i).attr("data-subtotal")})
        var total = _.reduce(list,function(total,item){ return parseFloat(total) + parseFloat(item) })

        jQuery(".check-total").text("$ "+total)

    }


})(jQuery);
