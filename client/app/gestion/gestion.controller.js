'use strict';
(function(){

class GestionComponent {
  constructor(User,Conge) {
    this.Conge=Conge;
    this.User=User;
    this.newConge={
      start: new Date(),
      end: new Date(),
      duration:0
    };
    this.popupStartDate={opened:false};
    this.openStartDate = function() {
      this.popupStartDate.opened = true;
    };
    this.popupEndDate={opened:false};
    this.openEndDate = function() {
      this.popupEndDate.opened = true;
    };
    this.users = User.query();
    this.conges = Conge.query(function (results) {
      console.log(JSON.parse(JSON.stringify(results)));
    });
    console.log(this.conges);
  }

  create(){
    var _this=this;
    if(this.newConge.user && this.newConge.start && this.newConge.end){

      this.newConge.user = parseInt(this.newConge.user);
      this.newConge.start = this.newConge.start||new Date();
      this.newConge.end = this.newConge.end || new Date();
      this.newConge.duration =this.newConge.duration || 1;
      this.Conge.save(this.newConge).$promise
      .then(() => {
        _this.conges = _this.Conge.query(function (results) {
          console.log(JSON.parse(JSON.stringify(results)));
        });

      });
      this.newConge={
        start: new Date(),
        end: new Date(),
        duration:0
      };
    }
  }
}

angular.module('congeApp')
  .component('gestion', {
    templateUrl: 'app/gestion/gestion.html',
    controller: GestionComponent,
    controllerAs:'gestion'
  });

})();
