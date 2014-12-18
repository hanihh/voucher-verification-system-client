/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var saa_server_url = "http://localhost/SAA/backend/web/index.php";

app.factory('AuthService', ['$http', '$cookies', 'SessionService', function ($http, $cookies, SessionService) {
        var authService = {};

        authService.login = function (credentials) {
            return $http({method: 'POST', url: saa_server_url + '?r=site/login', data: {_csrf: $cookies['YII_CSRF_TOKEN']}}).then(function (response) {
                console.log(response);
                SessionService.create(response.data.id, response.data.user.id,
                        response.data.user.role);
                return response.data.user;
            });
        };

        authService.logout = function () {
            return $http({method: 'POST', url: saa_server_url + '?r=site/logout', data:''}).then(function () {               
                return true;
            });
        };

        authService.isAuthenticated = function () {
            return !!SessionService.userId;
        };

        authService.isAuthorized = function (authorizedRoles) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (authService.isAuthenticated() &&
                    authorizedRoles.indexOf(SessionService.userRole) !== -1);
        };

        authService.getCsrfSecurityToken = function() {
//            console.log($cookies['YII_CSRF_TOKEN']);
//            return $http({method: 'POST', url: saa_server_url+ '?r=site/login'}).error(function (data, status, headers, header) {               
//                console.log(data); 
//                  console.log(header);
//                console.log(headers);
//                console.log($cookieStore.get('_csrf'));
//            });               
        }
        
        return authService;
    }]);
