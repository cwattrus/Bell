if (Meteor.isClient) {
  bell = Session.get("bell");
  init = true;

  Meteor.startup(function(){
      if(Cookie.get('bell')!='master') {
        Cookie.set('bell', 'remote');
      }
  });

  Template.hello.rendered = function() {
    watchForRing();
  }

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
      queueRing(bell);
    }
  });
  Template.config.events({
    'click #bell-toggle': function (event, template) {
      toggleBellType(template.find("button"));
    },
    'keyup .bell-name': function(event,template) {
      var newValue = $(".bell-name").val();
      var bell = Bells.findOne({"_id":Session.get("bell")});
      var oldValue = bell.name;
      if(newValue!=oldValue) {
        Bells.update({"_id":bell._id}, {$set : {"name":newValue}});
      }
    }
  });
  Template.share.events({
    'click .share-menu-toggle': function (event, template) {
      $(".share-menu").toggleClass("expanded");
    },
    'click .close': function (event, template) {
      $(".share-menu").toggleClass("expanded");
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

function watchForRing() {
  var query = Rings.find({"bell":bell});
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
  if(Cookie.get("bell")=='master') {
    var audio = new Audio("/Bell.wav");
    console.dir(audio);
    audio.play();
    console.log("bell rung");
  }
}
function queueRing() {
  Rings.insert({"time": $.now(), "bell":bell});
}
