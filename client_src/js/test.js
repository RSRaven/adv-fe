$(function(){

var posts = Data.getPosts();

var jsonPostsTemplate = Handlebars.compile( $('#posts-json-template').html() );
var jsonTableTemplate = Handlebars.compile( $('#posts-table-template').html() );

Handlebars.registerHelper('json', function(json) {

    text = Handlebars.Utils.escapeExpression( JSON.stringify( json ) );

    html = text.replace( '[', '<p>[</p>' )
               .replace( /{/g, '<p>&nbsp;&nbsp;&nbsp;&nbsp;{</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' )
               .replace( /,/g, ',</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' )
               .replace( /},<\/p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/g, '<p>&nbsp;&nbsp;&nbsp;&nbsp;},</p>' )
               .replace( '}]', '<p>&nbsp;&nbsp;&nbsp;&nbsp;}</p><p>]</p>' );

    return new Handlebars.SafeString( html );
});

// когда делаю как в примере 
// ret = ret + '<p class="posts-table__item">' + options.fn( posts[i].description ) + '</p>';
// options.fn( posts[i].description ) - пустой.
// вставляются только абзацы, но пустые

Handlebars.registerHelper('table', function(posts, options) {

    var ret = '';

    for (var i=0; i < posts.length; i++) {
        if ( i % 2 === 1 ) {
            ret = ret + '<p class="posts-table__item">' + posts[i].description + '</p>';
        } else {
            ret = ret + '<p class="posts-table__item--grey">' + posts[i].description + '</p>';
        }
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