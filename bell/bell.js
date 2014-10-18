Rings = new Mongo.Collection("rings");

if (Meteor.isClient) {

  init = true;

  Meteor.startup(function(){
      if(Cookie.get('bell')!='master') {
        Cookie.set('bell', 'remote');
      }
      watchForRing();
  });

  Meteor.subscribe("rings", function() {
    init = false;
  });

  Template.config.helpers({
    master: function () {
      if(Cookie.get('bell')=='master') {
        return true;
      }
      else return false;
    },
  });

  Template.hello.events({
    'click button': function () {
      queueRing();
    }
  });
  Template.config.events({
    'click #bell-toggle': function (event, template) {
      toggleBellType(template.find("button"));
    }
  });
  Template.share.events({
    'click .icon-remotes': function (event, template) {

    }
  });

  function toggleBellType(button) {
    if(Cookie.get('bell')=='master') {
      Cookie.set('bell', 'remote');
    }
    else {
      Cookie.set('bell', 'master');
    }
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.publish('rings', function(){
      return Rings.find({});
  });
}

function watchForRing() {
  var query = Rings.find({});
  var handle = query.observeChanges({
    _suppress_initial: true,
    added: function (id, user) {
      if(init==false) {
        console.log("Bell should ring if master");
        ringBell();
      }
    },
  });
}

function ringBell() {
  if(Cookie.get('bell')=='master') {
    var audio = new Audio("Bell.wav");
    console.dir(audio);
    audio.play();
    console.log("bell rung");
  }
}
function queueRing() {
  Rings.insert({"time": $.now()});
}
