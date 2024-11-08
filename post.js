// Function to load the post data based on the URL ID
function loadPost() {
    const urlParams = new URLSearchParams(window.location.search);  
    const postId = urlParams.get('id');  

    //  localStorage posts & URL
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const post = posts.find(p => p.url === postId); 

    //  post details
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-content').textContent = post.content;
    
    if (post.image) {
        document.getElementById('post-image').src = post.image;
    } else {
        document.getElementById('post-image').style.display = 'none';
    }

    // edit button
    document.getElementById('edit-button').addEventListener('click', function() {
        toggleEditForm(post);  // Show the edit form with current post data
    });
// delete button
    document.getElementById('delete-button').addEventListener('click', function() {
        deletePost(post);
    });
}

// Function to use the edit form and show current post data
function toggleEditForm(post) {
    // Show the edit form
    document.getElementById('edit-form').style.display = 'block';
    
    // Populate form fields with current post data
    document.getElementById('edit-title').value = post.title;
    document.getElementById('edit-content').value = post.content;
    document.getElementById('edit-image').value = post.image || '';
    
    // Handle form submission
    document.getElementById('edit-post-form').onsubmit = function(event) {
        event.preventDefault();
        
        // Get updated values from the form
        const updatedTitle = document.getElementById('edit-title').value.trim();
        const updatedContent = document.getElementById('edit-content').value.trim();
        const updatedImage = document.getElementById('edit-image').value.trim();

        // Validate the form
        if (!updatedTitle || !updatedContent) {
            alert('Title and content are required!');
            return;
        }

        // Update the post object
        post.title = updatedTitle;
        post.content = updatedContent;
        post.image = updatedImage || null;

        // Save updated posts to localStorage
        const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        const updatedPosts = posts.map(p => p.url === post.url ? post : p);
        localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));

        // Update the post details on the page
        document.getElementById('post-title').textContent = updatedTitle;
        document.getElementById('post-content').textContent = updatedContent;
        if (updatedImage) {
            document.getElementById('post-image').src = updatedImage;
        }

        // Hide the edit form
        document.getElementById('edit-form').style.display = 'none';
        alert('Post updated successfully!');
    };
}
function deletePost(post) {
    const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const updatedPosts = posts.filter(p => p.url !== post.url);  // Remove the post with matching URL ID
    
    // Save the updated posts back to localStorage
    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
}

// load post when page loads
window.onload = loadPost;