Template.account.helpers({
  // master: function () {
  //   if(Cookie.get('bell')=='master') {
  //     return true;
  //   }
  //   else return false;
  // },
  userMessage: function() {
    return Meteor.user().profile.name;
  }
});

Template.menu.helpers({
  bells: function() {
    return Bells.find({"owner":Meteor.userId()});
  },
});


Template.config.helpers({
  name: function() {
    if(Bells.findOne(Session.get("bell"))){
      return Bells.findOne(Session.get("bell")).name;
    }
  }
});

Template.menu.events({
  'click .aside-menu': function() {
    $(".aside").toggleClass("expanded");
  },
  'click .close': function() {
    $(".aside").toggleClass("expanded");
  },
});

Template.start.events({
  'click .create-bell': function () {
    var bell;

    if(Meteor.user()) {
      bell = Bells.insert({"owner": Meteor.userId(), "name":"New bell"});
    }
    else {
      bell = Bells.insert({});
    }
    check(bell, String);
    Cookie.set(bell, 'remote');
    Router.go("/bell/"+bell);

  },
});

Template.account.events({
  'click .login': function() {
    Meteor.loginWithGoogle();
  },
  'click .logout': function() {
    Meteor.logout();
  }
});
