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

var lineRegex = /(([\w|\\]*)(->|::|GLOBAL)([\w|\\|\{|\}]*))(\[)(.*)(:)(\d*)(\])(:)((.*)( =>)(.*))?(.*)/;

function buildLine(line) {
    var newline = [], namespaceArray = [];
    newline.push('<span>');
    var matches = line.match(lineRegex);
    if (matches && matches.length) {
        if (matches[1] === 'GLOBAL' && matches[3] === 'GLOBAL') {
            newline.push('<span class="color_turquoise">GLOBAL</span>');
        } else {
            namespaceArray = matches[2].split('\\');
            namespaceArray = namespaceArray.map(function (namespace) {
                return '<span class="color_emerland">' + namespace + '</span>';
            });
            newline.push(namespaceArray.join('\\'));
            newline.push('<span>', matches[3], '</span>');
            namespaceArray = matches[4].split('\\');
            namespaceArray = namespaceArray.map(function (namespace) {
                return '<span class="color_peterriver">' + namespace + '</span>';
            });
            newline.push(namespaceArray.join('\\'));
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

function highlightSyntax() {
    SyntaxHighlighter.defaults['gutter'] = false;
    SyntaxHighlighter.defaults['toolbar'] = false;
    SyntaxHighlighter.all();
    SyntaxHighlighter.highlight();
}

var mysqlTerms = [
    'CREATE',
    'DROP',
    'SELECT',
    'UPDATE',
    'DELETE',
    'SHOW',
    'ALTER',
    'TRUNCATE'
];

function addSyntaxHighlightingToNode(node) {
    var line = node.attr('data-summary-text');
    var matches = line.match(lineRegex);
    if (matches && matches.length && matches[14]) {
        var matchedMysqlTerms = false;
        mysqlTerms.forEach(function (mysqlTerm) {
            if (1 === matches[14].indexOf(mysqlTerm)) {
                matchedMysqlTerms = true;
            }
        });
        if (matchedMysqlTerms === true) { // MYSQL
            node.find('dl').html('<div><pre class="brush: sql">' + vkbeautify.sql(matches[14].trim()) + '</pre></div>');
            highlightSyntax();
        } else if (1 === matches[14].indexOf('[') || 1 === matches[14].indexOf('{')) { // JSON
            node.find('dl').html('<div><pre class="brush: js">' + JSON.stringify(JSON.parse(matches[14].trim()), null, 4) + '</pre></div>');
            highlightSyntax();
        }
    }
}

