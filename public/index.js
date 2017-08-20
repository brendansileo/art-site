 var app = angular.module("myapp", [])
         
 app.controller("site", function($scope,$http) {
 	$scope.im = []
 	$scope.imOrder = ["1","2","3"]
 	$scope.currImage = 0;
 	

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
				$scope.currImage = $scope.im.length-1;
			});
		
 	}

 	$scope.getImage = function(i)
 	{
 		if(i == $scope.imOrder[0])
 		{
 			if($scope.currImage != 0)
 			{
 				return $scope.im[$scope.currImage-1]
 			}
 			else
 			{
 				return "//:0"
 			}
 		}
 		else if(i == $scope.imOrder[1])
 		{
 			return $scope.im[$scope.currImage]
 		}
 		else
 		{
 			if($scope.currImage != $scope.im.length-1)
 			{
 				return $scope.im[$scope.currImage+1]
 			}
 			else
 			{
 				return "//:0"
 			}
 		}
 	}

 	$scope.getLabel = function()
 	{
 		try
 		{
	 		var label = $scope.im[$scope.currImage].replace("/pics/", "")
	 		label = label.replace(".jpg", "")
 		}
 		catch(err)
 		{
 			label = "";
 		}
 		return label
 	}

 	$scope.changeIm = function(i)
 	{
 		if(i == $scope.imOrder[0])
 		{
 			$scope.currImage--;
 		}
 		else if(i == $scope.imOrder[2])
 		{
 			$scope.currImage++;
 		}
 	}

 	$scope.movePanels = function(i)
 	{
 		var width = $(window).width()
 		$scope.changeIm(i);
 		if(i == $scope.imOrder[0])
 		{
 			if($scope.currImage != 0)
 			{
		 		//left panel
		 		d3.select("#panel" + $scope.imOrder[0]).transition().style("left", .48*width + "px").duration(2000)
		 		//middle panel
		 		d3.select("#panel" + $scope.imOrder[1]).transition().style("left", 1.05*width + "px").duration(2000)
		 		//right panel
		 		d3.select("#panel" + $scope.imOrder[2]).transition().style("left", 1.20*width + "px").duration(1200)
		 		d3.select("#panel" + $scope.imOrder[2]).transition().delay(800).style("left", -.15*width + "px").duration(0)
		 		d3.select("#panel" + $scope.imOrder[2]).transition().delay(800).style("left", -.05*width + "px").duration(1000)
		 	
			 	var newOrder = [$scope.imOrder[2], $scope.imOrder[0], $scope.imOrder[1]]
			 	$scope.imOrder = newOrder
			 }
		 }
		 else if(i == $scope.imOrder[2])
		 {
		 	if($scope.currImage != $scope.im.length-1)
		 	{
			 	//right panel
			 	d3.select("#panel" + $scope.imOrder[2]).transition().style("left", .48*width + "px").duration(2000)
			 	//middle panel
			 	d3.select("#panel" + $scope.imOrder[1]).transition().style("left", -.05*width + "px").duration(2000)
			 	//left panel
		 		d3.select("#panel" + $scope.imOrder[0]).transition().style("left", -.2*width + "px").duration(1200)
		 		d3.select("#panel" + $scope.imOrder[0]).transition().delay(800).style("left", 1.2*width + "px").duration(0)
		 		d3.select("#panel" + $scope.imOrder[0]).transition().delay(800).style("left", 1.05*width + "px").duration(1000)

		 		var newOrder = [$scope.imOrder[1], $scope.imOrder[2], $scope.imOrder[0]]
			 	$scope.imOrder = newOrder
			 }
		 }
 	}

 	var init = function() 
 	{
 		$scope.listFiles();
 	}
 	init();
 });