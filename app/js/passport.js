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

var lineRegex = /((\w*)(->|::|GLOBAL)(\w*))(\[)(.*)(:)(\d*)(\])(:)((.*)( =>)(.*))?(.*)/;

function buildLine(line) {
    var newline = [];
    newline.push('<span>');
    var matches = line.match(lineRegex);
    if (matches && matches.length) {
        if (matches[1] === 'GLOBAL' && matches[3] === 'GLOBAL') {
            newline.push('<span class="color_turquoise">GLOBAL</span>');
        } else {
            newline.push('<span class="color_emerland">', matches[2], '</span>');
            newline.push('<span>', matches[3], '</span>');
            newline.push('<span class="color_peterriver">', matches[4], '</span>');
        }
        newline.push('<span>', matches[5], '</span>');
        newline.push('<span class="color_orange">', matches[6], '</span>');
        newline.push('<span>', matches[7], '</span>');
        newline.push('<span class="color_wetasphalt">', matches[8], '</span>');
        newline.push('<span>', matches[9], '</span>');
        if (!matches[11]) {
            newline.push('<span class="color_pomegranate">', matches[10], '</span>');
            newline.push('<span class="color_midnightblue">', matches[15], '</span>');
        } else {
            newline.push('<span>', matches[10], '</span>');
            newline.push('<span class="color_amethyst">', matches[12], '</span>');
            newline.push('<span>', matches[13], '</span>');
            newline.push('<span class="color_greensea">', matches[14], '</span>');
        }
    } else {
        newline.push(line);
    }
    newline.push('</span>');
    return newline.join('');
}

