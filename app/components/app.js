//Dropbox App
var dropboxApp = angular.module('dropboxApp', [
    'ngAnimate',
    'ngMessages',
    'dropboxApp.folder',
    'dropboxApp.files',
    'angularMoment',
    'ui.bootstrap',
    'ui.router'
]);

dropboxApp.run([
    '$rootScope', '$state', '$stateParams', '$location', '$uibModalStack',
    function ($rootScope, $state, $stateParams, $location, $uibModalStack) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeSuccess',
            function (ev, to, toParams, from, fromParams) {

                //Page title
                var pageLocation = $location.path().replace(/^.*[\\\/]/, '');
                $rootScope.pageTitle = $stateParams.pageTitle
                    ? $stateParams.pageTitle
                    : pageLocation.charAt(0).toUpperCase() + pageLocation.slice(1);

                //Previous/Current state
                $rootScope.previousState = from.name;
                $rootScope.previousStateURL = from.url;
                $rootScope.currentState = to.name;
                $rootScope.currentStateURL = to.url;

                //Set active class to main tabs
                $rootScope.isPage = function (route) {
                    return route === $location.path();
                }

                //If modal is opened, discard modal when the user clicks on back btn
                $uibModalStack.dismissAll('cancel');
            });
    }
]);

dropboxApp.config([
    '$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/files");

        $stateProvider.state('Folder', { //parent   
            abstract: true,
            templateUrl: 'components/folder/folder-view.html',
            controller: "FolderController",
            controllerAs: "folder"
        }).state('Folder.Files', {
            url: '^/files',
            templateUrl: 'components/files/files-view.html',
            controller: "FilesController",
            controllerAs: "files",
            resolve: {
                pageTitle: [
                    '$stateParams', function ($stateParams) {
                        $stateParams.pageTitle = "Files";
                    }
                ]
            }
        });
    }
]);

dropboxApp.constant('config', {
    apiUrl: '',
    baseUrl: '/',
});

//global vars
var folderModule = angular.module('dropboxApp.folder', []);
var filesModule = angular.module('dropboxApp.files', []);