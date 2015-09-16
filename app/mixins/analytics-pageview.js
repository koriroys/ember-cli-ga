import Ember from 'ember'

export default Ember.Mixin.create({
  didTransition: function() {
    this._super(...arguments);
    return window['ga']('send', 'pageview');
  }
});
