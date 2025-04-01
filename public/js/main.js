fetch('./blogs.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Failed to fetch blogs.json');
        }
        return response.json();
    })
    .then((blogs) => {
        renderBlogs(blogs);
    })
    .catch((error) => {
        console.error('Error loading blogs:', error);
    });

function renderBlogs(Blogs) {
    const blogsGrid = document.querySelector('.blog-container');
    blogsGrid.innerHTML = '';
    Blogs.forEach((blog) => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <div class="product-info">
                <h3 class="blog-title">${blog.title}</h3>
                <p class="blog-subtitle">${blog.subtitle}</p>
                <p class="blog-author">${blog.author}</p>
                <p class="blog-content">${blog.content}</p>
                <p class="blog-date">${blog.publishDate}</p>
                <p class="blog-category">${blog.category}</p>
            </div>
        `;
        blogsGrid.appendChild(blogCard);
    });
}
