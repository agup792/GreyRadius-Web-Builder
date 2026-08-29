(function() {
  'use strict';

  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClear');
  const filters = document.getElementById('searchFilters');
  const pills = document.querySelectorAll('.spill');
  
  const countEl = document.getElementById('searchCount');
  const skeletons = document.getElementById('searchSkeletons');
  const resultsEl = document.getElementById('searchResults');
  const emptyEl = document.getElementById('searchEmpty');
  const emptyQuery = document.getElementById('emptyQuery');
  const emptyResetBtn = document.getElementById('emptyResetBtn');

  let searchIndex = [];
  let currentCategory = 'All';
  let currentIndustry = 'All';
  let currentGeography = 'All';
  let isReady = false;

  function populateSelect(selectId, field) {
    const select = document.getElementById(selectId);
    if (!select) return;
    const labels = [...new Set(searchIndex.flatMap(item => item[field] || []))]
      .sort((a, b) => a.localeCompare(b));
    labels.forEach(label => {
      const option = document.createElement('option');
      option.value = label;
      option.textContent = label;
      select.appendChild(option);
    });
  }

  // Icons for categories
  const icons = {
    'Insight': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
    'Case Study': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>',
    'Industry': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
    'Service': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
    'Page': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>',
    'About': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
  };

  // Fetch index
  fetch('/data/search-index.json')
    .then(res => res.json())
    .then(data => {
      searchIndex = data;
      isReady = true;
      skeletons.style.display = 'none';
      populateSelect('industryFilter', 'industries');
      populateSelect('geographyFilter', 'geographies');
      
      // Look for query param in URL
      const params = new URLSearchParams(window.location.search);
      if (params.has('q')) {
        const q = params.get('q');
        // If it starts with site:..., strip it out
        input.value = q.replace(/site:greyradius\.com\s*/i, '').trim();
        clearBtn.style.display = input.value ? 'flex' : 'none';
      }
      
      renderResults();
    })
    .catch(err => {
      console.error('Search index failed to load', err);
      skeletons.style.display = 'none';
      countEl.innerHTML = 'Search index failed to load. Please try again later.';
    });

  // Events
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isReady) renderResults();
  });

  input.addEventListener('input', () => {
    clearBtn.style.display = input.value.trim() ? 'flex' : 'none';
    if (isReady) renderResults();
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.style.display = 'none';
    input.focus();
    if (isReady) renderResults();
  });

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-pressed', 'true');
      currentCategory = pill.getAttribute('data-type');
      if (isReady) renderResults();
    });
  });

  const industryFilter = document.getElementById('industryFilter');
  const geographyFilter = document.getElementById('geographyFilter');
  industryFilter.addEventListener('change', () => {
    currentIndustry = industryFilter.value;
    if (isReady) renderResults();
  });
  geographyFilter.addEventListener('change', () => {
    currentGeography = geographyFilter.value;
    if (isReady) renderResults();
  });

  emptyResetBtn.addEventListener('click', () => {
    input.value = '';
    clearBtn.style.display = 'none';
    pills.forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-pressed', 'false');
    });
    const allPill = document.querySelector('[data-type="All"]');
    allPill.classList.add('active');
    allPill.setAttribute('aria-pressed', 'true');
    currentCategory = 'All';
    currentIndustry = 'All';
    currentGeography = 'All';
    industryFilter.value = 'All';
    geographyFilter.value = 'All';
    if (isReady) renderResults();
  });

  // Render logic
  function renderResults() {
    const q = input.value.trim().toLowerCase();
    
    // Update URL without reload
    const url = new URL(window.location);
    if (q) url.searchParams.set('q', q);
    else url.searchParams.delete('q');
    window.history.replaceState({}, '', url);

    let filtered = searchIndex;

    if (currentCategory !== 'All') {
      filtered = filtered.filter(item => item.type === currentCategory);
    }
    if (currentIndustry !== 'All') {
      filtered = filtered.filter(item => (item.industries || []).includes(currentIndustry));
    }
    if (currentGeography !== 'All') {
      filtered = filtered.filter(item => (item.geographies || []).includes(currentGeography));
    }

    if (q) {
      filtered = filtered.filter(item => {
        return item.title.toLowerCase().includes(q) || 
               item.description.toLowerCase().includes(q) ||
               item.url.toLowerCase().includes(q) ||
               (item.industries || []).join(' ').toLowerCase().includes(q) ||
               (item.geographies || []).join(' ').toLowerCase().includes(q);
      });
    }

    // Default sorting: if no query, maybe put Case Studies and Insights first?
    // Actually, alphabetical or just natural array order is fine.
    
    // Pagination or just slice top 50 to prevent DOM overload
    const maxResults = 100;
    const showing = filtered.slice(0, maxResults);

    resultsEl.innerHTML = '';
    
    if (showing.length === 0) {
      resultsEl.style.display = 'none';
      emptyEl.style.display = 'block';
      emptyQuery.textContent = input.value;
      countEl.innerHTML = `<strong>0</strong> results for your criteria`;
    } else {
      resultsEl.style.display = 'flex';
      emptyEl.style.display = 'none';
      
      const countText = filtered.length > maxResults ? `Showing top <strong>${maxResults}</strong> of <strong>${filtered.length}</strong> results` : `<strong>${filtered.length}</strong> results`;
      countEl.innerHTML = countText;

      const fragment = document.createDocumentFragment();
      
      showing.forEach(item => {
        const a = document.createElement('a');
        a.className = 'search-result-item';
        a.href = item.url;
        
        let iconHtml = icons[item.type] || icons['Page'];

        const labels = [...(item.industries || []), ...(item.geographies || [])].slice(0, 3);
        a.innerHTML = `
          <div class="result-type">${iconHtml} ${item.type}</div>
          <h2 class="result-title">${highlight(item.title, q)}</h2>
          <p class="result-desc">${highlight(item.description, q) || 'Read more...'}</p>
          ${labels.length ? `<div class="result-tags">${labels.map(label => `<span>${label}</span>`).join('')}</div>` : ''}
          <div class="result-url">greyradius.com${item.url}</div>
        `;
        fragment.appendChild(a);
      });
      
      resultsEl.appendChild(fragment);
    }
  }

  function highlight(text, query) {
    if (!query || !text) return text;
    // Simple naive highlight
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<mark style="background:var(--color-orange-soft);color:var(--color-orange);padding:0 2px;border-radius:2px;">$1</mark>');
  }

  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

})();
