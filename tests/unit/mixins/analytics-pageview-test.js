import Ember from 'ember';
import AnalyticsPageviewMixin from '../../../mixins/analytics-pageview';
import { module, test } from 'qunit';

module('Unit | Mixin | analytics pageview');

// Replace this with your real tests.
test('it works', function(assert) {
  var AnalyticsPageviewObject = Ember.Object.extend(AnalyticsPageviewMixin);
  var subject = AnalyticsPageviewObject.create();
  assert.ok(subject);
});
