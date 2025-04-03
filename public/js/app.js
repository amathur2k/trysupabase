document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const documentForm = document.getElementById('documentForm');
    const searchForm = document.getElementById('searchForm');
    const resultsContainer = document.getElementById('results');
    
    // Bootstrap Modal
    const statusModal = new bootstrap.Modal(document.getElementById('statusModal'));
    const statusTitle = document.getElementById('statusTitle');
    const statusMessage = document.getElementById('statusMessage');
    
    // Show status message in modal
    function showStatus(title, message, isError = false) {
        statusTitle.textContent = title;
        statusMessage.innerHTML = message;
        statusTitle.className = isError ? 'text-danger' : 'text-success';
        statusModal.show();
    }
    
    // Handle document ingestion
    documentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const heading = document.getElementById('heading').value.trim();
        const content = document.getElementById('content').value.trim();
        
        if (!heading || !content) {
            showStatus('Error', 'Please provide both heading and content', true);
            return;
        }
        
        try {
            // Show loading state
            const submitBtn = documentForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
            
            // Send request to API
            const response = await fetch('/api/documents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ heading, content })
            });
            
            const data = await response.json();
            
            // Reset form
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            
            if (response.ok) {
                showStatus('Success', 'Document ingested successfully!');
                documentForm.reset();
            } else {
                showStatus('Error', `Failed to ingest document: ${data.message}`, true);
            }
        } catch (error) {
            showStatus('Error', `An error occurred: ${error.message}`, true);
            console.error('Error ingesting document:', error);
        }
    });
    
    // Handle document search
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const query = document.getElementById('query').value.trim();
        
        if (!query) {
            showStatus('Error', 'Please provide a search query', true);
            return;
        }
        
        try {
            // Show loading state
            resultsContainer.innerHTML = `
                <div class="loading">
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            `;
            
            // Send request to API
            const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
            const data = await response.json();
            
            if (response.ok) {
                displayResults(data.results, query);
            } else {
                resultsContainer.innerHTML = `
                    <div class="alert alert-danger">
                        Failed to search documents: ${data.message}
                    </div>
                `;
            }
        } catch (error) {
            resultsContainer.innerHTML = `
                <div class="alert alert-danger">
                    An error occurred: ${error.message}
                </div>
            `;
            console.error('Error searching documents:', error);
        }
    });
    
    // Display search results
    function displayResults(results, query) {
        if (!results || results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="alert alert-warning">
                    No results found for "${query}"
                </div>
            `;
            return;
        }
        
        let resultsHTML = '';
        
        results.forEach(result => {
            resultsHTML += `
                <div class="result-card">
                    <h5 class="result-heading">${result.heading}</h5>
                    <p class="result-content">${highlightMatchingText(result.content, query)}</p>
                    <div class="text-end">
                        <small class="text-muted">Similarity: ${(result.similarity * 100).toFixed(2)}%</small>
                    </div>
                </div>
            `;
        });
        
        resultsContainer.innerHTML = resultsHTML;
    }
    
    // Highlight matching text in content
    function highlightMatchingText(content, query) {
        if (!query || !content) return content;
        
        // Simple highlighting (case-insensitive)
        const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
        return content.replace(regex, match => `<span class="highlight">${match}</span>`);
    }
});
