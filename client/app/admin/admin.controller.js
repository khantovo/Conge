'use strict';

(function() {

class AdminController {
  constructor(User) {
    // Use the User $resource to fetch all users
    this.User=User;
    this.users = User.query();
    this.newUser= {};
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  update(user){
    console.log('update');
    var _this=this;
    _this.User.updateInfo(user).$promise
      .then((userUpdated) => {
        _this.users = _this.User.query();
      });
  }

  register(user){
    var _this=this;
    _this.User.save(user).$promise
      .then(() => {
        _this.newUser= {};
        _this.users = _this.User.query();
      });
  }
}

angular.module('congeApp.admin')
  .controller('AdminController', AdminController);

})();
