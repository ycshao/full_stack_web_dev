'use strict';

angular.module('confusionApp')
.controller('menuController', ["$scope", "menuFactory", function($scope, menuFactory) {
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

    $scope.dishes = menuFactory.getDishes();

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
        if ($scope.feedback.agree && ($scope.feedback.mychannel == "") && !$scope.feedback.mychannel) 
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

.controller('DishDetailController', ['$scope', "menuFactory", function($scope, menuFactory) {

    $scope.dish= menuFactory.getDish(3);
    $scope.orderBy = "";
    
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
    }
}])

;

