Items = new Meteor.Collection('items');

if (Meteor.isClient) {
  // used by the sliders
  Session.setDefault("counter", 50);

  Template.home.helpers({
    items: function (argument) {
      return Items.find();
    }
  });

  Template.home.rendered = function (argument) {
    // After <paper-dialog> is created activate the animation
    $('paper-dialog')[0].toggle();
    console.log('created');
  }

Template.home.events({
  'core-overlay-close-completed, tap [data-action="close-dialog"]':function  () {
    console.log('paper-dialog DOM cleanup');
    $('paper-dialog').remove();
    $('.core-overlay-backdrop').remove();
  },
  'tap [data-del]': function () {
    // increment the counter when button is clicked
    Items.remove({_id:this._id});
    console.log('data-del');
  }
});

Template.sidebar.events({
  'tap [data-action="open-dialog"]': function () {
      Blaze.render(Template.home, document.getElementById('placeholder'));
      // refill data
      if (Items.find().count() == 0) {
        for(var i = 0; i<10; i++){
          Items.insert({name:'item '+Random.id(), rank:i});
        }
      }
  },
  'tap [data-del]': function () {
    // increment the counter when button is clicked
    Items.remove({_id:this._id});
    console.log('data-del');
  }
});


  Template.app.helpers({
    counter: function () {
      return Session.get("counter");
    },
    items: function () {
      return Items.find();
    }
  });

  Template.app.events({

    'tap [data-action="open-dialog"]': function () {
      Blaze.render(Template.home, document.body);
      console.log('open');
    },

    'change #uno': function (e, template) {
      console.log('core-change '+e.target.value);
      // debugger
      Session.set('counter', e.target.value);
    },
    'tap [data-del]': function () {
      Items.remove({_id:this._id});
      console.log('data-del app');
    }
  });

  Template.app.rendered = function (argument) {
      var navicon = document.getElementById('navicon');
      var drawerPanel = document.getElementById('drawerPanel');
      navicon.addEventListener('tap', function() {
        drawerPanel.togglePanel();
      });
  }
}

if (Meteor.isServer) {

}
