/* global angular */
(function() {
  'use strict';

  console.clear();

  var app = angular.module('formlyExample', ['formly', 'formlyBootstrap', 'ui.bootstrap', 'ngSanitize', 'ui.select']);

  app.run(function(formlyConfig) {
    // NOTE: This next line is highly recommended. Otherwise Chrome's autocomplete will appear over your options!
    formlyConfig.extras.removeChromeAutoComplete = true;
    formlyConfig.setType({
      name: 'async-ui-select',
      extends: 'select',
      templateUrl: 'async-ui-select-type.html'
    });

    formlyConfig.setType({
      name: 'ui-select',
      extends: 'select',
      template: '<ui-select ng-model="model[options.key]" theme="bootstrap" ng-required="{{to.required}}" ng-disabled="{{to.disabled}}" reset-search-input="false"> <ui-select-match placeholder="{{to.placeholder}}"> {{$select.selected[to.labelProp || \'name\']}} </ui-select-match> <ui-select-choices group-by="to.groupBy" repeat="option[to.valueProp || \'value\'] as option in to.options | filter: $select.search"> <div ng-bind-html="option[to.labelProp || \'name\'] | highlight: $select.search"></div> </ui-select-choices> </ui-select>'
    });

    formlyConfig.setType({
      name: 'ui-select-select2',
      extends: 'ui-select',
      template: '<ui-select ng-model="model[options.key]" theme="select2" ng-required="{{to.required}}" ng-disabled="{{to.disabled}}" reset-search-input="false"> <ui-select-match placeholder="{{to.placeholder}}"> {{$select.selected[to.labelProp || \'name\']}} </ui-select-match> <ui-select-choices group-by="to.groupBy" repeat="option[to.valueProp || \'value\'] as option in to.options | filter: $select.search"> <div ng-bind-html="option[to.labelProp || \'name\'] | highlight: $select.search"></div> </ui-select-choices> </ui-select>'
    });

    formlyConfig.setType({
      name: 'ui-select-selectize',
      extends: 'ui-select',
      template: '<ui-select ng-model="model[options.key]" theme="selectize" ng-required="{{to.required}}" ng-disabled="{{to.disabled}}" reset-search-input="false"> <ui-select-match placeholder="{{to.placeholder}}"> {{$select.selected[to.labelProp || \'name\']}} </ui-select-match> <ui-select-choices group-by="to.groupBy" repeat="option[to.valueProp || \'value\'] as option in to.options | filter: $select.search"> <div ng-bind-html="option[to.labelProp || \'name\'] | highlight: $select.search"></div> </ui-select-choices> </ui-select>'
    });
  });


  app.controller('MainCtrl', function MainCtrl(formlyVersion, $http, $q) {
    var vm = this;
    // funcation assignment
    vm.onSubmit = onSubmit;

    // variable assignment
    vm.author = { // optionally fill in your info below :-)
      name: 'Benjamin Orozco',
      url: 'https://github.com/benoror'
    };
    vm.exampleTitle = 'UI Select'; // add this
    vm.env = {
      angularVersion: angular.version.full,
      formlyVersion: formlyVersion
    };

    vm.model = {state:'AZ'};
    vm.options = {};

    var states_list = [
      {
        "name": "Alabama",
        "abbr": "AL"
      },
      {
        "name": "Alaska",
        "abbr": "AK"
      },
      {
        "name": "American Samoa",
        "abbr": "AS"
      },
      {
        "name": "Arizona",
        "abbr": "AZ"
      },
      {
        "name": "Arkansas",
        "abbr": "AR"
      },
      {
        "name": "California",
        "abbr": "CA"
      },
      {
        "name": "Colorado",
        "abbr": "CO"
      },
      {
        "name": "Connecticut",
        "abbr": "CT"
      }
    ];

    vm.fields = [
      {
        key: 'state',
        type: 'ui-select',
        templateOptions: {
          label: 'State (bootstrap theme)',
          valueProp: 'abbr',
          labelProp: 'name',
          options: states_list
        }
      },
      {
        key: 'state',
        type: 'ui-select-select2',
        templateOptions: {
          label: 'State (bootstrap theme)',
          valueProp: 'abbr',
          labelProp: 'name',
          options: states_list
        }
      },
      {
        key: 'state',
        type: 'ui-select-selectize',
        templateOptions: {
          label: 'State (bootstrap theme)',
          valueProp: 'abbr',
          labelProp: 'name',
          options: states_list
        }
      },
      {template: '<hr />'},
      {
        key: 'awesomeAddress',
        type: 'async-ui-select',
        templateOptions: {
          label: 'Address',
          placeholder: 'Example of Async Select',
          valueProp: 'formatted_address',
          labelProp: 'formatted_address',
          options: [],
          refresh: refreshAddresses,
          refreshDelay: 0
        }
      }
    ];

    vm.originalFields = angular.copy(vm.fields);

    // function definition
    function onSubmit() {
      vm.options.updateInitialValue();
      alert(JSON.stringify(vm.model), null, 2);
    }

    function refreshAddresses(address, field) {
      var promise;
      if (!address) {
        promise = $q.when({data: {results: []}});
      } else {
        var params = {address: address, sensor: false};
        var endpoint = '//maps.googleapis.com/maps/api/geocode/json';
        promise = $http.get(endpoint, {params: params});
      }
      return promise.then(function(response) {
        field.templateOptions.options = response.data.results;
      });
    }
  });

})();