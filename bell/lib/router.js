Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('start', {
    path: '/',
    template: 'start',
  });
  this.route('bell', {
    path: '/bell/:id',
    template: 'bell',
    onBeforeAction: function() {
      var bellId = this.params.id;
      Session.set('bell', bellId);
      this.next();
    },
    data: function () {
      var bellId = this.params._id;
      return Bells.findOne({_id: bellId});
    }
  });

  this.route('config', {
    path: '/config',
    template: 'accountsConfig',
  });
  this.route('ring', {
    where: 'server',
    path: '/ring',
    action: function () {
      queueRing();
    }
  });
});

function queueRing() {
  Rings.insert({"time": "server"});
}
