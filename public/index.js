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
				$scope.currImage = $scope.im.length-3;
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
 				return null
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
 				return null
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
 		if(i == $scope.imOrder[0])
 		{
 			var width = $(window).width()
	 		//left panel
	 		d3.select("#panel" + $scope.imOrder[0]).transition().style("left", .5*width + "px").duration(2000)
	 		//middle panel
	 		d3.select("#panel" + $scope.imOrder[1]).transition().style("left", 1.05*width + "px").duration(2000)
	 		//right panel
	 		d3.select("#panel" + $scope.imOrder[2]).transition().style("left", 1.2*width + "px").duration(1000)
	 		d3.select("#panel" + $scope.imOrder[2]).style("left", -.30 * width + "px")
	 		d3.select("#panel" + $scope.imOrder[2]).transition().style("left", -.05*width + "px").duration(2000)
	 	}
	 	//TODO: Update imOrder 
 	}

 	var init = function() 
 	{
 		$scope.listFiles();
 		$scope.movePanels();
 	}
 	init();
 });