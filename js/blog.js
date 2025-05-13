// Blog Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Blog Post Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const postsContainer = document.getElementById('posts-container');
    const posts = document.querySelectorAll('.post-card');
    
    if (filterButtons.length > 0 && postsContainer) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Filter posts
                filterPosts(category);
            });
        });
    }
    
    function filterPosts(category) {
        posts.forEach(post => {
            if (category === 'all' || post.getAttribute('data-category') === category) {
                post.style.display = 'block';
                
                // Add animation
                post.classList.add('fade-in');
                setTimeout(() => {
                    post.classList.remove('fade-in');
                }, 500);
            } else {
                post.style.display = 'none';
            }
        });
    }
    
    // Blog Search Functionality
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            searchPosts(searchInput.value.trim().toLowerCase());
        });
        
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchPosts(this.value.trim().toLowerCase());
            }
        });
    }
    
    function searchPosts(searchTerm) {
        // Reset filter buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('[data-category="all"]').classList.add('active');
        
        if (searchTerm === '') {
            // If search is empty, show all posts
            posts.forEach(post => {
                post.style.display = 'block';
            });
            return;
        }
        
        // Search in post title and content
        posts.forEach(post => {
            const title = post.querySelector('h3').textContent.toLowerCase();
            const content = post.querySelector('p').textContent.toLowerCase();
            const category = post.querySelector('.post-category').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm) || category.includes(searchTerm)) {
                post.style.display = 'block';
                
                // Add animation
                post.classList.add('fade-in');
                setTimeout(() => {
                    post.classList.remove('fade-in');
                }, 500);
            } else {
                post.style.display = 'none';
            }
        });
        
        // Show message if no results found
        const visiblePosts = Array.from(posts).filter(post => post.style.display !== 'none');
        
        if (visiblePosts.length === 0) {
            // Check if no-results message already exists
            let noResults = document.querySelector('.no-results');
            
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = `
                    <p>No posts found matching "${searchTerm}"</p>
                    <button class="btn" id="reset-search">Clear Search</button>
                `;
                postsContainer.appendChild(noResults);
                
                // Add event listener to reset button
                document.getElementById('reset-search').addEventListener('click', function() {
                    searchInput.value = '';
                    searchPosts('');
                    noResults.remove();
                });
            }
        } else {
            // Remove no-results message if it exists
            const noResults = document.querySelector('.no-results');
            if (noResults) {
                noResults.remove();
            }
        }
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .no-results {
            text-align: center;
            padding: 40px 0;
        }
        
        .no-results p {
            margin-bottom: 20px;
            font-size: 1.2rem;
        }
    `;
    document.head.appendChild(style);
});
