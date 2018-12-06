$(document).ready(initializeApp);


function initializeApp() {
    console.log('Initializing App...');
    var modal = $('.modalPageContainer');

    $(".close-modal").click((event)=>{
        console.log(event);
        if($(event.target).hasClass("close-modal"))
            modal.hide();
    })
}





