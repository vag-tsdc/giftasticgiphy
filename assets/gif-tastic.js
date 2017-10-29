/* PSUEDO CODE */


// array of strings with topics =
// artists or art themes




// a loop that appends a button generated buttons from topics ^
$(document).ready(function () {


    var thingsList = ["okay", "scared", "rihanna", "kandi"];
    for (i = 0; i < thingsList.length; i++) {
        var button = $("<button type='button' class='btn btn-primary'>");
        var newButton = button.attr("value", thingsList[i]);
        newButton.html(thingsList[i]);
        $("#buttons-go-here").append(newButton);
    };

    console.log(thingsList);
    // buttonContainer = document.getElementById("buttons-go-here");
    // function createButtons() {


    $("#buttons-go-here").on("click", ".btn", function () {
        var searchGif = $(this).val();
        console.log(searchGif);
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        searchGif + "&api_key=67sPBFexKhzWChD2zLrs9HJI1ciqE6ta";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

        // $("#gifs-appear-here").empty();

            console.log(response);

            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);

                var stillGif = results[i].images.fixed_width_still.url;

                var gif = $("<img>");
                gif.attr("src", stillGif);
                gif.attr("data-state", "still");
                gif.attr("animated", results[i].images.fixed_width.url.toString());
                gif.attr("still", stillGif);

                gifDiv.append(p);
                gifDiv.append(gif);

                $("#gifs-appear-here").prepend(gifDiv);
            }
        });
    });


    // add form to page that takes valye from a user input box and adds it into your topics array....
    $("#send-it").on("click", function (event) {
        event.preventDefault();
        var inputButton = $("#new-button-input").val().trim();

        console.log(inputButton);

        thingsList.push(inputButton);

        console.log(thingsList);
    });
    // a function call that takes each topic and remakes the button on the page.

    // $("button").on("click", function () {

    // });






    // user clicks button:
    // function = 
    // grab 10 STATIC, non-animated gif images from GIPHY and place them on the page

    // user clicks gif image - 
    // animate image
    // user clicks animated gif  - gif stops moving

    // every gif - 
    // display rating



    // end document.ready

});