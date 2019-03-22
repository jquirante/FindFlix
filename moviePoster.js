$(document).ready(init);

function init() {
    let moviePosterService = new MoviePosterService;
    moviePosterService.getMoviePosters();
    //if(?) moviePosterService.getQueriedMovie();
}

class MoviePosterService {
    constructor() {
        this.buildMoviePoster = this.buildMoviePoster.bind(this);
        this.getMoviePosters = this.getMoviePosters.bind(this);
        this.renderAllMoviePosters = this.renderAllMoviePosters.bind(this);
        this.fillMovieInformation = this.fillMovieInformation.bind(this);
        this.getActorInformation = this.getActorInformation.bind(this);
        this.getQueriedMovie = this.getQueriedMovie.bind(this);
        // this.renderAllMoviePosters = this.renderAllMoviePosters.bind(this);
    }

    getMoviePosters() {
        var ajaxOptionsGetPoster = {
            url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=fb2158f8324ad535f0c817ef2fb98040',
            dataType: 'json',
            success: (response) => {
                this.renderAllMoviePosters(response);
            },
            error: function () {
                console.log('error');
            }
        };
        $.ajax(ajaxOptionsGetPoster);
    }
    renderAllMoviePosters(response) {
        var resultsArray = response['results'];
        for (var indexResult = 0; indexResult < resultsArray.length; indexResult++) {
            var movie = resultsArray[indexResult];
            this.buildMoviePoster(movie);
        }
    }
    getQueriedMovie(movieId){
        var ajaxOptionsGetQueriedMovie = {
            url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=fb2158f8324ad535f0c817ef2fb98040`,
            dataType: 'json',
            success: (response) => {
                //showmodal
                var title = response.title;
                var movieId = response.id;
                var description = response.overview;
                handleModalShow();
            },
            error: function () {
                console.log('error');
            }
        };
        $.ajax(ajaxOptionsGetQueriedMovie);
    }
    
    

    buildMoviePoster(movie) {
        var title = movie.title;
        var movieId = movie.id;
        var ratings = movie.vote_average;
        var description = movie.overview;
        var poster = movie.poster_path;
        // var this = this;

        handleModalShow = handleModalShow.bind(this);

        var posterContainer =  $("<div>",{
            'class': 'posterContainer'
        });

        // var boxTitle = $("<div>",{
        //     'class': 'boxTitle',
        //     'text': title
        // });

        var image = $("<img>", {
            class: 'poster',
            src: `https://image.tmdb.org/t/p/w185_and_h278_bestv2${poster}`,
            'data-movieInfo': {
                title,
                movieId,
                ratings,
                description,
                poster
            },
            click: handleModalShow
        });

        // var details = $("<div>",{
        //     'class': 'details',
        //     'text': 'Rating: '+ratings
        // });

        // posterContainer.append(boxTitle, image, details);
        posterContainer.append(image);
        $('.movieInfoContainer').append(posterContainer);

        function handleModalShow() {
            // updateUrl(movieId);
            // var movieInfo = {
            //     title,
            //     movieId,
            //     ratings,
            //     description,
            //     poster
            // };

            this.fillMovieInformation(title, description,movieId);
            $('body').css('overflow', 'hidden');
            $('.loading').css('display', 'inline-block');

            this.getActorInformation (movieId);
            getVideos (title);

            
            $(".modalPageContainer").css('display', 'block');

        }
    }
    fillMovieInformation (title, description, movieId) {
        console.log('title', title);
        console.log('description', description);

        var movieTitleContainer = $('<div>', {
            class: 'movieTitle',
            text: title,
            'data-movieId': {
                movieId,
            }
        });

        $('.movieContent').prepend(movieTitleContainer);

        console.log($('.movieTitle').text());
        $('.movieDescription').text(description);
        console.log($('.movieDescription').text());
    
    
    }
   
    getActorInformation(movieId) {
        // console.log('getactor', movieArray);
        // var movieId = movieArray[0].id;
        
        var settings = {
            url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=fb2158f8324ad535f0c817ef2fb98040`,
            dataType: 'json',
            method: 'get',
            success: (response) => {
                console.log('getActorSuccess', response);
                this.getActorPictures(response.cast);
    
            },
            error: (response) => {
                console.log('error');
            }
        };
        $.ajax(settings);
    }
    getActorPictures(movieCastArray) {
        console.log('movieCastArray', movieCastArray);
        for (var i = 0; i < 5; i++) {
            var castMember = movieCastArray[i].id;
            
            var castMemberContainer = $('<div>', {
                class: "castMemberContainer",
            });
    
            var settings = {
                url: `https://api.themoviedb.org/3/person/${castMember}/images?api_key=fb2158f8324ad535f0c817ef2fb98040`,
                dataType: 'json',
                method: 'get',
                async: false,
                success: function (response) {
                    
                    console.log('actorImages', response);
                    var castMemberName = movieCastArray[i].name;

                    var castMemberNameHolder= $('<div>', {
                        class: "castMemberNameContainer",
                        
                    });

                    var castMemberNameSpan = $('<span>', {
                        class: "castMemberNameSpan",
                        text: `${castMemberName}`,
                        title: `${castMemberName}`
                    });

                    var image = $('<img>', {
                        class: 'actorImage',
                        src: `https://image.tmdb.org/t/p/w440_and_h660_bestv2/${response.profiles[0].file_path}`,
                        title: `${castMemberName}`
                    });
    
                    // $('.modalFooter').append(image);
                    castMemberContainer.append(image);
                    castMemberNameHolder.append(castMemberNameSpan);
                    castMemberContainer.append(castMemberNameHolder);
    
                },
                error: function (response) {
                    console.log('error');
                }
            };
            $.ajax(settings);
            $('.modalFooter').append(castMemberContainer);
        }
    }
}

