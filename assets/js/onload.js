// Set up our global Erskine Design Javascript object
var EDJ = {
    debug: true,
    STATIC_URL: '/assets/',
    is_touch: false,
    run_list: [
        'navigation',
    ],
    $body: {}
};

/**
 * On ready
 *
 * Called when document is ready
 *
 * Used on: all pages
 *
 * @namespace EDJ
 * @class on_ready
 * ---------------------------------------------------------------------------------------------------
*/
EDJ.on_ready = function() {
    var i = 0;
    var functions_to_run = EDJ.run_list.length;

    // Cache the body object for use later
    EDJ.$body = $('body');
    
    // Check for a touch device
    EDJ.is_touch = this.is_touch_device();

    // Loop through our functions and run those that exist and said they should
    for (i=0; i<functions_to_run; i++) {
        // If the init function exists, and the run key is set to true
        if (typeof EDJ[EDJ.run_list[i]].init === 'function' && ( 
            (typeof EDJ[EDJ.run_list[i]].run === 'function' && EDJ[EDJ.run_list[i]].run() === true) ||
            (typeof EDJ[EDJ.run_list[i]].run === 'boolean' && EDJ[EDJ.run_list[i]].run === true)
        )) {
            // Log that we've called the init function
            EDJ.log('initialising EDJ.'+EDJ.run_list[i]);

            // Call the init function!
            EDJ[EDJ.run_list[i]].init();

            // Log that we've finished the init function
            EDJ.log('finished running EDJ.'+EDJ.run_list[i]);

        }

    }

};

/**
 * Is touch device
 *
 * Checks to see if the agent is a touch device
 *
 * Used on: all pages
 *
 * @namespace EDJ
 * @return boolean
 * @class on_ready
 * ---------------------------------------------------------------------------------------------------
*/
EDJ.is_touch_device = function() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}


/**
 * Log
 *
 * Will log any arguments (arrays, objects, strings etc.) to the console
 * if it exists, and EDJ.debug is set to true
 *
 * Used on: all pages
 *
 * @namespace EDJ
 * @class log
 * @param anything!
 * ---------------------------------------------------------------------------------------------------
*/
EDJ.log = function() {
    if (EDJ.debug === true && typeof(console) !== 'undefined') {
        console.log('[EDJ] ' + Array.prototype.join.call(arguments, ' '));
    }
};

/**
 * Navigation
 *
 * Various helpers for naviation
 *
 * Used on: all pages
 *
 * @namespace EDJ
 * @class navigation
 * ---------------------------------------------------------------------------------------------------
*/
EDJ.navigation = {
    run: true,

    init: function() {
        var $access_links = EDJ.$body.find('ul#nav_access li a');

        $access_links.focus(function(){ 
            $(this).addClass('focus');
        });

        $access_links.blur(function(){ 
            $(this).removeClass('focus'); 
        });

    },

};
