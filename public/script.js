document.addEventListener('DOMContentLoaded', () => {
  const resourcesList = document.getElementById('resourcesList');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  let allResources = [];

  // Load resources from server
  fetch('/api/resources')
    .then(res => res.json())
    .then(data => {
      allResources = data;
      renderCards(allResources);
    });

  function renderCards(data) {
    resourcesList.innerHTML = '';
    data.forEach(item => {
      const card = `
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text text-muted">${item.description}</p>
              <div class="d-flex justify-content-between align-items-center">
                <a href="${item.url}" target="_blank" class="btn btn-sm btn-outline-primary">View Resource</a>
                <span class="badge bg-secondary">${item.category}</span>
              </div>
            </div>
          </div>
        </div>`;
      resourcesList.innerHTML += card;
    });
  }

  // Live Filtering
  function filter() {
    const term = searchInput.value.toLowerCase();
    const cat = categoryFilter.value;
    const filtered = allResources.filter(r => 
      (r.title.toLowerCase().includes(term) || r.description.toLowerCase().includes(term)) &&
      (cat === '' || r.category === cat)
    );
    renderCards(filtered);
  }

  searchInput.addEventListener('input', filter);
  categoryFilter.addEventListener('change', filter);
});