'use strict';
(function(){

class GestionComponent {
  constructor(User,Conge) {
    var _this=this;
    this.type='3';
    this.Conge=Conge;
    this.User=User;
    this.oConges=[];
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
    this.fetch();
    this.suppr = function (conge) {
      conge.$delete(function(){ _this.fetch(parseInt(_this.type)); });
    };

  }

  filter(type){
    if(type===0 || type===1 || type===2){
      this.conges=this.oConges.filter(function(elt){
        return elt.status===type;
      });
    }else{
      this.conges=this.oConges;
    }
  }

  fetch(type){
    var _this=this;
    this.conges = _this.Conge.query(function (results) {
      if(results.length>0){
        var actuT=(new Date()).getTime();
        for (var i = 0; i < results.length; i++) {
          var startT= (new Date(results[i].start)).getTime();
          var endT = (new Date(results[i].end)).getTime();
          results[i].startT=startT;
          if(actuT < startT){//FUTUR
            results[i].status=1;
          }else if(actuT > endT){//PASSE
            results[i].status=2;
          }else{//EN COURS
            results[i].status=0;
          }
        }
        _this.oConges=results;
        if(type===0 || type===1 || type===2){
          results=results.filter(function(elt){
            return elt.status===type;
          });
        }
        _this.conges=results;
        return results;
      }
    });
  }

  create(){
    var _this=this;
    if(this.newConge.user && this.newConge.start && this.newConge.end){

      this.newConge.user = parseInt(this.newConge.user);
      this.newConge.start = this.newConge.start||new Date();
      this.newConge.start.setHours(0,0,0,0);
      this.newConge.end = this.newConge.end || new Date();
      this.newConge.end.setHours(23,59,59,999);
      this.newConge.duration =this.newConge.duration || 1;
      this.Conge.save(this.newConge).$promise
      .then(() => {
        _this.fetch();
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
