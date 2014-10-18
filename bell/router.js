// Router.configure({
//   layoutTemplate: 'layout'
// });

Router.map(function() {
  this.route('start', {
    path: '/',
    template: 'bell',
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
