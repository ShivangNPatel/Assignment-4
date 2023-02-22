/*
    Assignment #4
    Shivang Patel
*/
$(function () {

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(function(position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let locDiv = $("#locationhere");
            locDiv.text("Your present location is: " + lat.toFixed(6) + "°N, " + lon.toFixed(6) + "°E");

            if (localStorage.getItem("location") !== null) {
                let storedLocation = localStorage.getItem("location");
                let storedLocationTag = $("<p>").text("Your previous location was: " + storedLocation);
                let contentSec = $("#content");
                contentSec.append(storedLocationTag);
                let wlcmMsg = $("<h2>").text("Welcome back!");
                contentSec.prepend(wlcmMsg);
                let dist = calcdistBetweenPoints(lat, lon, storedLocation.split(",")[0], storedLocation.split(",")[1]);
                let distKm = (dist / 1000).toFixed(2);
                let distMsg = $("<p>").text("Since your last visit, you have travelled " + distKm + " kilometres.");
                contentSec.append(distMsg);

            } else {
                let wlcmMsg = $("<h2>").text("Welcome!");
                let contentSec = $("#content");
                contentSec.prepend(wlcmMsg);
            }
            localStorage.setItem("location", lat + "," + lon);
        }, function(error) {

            if (error.code === error.PERMISSION_DENIED) {
                let locDiv = $("#locationhere");
                locDiv.text("You must allow geolocation to use this application.");
            }
        });

    } else {
        let locDiv = $("#locationhere");
        locDiv.text("Geolocation is not supported by your browser.");
    }


    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
    // function to calculate the dist in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool letiable names? Yah gotta love JavaScript
    function calcdistBetweenPoints(lat1, lon1, lat2, lon2) {
        let toRadians = function (num) {
            return num * Math.PI / 180;
        }
        let R = 6371000; // radius of Earth in metres
        let φ1 = toRadians(lat1);
        let φ2 = toRadians(lat2);
        let Δφ = toRadians(lat2 - lat1);
        let Δλ = toRadians(lon2 - lon1);

        let a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});


