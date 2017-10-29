/* PSUEDO CODE */


// array of strings with topics =
// artists or art themes




// a loop that appends a button generated buttons from topics ^
$(document).ready(function () {

    $(document).keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
        }
    });


    var thingsList = ["okay", "scared", "rihanna", "kandi"];
    for (i = 0; i < thingsList.length; i++) {
        var button = $("<button type='button' class='btn btn-primary' style='margin:3px'>");
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
            })
            .done(function (response) {

                // $("#gifs-appear-here").empty();
                for (var i = 0; i < 25; i++) {
                    var results = response.data[i];

                    var gifDiv = $("<div class='item'>");

                    var rating = results.rating;
                    var p = $("<p>").text("Rating: " + rating);

                    var stillGif = results.images.fixed_width_still.url;

                    var gif = $("<img id='thumbnail'>");
                    gif.attr("src", stillGif);
                    gif.attr("data-state", "still");
                    gif.attr("animated", results.images.fixed_width.url.toString());
                    gif.attr("still", stillGif);

                    gifDiv.append(p);
                    gifDiv.append(gif);

                    $("#gifs-appear-here").prepend(gifDiv);

                }
                $("#gif-text").html("<h3> You chose... <strong>" + searchGif + "</strong></h3>");
            });
    });


    // add form to page that takes valye from a user input box and adds it into your topics array....
    $(".submit").on("click", function () {

        var button = $("<button type='button' class='btn btn-primary' style='margin:3px;'></button>");
        var searchTerm = $("#newButton").val();
        button.html(searchTerm);
        button.attr("value", searchTerm.toString());
        $("#buttons-go-here").append(button);

    });

    $("#makeAButton").submit(function (e) {
        loadAjax();
        e.returnValue = false;
    });

    $("#gifs-appear-here").on("click", "#thumbnail", function () {
        var state = $(this).attr("data-state");
        if (state == "still") {
            $(this).attr("data-state", "animated");
            $(this).attr("src", $(this).attr("animated"));
        } else if (state == "animated") {
            $(this).attr("data-state", "still");
            $(this).attr("src", $(this).attr("still"));
        }
    });



    // end document.ready

});