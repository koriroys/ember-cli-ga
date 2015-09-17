NOTE: currently only works in development. Sorry about that. :/



# ember-cli-ga

## About

simple google analytics addon

## Installation

`npm install --save-dev ember-cli-ga`

## Usage

### Step 1

In your `config/environment.js`, you need to do some basic setup:

```javascript
if (environment === 'development') {
  ENV.GA = {
    UA_CODE: "your UA code here" // where UA code looks something like: UA-00000000-1
  }
}
```

### Step 2

If you're using ember-content-security-policy (and if you're using ember-cli, you probably are) you'll need to make some changes to your content security policy. Open up your `config/environment.js` and put this in your ENV hash:

```javascript
contentSecurityPolicy: {
  'default-src': "'none'",
  'script-src': "'self' https://www.google-analytics.com/analytics.js http://www.google-analytics.com/analytics.js",
  'font-src': "'self'",
  'connect-src': "'self' https://www.google-analytics.com http://www.google-analytics.com",
  'img-src': "'self' https://www.google-analytics.com http://www.google-analytics.com",
  'style-src': "'self'",
  'media-src': "'self'"
}
```

### Step 3

Open `router.js` and add this at the top:

```javascript
import pageview from './mixins/analytics-pageview';
```

Then, where you declare your router, change it to look like this:

```javascript
var Router = Ember.Router.extend(pageview, {
  .
  .
  .
});
```

(pageview is the mixin that sends a page view on every route change).

### Step 4

Verify everything is working by opening up your google analytics page, clicking on "Real Time" > "Overview", and navigating around your site. You should see events coming in.
