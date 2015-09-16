/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-ga',

  // leaving this here for now, but it's probably a bad idea to actually do it.
  // config: function(environment, appConfig ) {
  //   var scriptSrc = appConfig.contentSecurityPolicy['script-src'] + " http://www.google-analytics.com https://www.google-analytics.com"

  //   var ENV = {
  //     contentSecurityPolicy: {
  //       // stuff google analytics into the trusted script sources list
  //       'script-src': scriptSrc
  //     }
  //   }
  //   return ENV;
  // },

  dynamicScript: function(request) {
    var uaCode = process.env.GA_UA_CODE;

    return "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n" +
      "  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n" +
      "  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n" +
      "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');\n" +
      "\n" +
      "ga('create', '" + uaCode + "', 'auto');"
      // ga('send', 'pageview');
  },

  contentFor: function(type) {
    if (type === 'head') {
      return '<script src="ember-cli-ga.js" type="text/javascript"></script>';
    }
  },

  serverMiddleware: function(config) {
    var self = this;
    var app = config.app;
    var options = config.options;
    var project = options.project;

    var appConfig = project.config(options.environment);
    if (!appConfig.GA) {
      throw new Error("you need to define GA with a UA_CODE in your config/environment.js");
    }

    process.env.GA_UA_CODE = appConfig.GA['UA_CODE'];

    app.use(options.baseURL + 'ember-cli-ga.js', function(request, response, next) {
      response.contentType('text/javascript');
      response.send(self.dynamicScript());
    })
  }
};
