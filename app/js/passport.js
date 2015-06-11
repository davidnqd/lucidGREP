function clearResults() {
    $("#results").empty();
}

function toggleWrap() {
    window.nowrap = !window.nowrap;
    $(".results summary").toggleClass('nowrap');
    $wrapTab = $('#tabs ul li:eq(1) a');
    if (window.nowrap === true) {
        $wrapTab.text('Wrap');
    } else {
        $wrapTab.text('Un-Wrap');
    }
}

function closeAllTabs() {
    $("#tabs > div").hide();
}

function pauseButtonClickHandler() {
    $span = $('#pauseBtn').find('.ui-button-text');
    if (-1 < $span.text().indexOf('Pause')) {
        $span.html('&#9654; Resume');
    } else {
        $span.html('&#10074;&#10074; Pause');
    }
}

