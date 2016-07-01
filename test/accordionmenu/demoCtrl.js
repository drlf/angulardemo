/**
 * Created by 0001 on 2015/11/2.
 */
var expModule=angular.module('expanderModule',[])

expModule.directive('sidebarmenu', function() {
    return {
        restrict : 'EA',
        replace : true,
        transclude : false,
        scope : {
            menus : '=menus'
        },
        templateUrl : 'menu.html',
        controller : function() {
            var expanders = [];
            this.gotOpened = function(selectedExpander) {
                angular.forEach(expanders, function(expander) {
                    if (selectedExpander != expander) {
                        expander.showMe = false;
                    }
                });
            }
            this.addExpander = function(expander) {
                expanders.push(expander);
            }
        }
    }
});

expModule.directive('submenu', function() {
    return {
        restrict : 'EA',
        replace : true,
        //transclude : true,
        require : '^?sidebarmenu',
        scope : {
            menu : '=menu'
        },
        templateUrl : 'submenu.html',
        link : function(scope, element, attrs, accordionController) {
            scope.showMe = false;
            accordionController.addExpander(scope);
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
                accordionController.gotOpened(scope);
            }
        }
    }
});

expModule.controller("demoController",function($scope) {

    var settingMenu = {
        name: 'setting',
        icon: '',
        isLeaf: false,
        subMenu: [{
            name: 'setting.add',
            isLeaf: true,
            sref: 'app.setting.add',
            icon: ''
        },
            {
                name: 'setting.edit',
                isLeaf: true,
                sref: 'app.setting.edit',
                icon: ''
            },
            {
                name: 'setting.view',
                isLeaf: true,
                sref: 'app.setting.view',
                icon: ''
            }

        ]
    };

    var userMenu = {
        name: 'user',
        icon: '',
        isLeaf: false,
        subMenu: [{
            name: 'user.add',
            isLeaf: true,
            sref: 'app.user.add',
            icon: ''
        },
            {
                name: 'user.edit',
                isLeaf: true,
                sref: 'app.user.edit',
                icon: ''
            },
            {
                name: 'user.view',
                isLeaf: true,
                sref: 'app.user.view',
                icon: ''
            }

        ]
    };

    var sysMenu = {
        name: 'sys',
        isLeaf: true,
        sref: 'app.sys',
        icon: ''
    };

    $scope.sysMenu = sysMenu;
    $scope.userMenu = userMenu;
    $scope.rootmenu = [userMenu, settingMenu,sysMenu];

});