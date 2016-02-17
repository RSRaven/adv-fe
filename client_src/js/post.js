$(function(){

var posts = Data.getPosts();
var articleComments = Data.getPostComments();
// console.log('articleComments= ', articleComments);
var postTemplate = Handlebars.compile( $('#article-template').html() );


var context = Data.getPost();


Handlebars.registerPartial( 'comments', $('#article-comments-template').html() );
Handlebars.registerPartial( 'related', $('#related-posts').html() );

// Handlebars.registerHelper('article-user', function(userId) {
//     var user = Data.getUser(userId).name;
//     return new Handlebars.SafeString( user + ':');
// });

// Handlebars.registerHelper('article-user-tags', function(userId) {
//     var tags = [];
//     var userTags = Data.getUser(userId).following.tags;
//     for (var i = 0; i < userTags.length; i++) {
//         tags.push('#' + userTags[i].name);
//     }
//         var tagsStr = tags.join(' ');
//     return new Handlebars.SafeString( tagsStr );
// });

// Handlebars.registerHelper('article-comments', function(userId) {
//     var comments = Data.getPostComments(userId);
//     return new Handlebars.SafeString( user + ':');
// });

$('.wrapper').html( postTemplate( {
    context: context,
    user: Data.getUser(context.userId),
    articleComments: articleComments,
    posts: posts
}) );

// var $isotope = $('.related-posts').isotope({
//     itemSelector: '.post',
//     percentPosition: true,
//     layoutMode: 'masonry'
//     // masonry: {
//     //     columnWidth: '.post-sizer'
//     // }
// });

// $isotope.imagesLoaded().progress( function() {
//   $isotope.isotope('layout');
//   console.log('another one...');
// });



var $grid = $('.related-posts').imagesLoaded( function() {
    $grid.isotope({
        itemSelector: '.post',
        percentPosition: true,
        layoutMode: 'masonry'
    });
});

});