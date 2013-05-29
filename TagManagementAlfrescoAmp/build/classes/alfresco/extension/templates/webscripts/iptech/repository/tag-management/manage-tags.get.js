function main()
{
   var argsSelectableType = args['selectableType'],
      argsSearchTerm = args['searchTerm'],
      results = [],
      categoryResults =  null;
   
   if (logger.isLoggingEnabled())
   {
      logger.log("argsSelectableType = " + argsSelectableType);
      logger.log("argsSearchTerm = " + argsSearchTerm);
      logger.log("argsXPath = " + argsXPath);
   }
         
   try
   {
	  var nodeRef = "alfresco://category/root";
      var catAspect = (args["aspect"] != null) ? args["aspect"] : "cm:generalclassifiable";

      // TODO: Better way of finding this
      var rootCategories = classification.getRootCategories(catAspect);
      if (rootCategories != null && rootCategories.length > 0)
      {
    	  categoryResults = classification.getRootCategories(catAspect);
    	  
    	  if (argsSearchTerm != null)
    	  {
    		  var filteredResults = [];
    		  for each (result in categoryResults)
    		  {
    			  if (result.properties.name.indexOf(argsSearchTerm) > -1)
    			  {
    				  filteredResults.push(result);
    			  }
    		  }
    		  categoryResults = filteredResults.slice(0);
    	  }
    	  categoryResults.sort(sortByName);
	
    	  // make each result an object and indicate it is selectable in the UI
    	  for each (var result in categoryResults)
    	  {
    		  results.push(
	    		   { 
	    			   item: result, 
	    			   selectable: true 
	    		   });
    	  }
      }
      
      if (logger.isLoggingEnabled())
      logger.log("Found " + results.length + " results");
   }
   catch (e)
   {
      var msg = e.message;
      
      if (logger.isLoggingEnabled())
         logger.log(msg);
      
      status.setCode(500, msg);
      
      return;
   }
   
   model.results = results;
}

/* Sort the results by case-insensitive name */
function sortByName(a, b)
{
   return (b.properties.name.toLowerCase() > a.properties.name.toLowerCase() ? -1 : 1);
}

main();