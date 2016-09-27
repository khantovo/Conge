'use strict';

describe('Component: GestionComponent', function () {

  // load the controller's module
  beforeEach(module('congeApp'));

  var GestionComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    GestionComponent = $componentController('GestionComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
