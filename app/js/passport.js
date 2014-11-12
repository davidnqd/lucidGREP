function clearResults() {
    $("#results").empty();
}

function toggleWrap() {
    window.nowrap = !window.nowrap;
    $(".results summary").toggleClass('nowrap');
}

