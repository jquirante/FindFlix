$(document).ready(init);

function init(){
    console.log('Init...');
}

function getMoviePosterImages(response){
    // console.log('response:', response);

    var results = response['results'];

    var posterImages = [];

    for(var indexResult =0; indexResult< results.length; indexResult++){
        var image = $("<div>",{
            class: 'poster',
            css:{
                backgroundImage: `url(https://image.tmdb.org/t/p/w185_and_h278_bestv2${results[indexResult].poster_path})`
            }
        })
        posterImages.push(image);
    }
    $(".testDiv").append(posterImages);
}

var ajaxOptionsGetPoster = {
    url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=fb2158f8324ad535f0c817ef2fb98040',
    dataType: 'json',
    success: getMoviePosterImages
};

$.ajax(ajaxOptionsGetPoster);


