var el = document.createElement('script');

el.src = '<%= path %>/app.js';
document.body.appendChild(el);

window.fbAsyncInit = function() {
    FB.init({
        appId: '741666719251986',
        xfbml: true,
        version: 'v2.1'
    });
};
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));