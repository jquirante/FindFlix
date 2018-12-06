$(document).ready(initializeApp);

var responseData;

function initializeApp() {
    console.log('Initializing App...');
    getDataFromServer();

    var modal = $('.modalPageContainer');

    modal.click(function (event) {
        modal.hide();
    });
}

function getDataFromServer() {
    console.log('hi');
    var settings = {
        url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=fb2158f8324ad535f0c817ef2fb98040',
        dataType: 'json',
        method: 'get',
        success: function(response) {
            console.log(response);
            responseData = response.results;
            fillMovieInformation(responseData);
        }

    }

    $.ajax(settings);
}

function fillMovieInformation(movieArray) {

    $('.movieTitle').text(movieArray[0].title);
    console.log($('.movieTitle').text());
    // $('.movieDescription').text(movieArray[0].poster_path);

    $('.movieDescription')
    // console.log($('.movieDescription').text());

    var image = $('<img>', {
        class: 'image',
        src: movieArray[0].poster_path,
    });
}





