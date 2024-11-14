$(document).ready(function() {
    let currentPage = 1; // Starting page
    const postsPerPage = 5; // Number of posts to fetch per request

    // Function to load posts
    const loadPosts = () => {
        $.ajax({
            url: `https://jsonplaceholder.typicode.com/todos?_limit=${postsPerPage}&_page=${currentPage}`,
            method: 'GET',
            success: function(data) {
                data.forEach(post => {
                    const listItem = $('<li>').text(post.title);
                    //const listItem2= $('<li>').text(post.id);
                    $('#postList').append(listItem);
                    //$('#uid').append(listItem2);
                });
                currentPage++; // Increment page for next load
            },
            error: function() {
                alert('Error loading posts');
            }
        });
    };

    // Load initial posts
    loadPosts();

    // Load more posts when button is clicked
    $('#loadMore').on('click', function() {
        loadPosts();
    });
});
