

$(document).ready(() => {
    // getVideos('venom trailer', 1);
});
const apiKey = "AIzaSyCRXTR0G_Slvgyjj_Vgfry6KLiw8pIMlHs";

getVideos = function (query, maxResult = 1) {
    const url = "https://www.googleapis.com/youtube/v3/search";
    const request = {
        url: url,
        type: 'GET',
        dataType: 'json',
        data: {
            key: apiKey,
            q: `${query} trailer`,
            part: 'snippet',
            maxResults: maxResult
        },
        error: err => console.log(err),
        success: result => {
            console.log(result);
            renderTrailorInModal(result.items[0].id.videoId)
            // if (result.items) {
            //     const items = result.items;
            //     for (var index = 0; index < items.length; ++index) {
            //         $("#videoList").append("<li><a href='#' url='" + items[index].id.videoId + "'>" + items[index].snippet.title + "</a></li>");
            //         $("#videoList li a").last().click(function() {
            //             debugger;
            //             let videoUrl = 'https://www.youtube.com/embed/' + $(this).attr('url');
            //             $("#player").attr('src', videoUrl);
            //         });
            //     }
            // }
        }
    };
    $.ajax(request);
};

function renderTrailorInModal(videoId) {
    $(".youtubeIframe").attr('src', `https://www.youtube.com/embed/${videoId}`)

}

/* function youtubeAPI(name){
    var youtubeAjaxObject = {
        "dataType": 'json',
        'url': 'https://www.googleapis.com/youtube/v3/search',
        'method':
         success: getData,
             error: err => console.log(err),
           'data': {
            'part': 'snippet',
            'maxResults': '1',
            'q':
            'type': 'video',
            'key': 'AIzaSyAz5xq35xTLX3I7l9jiA28_gfzQ05uB5ts'
    }
    };
    function getData (responseData){
        console.log ("Youtube Response Data: ", responseData)
        var video = null;
        if(responseData.items.length === 0){
            playExactVideo(video);
            video = resposeData.items[0]
            playExactVideo
        }

    }
}
*/