Meteor.publish('rings', function(){
    return Rings.find({});
});

Meteor.publish('bells', function(){
    return Bells.find({});
});
