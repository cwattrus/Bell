Rings = new Mongo.Collection("rings");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("bell", "remote");
  watchForRing();

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    }
  });

  Template.hello.events({
    'click button': function () {
      queueRing();
    }
  });
  Template.config.events({
    'click button': function (event, template) {
      toggleBellType(template.find("button"));
    }
  });

  function toggleBellType(button) {
    console.dir(button);
    if(Session.get("bell")=="master") {
      Session.set("bell", "remote");
      $(".bell-config-icon").removeClass("icon-bell-master");
      $(".bell-config-icon").addClass("icon-bell-remote");
    }
    else {
      Session.set("bell", "master")
      $(".bell-config-icon").addClass("icon-bell-master");
      $(".bell-config-icon").removeClass("icon-bell-remote");
    }
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

function watchForRing() {
  var count = 0;
  var query = Rings.find({});
  var handle = query.observeChanges({
    added: function (id, user) {
      count++;
      console.log("Bell should ring if master");
      ringBell();
    },
  });
}

function ringBell() {
  if(Session.get("bell")=="master") {
    var audio = new Audio("Bell.wav");
    console.dir(audio);
    audio.play();
    console.log("bell rung");
  }
}
function queueRing() {
  Rings.insert({"time": $.now()});
}