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

    $scope.showMenu = true;
    $scope.message = "Loading ...";
    $scope.dishes = menuFactory.getDishes().query();
    // .then(
    //     function(response) {
    //         $scope.dishes = response.data;
    //         $scope.showMenu = true;
    //     },
    //     function(response) {
    //         $scope.message = "Error: "+response.status + " " + response.statusText;
    //     }
    // );

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

.controller('FeedbackController', ['$scope', function($scope) {
    $scope.sendFeedback = function() {
        console.log($scope.feedback);
        if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) 
        {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        }
        else 
        {
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

    $scope.dish = menuFactory.getDishes().get({id: parseInt($stateParams.id, 10)});
    $scope.showDish = true;
    $scope.message = "Loading ...";
    
    // menuFactory.getDish(parseInt($stateParams.id,10))
    // .then(
    //     function(response) {
    //         $scope.dish = response.data;
    //         $scope.showDish = true;
    //     },
    //     function(response) {
    //         $scope.message = "Error: "+response.status + " " + response.statusText;
    //     }
    // );
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
    $scope.promotionDish = menuFactory.getPromotion(0);
    $scope.featuredDish = menuFactory.getDishes().get({id: 0});
    $scope.showDish = true;
    $scope.message = "Loading ...";

    // menuFactory.getDish(0)
    // .then(
    //     function(response){
    //         $scope.featuredDish = response.data;
    //         $scope.showDish = true;
    //     },
    //     function(response) {
    //         $scope.message = "Error: " + response.status + " " + response.statusText;
    //     }
    // );
    $scope.executiveChef = corporateFactory.getLeader(3);
}])

.controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
    $scope.leaders = corporateFactory.getLeaders();
}])
;

