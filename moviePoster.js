$(document).ready(initializeApp);

function initializeApp(){
    console.log('Initializing App...');
}

function getMoviePosterImages(response){
    var resultResponse = response['results'];
    console.log('resultResponse :', resultResponse);

    var images = [];
    for(var i =0; i< resultResponse.length; i++){
        var image = $("<div>",{
            class: 'poster',
            css:{
                backgroundImage: `url(https://image.tmdb.org/t/p/w185_and_h278_bestv2${resultResponse[i].poster_path})`
            }
        })
        images.push(image);
    }
    // $(".testDiv").append(images);
}

var ajaxOptionsGetPoster = {
    url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=fb2158f8324ad535f0c817ef2fb98040',
    dataType: 'json',
    success: getMoviePosterImages
};

$.ajax(ajaxOptionsGetPoster);

