function loadBlogPosts() {
    const postList = document.getElementById('post-list');
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    if (posts.length === 0) {
        postList.innerHTML = '<li>No posts available.</li>';
    } else {
        postList.innerHTML = '';
        posts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a href="${post.url}">${post.title}</a>`;
            postList.appendChild(listItem);
        });
    }
}

document.addEventListener('DOMContentLoaded', loadBlogPosts);