'use strict';

angular.module('confusionApp')
.controller('MenuController', ["$scope", 'menuFactory', function($scope, menuFactory) {
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;

    $scope.select = function(setTab) {
        $scope.tab = setTab;

        if (setTab === 2)
        {
            $scope.filtText = "appetizer";
        }
        else if (setTab === 3)
        {
            $scope.filtText = "mains";
        }
        else if (setTab === 4)
        {
            $scope.filtText = "dessert";
        }
        else
        {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.showMenu = false;
    $scope.message = "Loading ...";
    $scope.dishes = [];
    menuFactory.getDishes().query(
        function(response) {
            $scope.dishes = response;
            $scope.showMenu = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        }
    );

    $scope.toggleDetails = function() {
        $scope.showDetails = !$scope.showDetails;
    };
}])

.controller('ContactController', ['$scope', function($scope) {

    $scope.feedback = {
        mychannel: "", 
        firstName: "", 
        lastName: "",
        agree: false, 
        email:"" 
    };
    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
}])

.controller('FeedbackController', ['$scope', 'feedbackFactory',
function($scope, feedbackFactory) {
    $scope.sendFeedback = function() {
        console.log($scope.feedback);
        if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) 
        {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        }
        else 
        {
            feedbackFactory.getFeedbacks().save($scope.feedback);
            $scope.invalidChannelSelection = false;
            $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                               agree:false, email:"" };
            $scope.feedback.mychannel="";

            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        }
    };
}])

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', 
function($scope, $stateParams, menuFactory) {

    $scope.dish = {};
    $scope.showDish = false;
    $scope.orderBy = "";

    $scope.showDish = false;
    $scope.message = "Loading ...";   
    $scope.dish = {};
    menuFactory.getDishes().get({id: parseInt($stateParams.id, 10)}).$promise.then(
        function(response) {
            $scope.dish = response;
            $scope.showDish = true;
        },
        function(response) {
            $scope.message = "Error: "+response.status + " " + response.statusText;
        }
    ); 
}])

.controller('DishCommentController', ['$scope', function($scope) {
    $scope.test = "abc";
    $scope.comment = {
        name: "",
        star: "5",
        commentText: ""
    };
    
    $scope.submitComment = function () {
        $scope.dish.comments.push({
            rating: Number($scope.comment.star),
            comment: $scope.comment.commentText,
            author: $scope.comment.name,
            date: new Date().toISOString()
        });

        $scope.comment = {
            name: "",
            star: "5",
            commentText: ""
        };

        $scope.commentForm.$setPristine();
    };
}])

.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', 
function($scope, menuFactory, corporateFactory) {
    $scope.showDish = false;
    $scope.showPromotion = false;
    $scope.showLeader = false;
    $scope.message = "Loading ...";
    $scope.featuredDish = {};
    menuFactory.getDishes().get({id: 0}).$promise.then(
        function(response){
            $scope.featuredDish = response;
            $scope.showDish = true;
        },
        function(response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );
    menuFactory.getPromotion().get({id: 0}).$promise.then(
        function(response) {
            $scope.promotionDish = response;
            $scope.showPromotion = true;
        },
        function(response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );
    corporateFactory.getLeaders().get({id: 3}).$promise.then(
        function(response) {
            $scope.executiveChef = response;
            $scope.showLeader = true;
        },
        function(response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );
}])

.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
    $scope.leaders = [];
    $scope.showLeaders = false;
    corporateFactory.getLeaders().query().$promise.then(
        function(response) {
            $scope.leaders = response;
            $scope.showLeaders = true;
        },
        function(response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        }
    );
}])
;

