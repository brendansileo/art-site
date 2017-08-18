 var app = angular.module("myapp", [])
         
 app.controller("site", function($scope,$http) {
 	$scope.im = []
 	$scope.currImage1 = 0;
 	$scope.currImage2 = 1;
 	$scope.visPanel = 1;
 	$scope.dateLabel = "";
 	

 	$scope.listFiles = function()
 	{
 		$http({
		  method: 'GET',
		  url: '/pics'
		}).then(function successCallback(response) {
				$scope.im = response.data.match(/\"(\/.*\/.*\.jpg)\"/g)
				for(i=0;i<$scope.im.length;i++)
				{
					$scope.im[i] = $scope.im[i].replace("\"", "")
					$scope.im[i] = $scope.im[i].replace("\"", "")
				}
				$scope.currImage1 = $scope.im.length-1;
				$scope.currImage2 = $scope.im.length-2;
				$scope.dateLabel = $scope.getLabel();
			});
		
 	}

 	$scope.getImage = function(i)
 	{
 		return $scope.im[i];
 	}

 	$scope.getLabel = function()
 	{
 		var i;
 		if($scope.visPanel == 1)
 		{
 			i = $scope.currImage1;
 		}
 		else
 		{
 			i = $scope.currImage2
 		}
 		var label = $scope.im[i].replace("/pics/", "")
 		label = label.replace(".jpg", "")
 		return label
 	}

 	$scope.imageLeft = function()
 	{
		if($scope.visPanel == 1)
		{
			if($scope.currImage1 != 0)
			{
				$scope.currImage2 = $scope.currImage1-1
				d3.select("#panel2").style("left", "-100vw");
				d3.select("#panel1").transition().style("left", "200vw").duration(2000);
				d3.select("#panel2").transition().style("left", "50vw").duration(2000);
				$scope.visPanel = 2;
			}
		}
		else if($scope.visPanel == 2)
		{
			if($scope.currImage2 != 0)
			{
				$scope.currImage1 = $scope.currImage2-1
				d3.select("#panel1").style("left", "-100vw");
				d3.select("#panel2").transition().style("left", "200vw").duration(2000);
				d3.select("#panel1").transition().style("left", "50vw").duration(2000);
				$scope.visPanel = 1;
			}
		}
 		$scope.dateLabel = $scope.getLabel();
 	}

 	$scope.imageRight = function()
 	{
 		if($scope.visPanel == 1)
		{
			if($scope.currImage1 != $scope.im.length-1)
			{
				$scope.currImage2 = $scope.currImage1+1
				d3.select("#panel2").style("left", "200vw");
				d3.select("#panel1").transition().style("left", "-100vw").duration(2000);
				d3.select("#panel2").transition().style("left", "50vw").duration(2000);
				$scope.visPanel = 2
			}
		}
		else if($scope.visPanel == 2)
		{
			if($scope.currImage2 != $scope.im.length-1)
			{
				$scope.currImage1 = $scope.currImage2+1
				d3.select("#panel1").style("left", "2000px");
				d3.select("#panel2").transition().style("left", "-100vw").duration(2000);
				d3.select("#panel1").transition().style("left", "50vw").duration(2000);
				$scope.visPanel = 1
			}
		}
 		$scope.dateLabel = $scope.getLabel()
 	}

 	var init = function() 
 	{
 		$scope.listFiles();
 	}
 	init();
 });