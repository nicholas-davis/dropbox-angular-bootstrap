//FilesService
filesModule.service('FilesService', ['config', '$http',
    function (config, $http) {
        return {
            getFilesConfig: function () {
                return $http.get(config.apiUrl + '/files.json').then(function (response) {
                    return response.data;
                });
            }
        };
    }
]);