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
        // this.renderAllMoviePosters = this.renderAllMoviePosters.bind(this);
    }

    getMoviePosters () {
        console.log('get movie posters')
        var ajaxOptionsGetPoster = {
            url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=fb2158f8324ad535f0c817ef2fb98040',
            dataType: 'json',
            success: (response) => {
                console.log('test', response);
                this.renderAllMoviePosters(response);
            },
            error: function() {
                console.log('errror')
            }
        };



        $.ajax(ajaxOptionsGetPoster);
    }

    renderAllMoviePosters(response) {
        debugger;
        console.log('test');
        var resultsArray = response['results'];
        console.log('resultsArray', resultsArray);

        for (var indexResult = 0; indexResult < resultsArray.length; indexResult++) {
            debugger;
            var movie = resultsArray[indexResult];
            this.buildMoviePoster(movie);
        }
    }

    buildMoviePoster(movie) {
        debugger;
        var title = movie.title;
        var movieId = movie.id;
        var ratings = movie.vote_average;
        var description = movie.overview;
        var poster = movie.poster_path;

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
        $(".testDiv").append(image);

        function handleModalShow() {
            debugger;
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
}

