$(function() {

  // get random date between june 16 1996 and today, format for the url
  var randomDate = function(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  var formattedDate = randomDate(new Date(1996, 6, 16), new Date()).toISOString().substring(0, 10)

  var urlString = window.location.href
  var nasaUrl = "https://api.nasa.gov/planetary/apod?concept_tags=False&api_key=ZeHs1xlBAtEBIAhcvT2aN6puHvknYEh9rcquGhLE&date="
  
  // if the current url has no image src parameters, append a generated parameter to the url and redirect to it
  var getNewUrl = function() {
    $.getJSON( nasaUrl + formattedDate , function( data ) {
     
      var urlParam = "?src=" + data.url
      var newUrl = urlString + urlParam

      window.location.href = newUrl;

    });
  }

  // get a new image, clear url of old parameters, add new parameters to url and redirect to it
  var getEvenNewerUrl = function() {
    $.getJSON( nasaUrl +formattedDate , function( data ) {
     
      var urlParam = "?src=" + data.url
      var clearedUrl = urlString.substring( 0, urlString.indexOf( "?src" ))
      var newUrl = clearedUrl + urlParam

      window.location.href = newUrl;

    });
  }
  
  if (urlString.indexOf("?src") == -1) { getNewUrl(); }

  $('#more').on('click', function() { getEvenNewerUrl() });

});