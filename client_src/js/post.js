$(function(){

    var posts = Data.getPosts();
    var articleComments = Data.getPostComments();
    var postTemplate = Handlebars.compile( $('#article-template').html() );
    var postId = window.location.search.slice(4);
    var context = Data.getPost(postId);

    Handlebars.registerPartial( 'comments', $('#article-comments-template').html() );
    Handlebars.registerPartial( 'related', $('#related-posts').html() );

    $('.wrapper').html( postTemplate( {
        context: context,
        user: Data.getUser(context.userId),
        articleComments: articleComments,
        posts: posts
    }) );

    var $grid = $('.related-posts').imagesLoaded( function() {
        $grid.isotope({
            itemSelector: '.post',
            percentPosition: true,
            layoutMode: 'masonry'
        });
    });

});
