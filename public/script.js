document.addEventListener('DOMContentLoaded', () => {
  const resourcesList = document.getElementById('resourcesList');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  
  let allResources = [];
  
  // Fetch resources from the server
  fetch('/api/resources')
    .then(response => response.json())
    .then(data => {
      allResources = data;
      displayResources(allResources);
    })
    .catch(error => console.error('Error fetching resources:', error));
  
  // Function to display resources
  function displayResources(resources) {
    resourcesList.innerHTML = '';
    resources.forEach(resource => {
      const card = document.createElement('div');
      card.className = 'col-md-4';
      card.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title"><a href="${resource.url}" target="_blank">${resource.title}</a></h5>
            <p class="card-text">${resource.description}</p>
            <p class="card-text"><small class="text-muted">Category: ${resource.category}</small></p>
          </div>
        </div>
      `;
      resourcesList.appendChild(card);
    });
  }
  
  // Filter resources based on search and category
  function filterResources() {
    const query = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const filtered = allResources.filter(resource => {
      const matchesQuery = resource.title.toLowerCase().includes(query) || resource.category.toLowerCase().includes(query);
      const matchesCategory = !category || resource.category === category;
      return matchesQuery && matchesCategory;
    });
    displayResources(filtered);
  }
  
  // Event listeners for search and filter
  searchInput.addEventListener('input', filterResources);
  categoryFilter.addEventListener('change', filterResources);
});