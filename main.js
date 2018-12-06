$(document).ready(initializeApp);

function initializeApp(){
    console.log('Initializing App...');
    getDataFromServer();
}

function getDataFromServer() {
    console.log('hi');
    var settings = {
        url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=fb2158f8324ad535f0c817ef2fb98040',
        dataType: 'json',
        method: 'get',
        success: function(response) {
            console.log(response);
        }

    }

    $.ajax(settings);
}