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
    gitbook.state.basePath.replace(/\.{2}\/{0,1}/, ".")
    footer();
}
function download_file(fileURL, fileName) {
    // for non-IE
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        var filename = fileURL.substring(fileURL.lastIndexOf('/')+1);
        save.download = fileName || filename;
	       if ( navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
				document.location = save.href; 
    // window event not working here
			}else{
		        var evt = new MouseEvent('click', {
		            'view': window,
		            'bubbles': true,
		            'cancelable': false
		        });
		        save.dispatchEvent(evt);
		        (window.URL || window.webkitURL).revokeObjectURL(save.href);
			}	
    }

    // for IE < 11
    else if ( !! window.ActiveXObject && document.execCommand)     {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}

function footer() {
    var _label = '文档最后编辑于',
        _format = 'YYYY-MM-DD HH:mm:ss',
        _copy = ''

    if(gitbook.state.config.pluginsConfig['pagefooter']) {
        _label = gitbook.state.config.pluginsConfig['pagefooter']['modify_label'] || _label;
        _format = gitbook.state.config.pluginsConfig['pagefooter']['modify_format'] || _format;

        var _c = gitbook.state.config.pluginsConfig['pagefooter']['copyright'];
        _copy = _c ? _c + ' all right reserved，' + _copy : _copy;
    }
    var _copy = '<span class="copyright">'+_copy+'</span>'
    moment.locale('zh-cn');
    var str = ` \n\n<footer class="page-footer">${_copy}<span class="footer-modification">${_label}${moment(gitbook.state.file.mtime, _format).format('lll')}\n</span></footer>`
    $('.search-noresults:nth(1)').append(str)
}

$(document).ready(function() {
    history.pushState = _wr('pushState');
    history.replaceState = _wr('replaceState');
    custom();
    $('.body-inner').scrollTop(0);
    $('.font-settings .buttons');
    $('.download').click(()=>{
        download_file('assets/ebook/online-help-cn.pdf', 'online-help-cn.pdf');
    })
    $(window).on("pushState replaceState hashchange popstate", (e) => {
        setTimeout(() => {
            custom();
        }, 0);
    })
})