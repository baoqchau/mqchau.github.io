function parseDatabase(request, budget)
{
  var json_file = RestaurantDatabase;
  var restaurantList = [];
  var itemList = [];
  var resultItemList = [];
  var result = [];

  var maxIndex = -1;
  var maxItemList = [];
  var max = 0;

  var sum = 0;
  var sumCalories = 0;
  var sumFat = 0;
  var sumProtein = 0;
  var sumCarbs = 0;
  var sumSodium = 0;
  
  for(var restaurant in json_file)
  {
    restaurantList.push(restaurant);
    
    criteria = [];
    prices = [];
    itemList = [];
    sum = 0;
        
    for(var item in json_file[restaurant])
    {
      itemList.push(item);
      criteria.push(json_file[restaurant][item][request]);

      prices.push(json_file[restaurant][item]["price"]);
    }
    
    budget = Math.floor(budget*100);
    for(var i = 0; i<prices.length;i++)
      prices[i] = Math.floor(prices[i]*100);

    result[restaurant]= knapsack(criteria, prices, budget);
    
    for(var index in result[restaurant])
    {
      sum += prices[index];
      resultItemList.push(itemList[index]);
      
      sumCalories += json_file[restaurant][itemList[index]]["calories"];
      sumFat += json_file[restaurant][itemList[index]]["fat"];
      sumProtein += json_file[restaurant][itemList[index]]["protein"];
      sumCarbs += json_file[restaurant][itemList[index]]["protein"];
      sumSodium += json_file[restaurant][itemList[index]]["sodium"];
    }
	
	if(sum > max)
	{
      sum = max;
      maxIndex = restaurant;
      maxItemList = resultItemList;      
    }	
  }
  
  for(var index in result[maxIndex])
  {
    sumCalories += restaurant[itemList[index]]["calories"];
    sumFat += restaurant[itemList[index]]["fat"];
    sumProtein += restaurant[itemList[index]]["protein"];
    sumCarbs += restaurant[itemList[index]]["protein"];
    sumSodium += restaurant[itemList[index]]["sodium"];
  }

  
  
  sessionStorage.setItem("sumCalories", sumCalories);
  sessionStorage.setItem("sumFat", sumFat);
  sessionStorage.setItem("sumProtein", sumProtein);
  sessionStorage.setItem("sumCarbs", sumCarbs);
  sessionStorage.setItem("sumSodium", sumSodium);
	
  sessionStorage.setItem("sumPrice", max);
  sessionStorage.setItem("resultItemList", maxItemList);
  sessionStorage.setItem("bestRestaurant", restaurantList[maxIndex]);		//just for testing purpose. MUST CHANGE
}
  







