angular.module('DosenApp', [])

.controller('DosenCtrl', function($scope, $timeout, $http) {
    $scope.results = {};
    $scope.data = [];

    $scope.loading = true;

    $http.get('http://sonnylab.com/api/dosen/all').success(function(data) {
        $scope.data = data;
        $scope.loading = false;
    });

    $scope.contains = function(str, it) { 
        if (str == null || it == null) return false;
        return str.toLowerCase().indexOf(it.toLowerCase()) != -1; 
    };

    $scope.search = function() {
        if (!$scope.loading) {
            $result = angular.element('.result');
            $result.hide().removeClass('animated');
            $scope.dosens = _.sortBy(_.filter($scope.data, function(item) {
                return $scope.contains(item.nama, $scope.searchText) || 
                    $scope.contains(item.nip, $scope.searchText) ||
                    $scope.contains(item.bidang_keahlian, $scope.searchText);
            }), function(item) {
                return item.nama;
            });
            $timeout(function() {
                $result.show().addClass('animated bounceIn');
            });
        }
    }
});