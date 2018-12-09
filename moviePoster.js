$(document).ready(init);

function init() {
    console.log('init called')
    let moviePosterService = new MoviePosterService;
    moviePosterService.getMoviePosters();
}

class MoviePosterService {
    constructor() {
        this.buildMoviePoster = this.buildMoviePoster.bind(this);
        this.getMoviePosters = this.getMoviePosters.bind(this);
        this.renderAllMoviePosters = this.renderAllMoviePosters.bind(this);
        this.fillMovieInformation = this.fillMovieInformation.bind(this);
        this.getActorInformation = this.getActorInformation.bind(this);
        // this.renderAllMoviePosters = this.renderAllMoviePosters.bind(this);
    }

    getMoviePosters() {
        console.log('get movie posters')
        var ajaxOptionsGetPoster = {
            url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=fb2158f8324ad535f0c817ef2fb98040',
            dataType: 'json',
            success: (response) => {
                console.log('test', response);
                this.renderAllMoviePosters(response);
            },
            error: function () {
                console.log('errror')
            }
        };



        $.ajax(ajaxOptionsGetPoster);
    }

    renderAllMoviePosters(response) {
        
        console.log('test');
        var resultsArray = response['results'];
        console.log('resultsArray', resultsArray);

        for (var indexResult = 0; indexResult < resultsArray.length; indexResult++) {
            var movie = resultsArray[indexResult];
            this.buildMoviePoster(movie);
        }
    }

    fillMovieInformation (title, description) {
        console.log('title', title);
        console.log('description', description);
        $('.movieTitle').text(title);
        console.log($('.movieTitle').text());
        $('.movieDescription').text(description);
        console.log($('.movieDescription').text());
    
    
    }

    buildMoviePoster(movie) {
        var title = movie.title;
        var movieId = movie.id;
        var ratings = movie.vote_average;
        var description = movie.overview;
        var poster = movie.poster_path;
        // var this = this;
        

        handleModalShow = handleModalShow.bind(this);

        var image = $("<div>", {
            class: 'poster',
            css: {
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

        $(".posterContainer").append(image);

        function handleModalShow() {
            
            console.log('handleModalShow...');
            

            var movieInfo = {
                title,
                movieId,
                ratings,
                description,
                poster
            };

            this.fillMovieInformation(title, description);
            this.getActorInformation (movieId);
            getVideos (title);
            $(".modalPageContainer").css('display', 'block');
            
        }
        
    }

   
    getActorInformation(movieId) {
        // console.log('getactor', movieArray);
        // var movieId = movieArray[0].id;
        console.log('pictures', movieId);
        $('.loading').css('display', 'inline-block');
        var settings = {
            url: `http://api.themoviedb.org/3/movie/${movieId}/credits?api_key=fb2158f8324ad535f0c817ef2fb98040`,
            dataType: 'json',
            method: 'get',
            success: (response) => {
                console.log('getActorSuccess', response);
                this.getActorPictures(response.cast);
    
            },
            error: (response) => {
                console.log('error');
            }
        }
    
        $.ajax(settings);
    
    
    
    }
    getActorPictures(movieCastArray) {
        // console.log('movieArray', movieArray);
        console.log('movieCastArray', movieCastArray);
        for (var i = 0; i < 5; i++) {
            var castMember = movieCastArray[i].id;
            
            var castMemberContainer = $('<div>', {
                class: "castMemberContainer",
            });
    
    
    
            var settings = {
                url: `http://api.themoviedb.org/3/person/${castMember}/images?api_key=fb2158f8324ad535f0c817ef2fb98040`,
                dataType: 'json',
                method: 'get',
                async: false,
                success: function (response) {
                    console.log('actorImages', response);
                    var castMemberName = movieCastArray[i].name;

                    var castMemberName = $('<div>', {
                        class: "castMemberNameContainer",
                        text: `${castMemberName}`
                    });

                    

                    var image = $('<img>', {
                        class: 'actorImage',
                        src: `https://image.tmdb.org/t/p/w440_and_h660_bestv2/${response.profiles[0].file_path}`
                    });
    
                    // $('.modalFooter').append(image);
                    castMemberContainer.append(image);
                    castMemberContainer.append(castMemberName);
    
                },
                error: function (response) {
                    console.log('error');
                }
            }
    
            $.ajax(settings);
    
    
            $('.modalFooter').append(castMemberContainer);
        }
}
}

// var ajaxOptionsGetPoster = {
//     url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=fb2158f8324ad535f0c817ef2fb98040',
//     dataType: 'json',
//     success: renderAllMoviePosters
// };

// function renderAllMoviePosters(response) {
//     var resultsArray = response['results'];

//     for (var indexResult = 0; indexResult < resultsArray.length; indexResult++) {
//         var movie = resultsArray[indexResult];
//         getMoviePosterImage(movie);
//     }
// }

// $.ajax(ajaxOptionsGetPoster);

// // function getDataFromServer() {
// //     console.log('hi');
// //     var settings = {
// //         url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=fb2158f8324ad535f0c817ef2fb98040',
// //         dataType: 'json',
// //         method: 'get',
// //         success: function(response) {
// //             console.log(response);
// //             responseData = response.results;
// //             // fillMovieInformation(responseData);
// //             // getActorInformation(responseData);
// //         }

// //     }

// //     $.ajax(settings);
// // }

// function fillMovieInformation(title, description) {
//     console.log('title', title);
//     console.log('description', description);
//     $('.movieTitle').text(title);
//     console.log($('.movieTitle').text());
//     $('.movieDescription').text(description);
//     console.log($('.movieDescription').text());


// }

// function getActorInformation(movieId) {
//     // console.log('getactor', movieArray);
//     // var movieId = movieArray[0].id;
//     console.log('pictures', movieId);

//     var settings = {
//         url: `http://api.themoviedb.org/3/movie/${movieId}/credits?api_key=fb2158f8324ad535f0c817ef2fb98040`,
//         dataType: 'json',
//         method: 'get',
//         success: function (response) {
//             console.log('getActorSuccess', response);
//             getActorPictures(response.cast);

//         },
//         error: function (response) {
//             console.log('error');
//         }
//     }

//     $.ajax(settings);



// }

// function getActorPictures(movieCastArray) {
//     // console.log('movieArray', movieArray);
//     console.log('movieCastArray', movieCastArray);
//     for (var i = 0; i < 5; i++) {
//         var castMember = movieCastArray[i].id;

//         // var castMemberContainer = $('<div>', {
//         //     class: "castMemberContainer",
//         // });



//         var settings = {
//             url: `http://api.themoviedb.org/3/person/${castMember}/images?api_key=fb2158f8324ad535f0c817ef2fb98040`,
//             dataType: 'json',
//             method: 'get',
//             success: function (response) {
//                 console.log('actorImages', response);
//                 var image = $('<img>', {
//                     class: 'actorImage',
//                     height: '80%',
//                     width: '15%',
//                     src: `https://image.tmdb.org/t/p/w440_and_h660_bestv2/${response.profiles[0].file_path}`
//                 });

//                 $('.modalFooter').append(image);
//                 // castMemberContainer.append(image);

//             },
//             error: function (response) {
//                 console.log('error');
//             }
//         }

//         $.ajax(settings);


//         // $('.modalFooter').append(castMemberContainer);
//     }




// }



