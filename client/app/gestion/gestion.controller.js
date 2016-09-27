'use strict';
(function(){

class GestionComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('congeApp')
  .component('gestion', {
    templateUrl: 'app/gestion/gestion.html',
    controller: GestionComponent
  });

})();
