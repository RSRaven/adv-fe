$(function(){

var posts = Data.getPosts();

var jsonPostsTemplate = Handlebars.compile( $('#posts-json-template').html() );
var jsonTableTemplate = Handlebars.compile( $('#posts-table-template').html() );

Handlebars.registerHelper('json', function(json) {

    text = '<pre>' + Handlebars.Utils.escapeExpression( JSON.stringify( json, null, '\t' ) ) + '</pre>';

    return new Handlebars.SafeString( text );
});

Handlebars.registerHelper('table', function(posts, options) {

    var ret = '';

    for (var i=0; i < posts.length; i++) {

        var className = 'posts-table__item';

        if ( i % 2 !== 1 ) {
            className += ' posts-table__item--grey';
        }

        ret = ret + '<p class="' + className+ '">' + options.fn( posts[i] ) + '</p>';
    }

    return ret;
});

$('.posts-json').html( jsonPostsTemplate( {
    posts: posts
}));

$('.posts-table').html( jsonTableTemplate( {
    posts: posts
}));


});
