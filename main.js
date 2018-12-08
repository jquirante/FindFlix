$(document).ready(initializeApp);

var responseData;

function initializeApp() {
    console.log('Initializing App...');
    // getDataFromServer();
    $(".youtubeIframe").attr('src','');
    $(".modalFooter").empty();
    

    var modal = $('.modalPageContainer');
    
    $(".close-modal").click((event)=>{
        console.log(event);
        if($(event.target).hasClass("close-modal")) {
            $(".youtubeIframe").attr('src','');
            $(".modalFooter").empty();
            modal.hide();
        }
            
    })
}

// function getDataFromServer() {
//     console.log('hi');
//     var settings = {
//         url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=fb2158f8324ad535f0c817ef2fb98040',
//         dataType: 'json',
//         method: 'get',
//         success: function(response) {
//             console.log(response);
//             responseData = response.results;
//             fillMovieInformation(responseData);
//             getActorInformation(responseData);
//         }

//     }

//     $.ajax(settings);
// }

// function fillMovieInformation(movieArray) {

//     $('.movieTitle').text(movieArray[0].title);
//     console.log($('.movieTitle').text());
//     $('.movieDescription').text(movieArray[0].overview);
//     console.log($('.movieDescription').text());


// }

// function getActorInformation(movieArray) {
//     console.log('getactor', movieArray);
//     var movieId = movieArray[0].id;
//     console.log(movieId);

//     var settings = {
//         url: `http://api.themoviedb.org/3/movie/${movieId}/credits?api_key=fb2158f8324ad535f0c817ef2fb98040`,
//         dataType: 'json',
//         method: 'get',
//         success: function(response) {
//             console.log('getActorSuccess', response);
//             getActorPictures(response.cast);
            
//         },
//         error: function(response){
//             console.log('error');
//         }
//     }

//     $.ajax(settings);

    

// }

// function getActorPictures(movieArray) {
//     console.log('movieArray', movieArray);
//     var actorId = movieArray[0].id;

//     var settings = {
//         url: `http://api.themoviedb.org/3/person/${actorId}/images?api_key=fb2158f8324ad535f0c817ef2fb98040`,
//         dataType: 'json',
//         method: 'get',
//         success: function(response) {
//             console.log('actorImages', response);

//             var image = $('<img>', {
//                 class: 'actorImage',
//                 height: '80%',
//                 width: '15%',
//                 src: `https://image.tmdb.org/t/p/w440_and_h660_bestv2/${response.profiles[0].file_path}`
//             });
            
//             var image2 = $('<img>', {
//                 class: 'actorImage',
//                 height: '80%',
//                 width: '15%',
//                 src: `https://image.tmdb.org/t/p/w440_and_h660_bestv2/${response.profiles[0].file_path}`
//             });

//             var image3 = $('<img>', {
//                 class: 'actorImage',
//                 height: '80%',
//                 width: '15%',
//                 src: `https://image.tmdb.org/t/p/w440_and_h660_bestv2/${response.profiles[0].file_path}`
//             });

//             var image4 = $('<img>', {
//                 class: 'actorImage',
//                 height: '80%',
//                 width: '15%',
//                 src: `https://image.tmdb.org/t/p/w440_and_h660_bestv2/${response.profiles[0].file_path}`
//             });

//             var image5 = $('<img>', {
//                 class: 'actorImage',
//                 height: '80%',
//                 width: '15%',
//                 src: `https://image.tmdb.org/t/p/w440_and_h660_bestv2/${response.profiles[0].file_path}`
//             });

//             $('.modalFooter').append(image, image2, image3, image4, image5);
           
            
//         },
//         error: function(response){
//             console.log('error');
//         }
//     }

//     $.ajax(settings);

// }
