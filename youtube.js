function youtubeAPI(name){
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