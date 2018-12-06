$(document).ready(init);

function init(){
    console.log('Init...');
}

// function getMoviePosterImages(response){
function getMoviePosterImage(movie) {

    // var resultArray = response['results'];
    // var posterImages = [];

    // for(var indexResult =0; indexResult< resultArray.length; indexResult++){
    //     var title = resultArray[indexResult].title;
    //     var movieId = resultArray[indexResult].id;
    //     var ratings = resultArray[indexResult].vote_average;
    //     var description = resultArray[indexResult].overview;
    //     var poster = resultArray[indexResult].poster_path;

        var title = movie.title;
        var movieId = movie.id;
        var ratings = movie.vote_average;
        var description = movie.overview;
        var poster = movie.poster_path;

        var image = $("<div>",{
            class: 'poster',
            css:{
                backgroundImage: `url(https://image.tmdb.org/t/p/w185_and_h278_bestv2${poster})`
            },
            'data-movieInfo': {
                title,
                movieId,
                ratings,
                description,
                poster
            },
            click: handleModalShow
        });
        // posterImages.push(image);
    // }
    // $(".testDiv").append(posterImages);
    $(".testDiv").append(image);

    function handleModalShow(){
        console.log('handleModalShow...');
        console.log('rating:', ratings);

        var movieInfo = {
            title,
            movieId,
            ratings,
            description,
            poster
        };
        $(".modalPageContainer").css('display', 'block');
    }
}

var ajaxOptionsGetPoster = {
    url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=fb2158f8324ad535f0c817ef2fb98040',
    dataType: 'json',
    success: renderAllMoviePosters
};

function renderAllMoviePosters(response) {
    var resultsArray = response['results'];

    for (var indexResult = 0; indexResult < resultsArray.length; indexResult++) {
        var movie = resultsArray[indexResult];
        getMoviePosterImage(movie);
    }
}

$.ajax(ajaxOptionsGetPoster);



