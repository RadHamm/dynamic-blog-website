// Function to load blog posts and display from local storage
function loadBlogPosts() {
    const postList = document.getElementById('post-list');

    const posts = JSON.parse(localStorage.getItem('blogPosts')) || []; // calls posts from local storage

    if (posts.length === 0) {
        postList.innerHTML = '<li>No posts available.</li>';
    } else {
        postList.innerHTML = ''; // clears previous content
        posts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${post.url}">${post.title}</a>`;
            postList.appendChild(listItem);
        });
    };
}
// call function when page loads
window.onload = loadBlogPosts;