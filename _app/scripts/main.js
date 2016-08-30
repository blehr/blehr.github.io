// need to stop page from scrolling horizontally in chrome

$(function() {
    $('#body').scroll(function(ev) {
        $('#body').scrollLeft(0);
    });
});


