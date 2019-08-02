function _wr(type) {
    var origin = history[type];
    return function() {
        var rv = origin.apply(this, arguments);
        var e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
    }
}

function custom() {
    const links = Array.from($('.gitbook-link'))
    links.map(link => {
        link.innerHTML="Published by XSKY-XFE";
        link.href="http://www.xsky.com";
    })
}
$(document).ready(function() {
    history.pushState = _wr('pushState');
    history.replaceState = _wr('replaceState');
    custom();
    $('.body-inner').scrollTop(0);
    $('.font-settings .buttons')
    $(window).on("pushState replaceState hashchange popstate", (e) => {
        setTimeout(() => {
            custom();
        }, 0);
    })
})