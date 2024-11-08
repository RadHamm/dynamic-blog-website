// Function to save blog post to local storage
function savePost(event) {
    event.preventDefault();  // Prevent form submission (if page refreshes)

    // Get values from the form
    const title = document.getElementById('title').value.trim();
    const content = document.getElementById('content').value.trim();
    const image = document.getElementById('image').value.trim();

    // Validation: Title and content are required
    if (!title || !content) {
        document.getElementById('form-message').textContent = 'Title and Content are required!';
        document.getElementById('form-message').style.color = 'red';
        return;
    }
    const url = title.replace(/\s+/g, '-').toLowerCase(); // unique ID

    // Creates new post object
    const newPost = {
        title,
        content,
        image: image || null,
        url: url
    };

    // Get existing posts from localStorage, or create an empty array
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

    // Pushes (adds) new post
    posts.push(newPost);

    // Save the updated posts back to localStorage
    localStorage.setItem('blogPosts', JSON.stringify(posts));

    // if form submission is success, clears the form
    document.getElementById('post-form').reset();
}

// Add event listener for form submission
document.getElementById('post-form').addEventListener('submit', savePost);