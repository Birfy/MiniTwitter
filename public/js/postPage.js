$(document).ready(() => {
    $.get("/api/posts/" + postId, (results) => {
        // console.log(results);
        // if (xhr.status = 400) {
        //     $(".postsContainer").append("<span class='noResults'> No results found</span>");
        //     return;
        // }
        outputPostsWithReplies(results, $(".postsContainer"));
    })
})
