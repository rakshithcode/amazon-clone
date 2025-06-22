// Mock Data
const user = { name: "Alex Johnson", role: "Admin" };

const tags = ["HR", "Technical", "Strategy", "Product", "API", "Training"];
const authors = ["Sarah Chen", "Mike Taylor", "Alex Johnson"];
const categories = ["SOP", "FAQ", "Guide"];

const stats = [
    { label: "Total Documents", value: 248 },
    { label: "Recent Updates", value: 36 },
    { label: "Pending Reviews", value: 12 },
    { label: "Needs Attention", value: 5 }
];

const documents = [
    {
        title: "Product Roadmap 2023",
        version: "2.1",
        status: "Approved",
        description: "Strategic product development plan for the upcoming year with key milestones and feature releases.",
        updated: "2 days ago",
        views: 24,
        edits: 3,
        author: "Sarah Chen",
        tags: ["Strategy", "Product"],
        category: "SOP"
    },
    {
        title: "API Documentation",
        version: "1.4",
        status: "In Review",
        description: "Comprehensive guide to our REST API endpoints, authentication methods, and response formats.",
        updated: "5 days ago",
        views: 42,
        edits: 5,
        author: "Mike Taylor",
        tags: ["Technical", "API"],
        category: "FAQ"
    },
    {
        title: "Onboarding Guide",
        version: "1.0",
        status: "Draft",
        description: "Step-by-step guide for new team members covering tools, processes, and company culture.",
        updated: "yesterday",
        views: 8,
        edits: 1,
        author: "Alex Johnson",
        tags: ["HR", "Training"],
        category: "Guide"
    }
];

const analytics = [
    { label: "Active Users", value: 120 },
    { label: "Top Contributors", value: 15 },
    { label: "Popular Searches", value: 50 }
];

// Populate user info
document.getElementById("userName").textContent = user.name;
document.getElementById("userRole").textContent = user.role;

// Populate filters
function populateSelect(id, items) {
    const select = document.getElementById(id);
    items.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item;
        opt.textContent = item;
        select.appendChild(opt);
    });
}
populateSelect("tagFilter", tags);
populateSelect("authorFilter", authors);
populateSelect("categoryFilter", categories);

// Render stats
const statsRow = document.getElementById("statsRow");
stats.forEach(stat => {
    statsRow.innerHTML += `
        <div class="col">
            <div class="card text-center stat-card">
                <div class="card-body">
                    <div class="stat-value">${stat.value}</div>
                    <div>${stat.label}</div>
                </div>
            </div>
        </div>
    `;
});

// Render documents
function renderDocuments(docs) {
    const documentsRow = document.getElementById("documentsRow");
    documentsRow.innerHTML = "";
    docs.forEach(doc => {
        let statusClass = "bg-secondary";
        if (doc.status === "Approved") statusClass = "bg-success";
        else if (doc.status === "In Review") statusClass = "bg-warning text-dark";
        documentsRow.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-3 doc-card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <div>
                                <b>${doc.title}</b>
                                <span class="badge bg-secondary ms-2">v${doc.version}</span>
                            </div>
                            <span class="badge ${statusClass}">${doc.status}</span>
                        </div>
                        <div class="doc-desc">${doc.description}</div>
                        <div class="doc-meta">Updated ${doc.updated} • ${doc.views} views • ${doc.edits} edits</div>
                        <div class="doc-author">👤 ${doc.author}</div>
                        ${doc.tags.map(tag => `<span class="badge bg-info text-dark me-1">${tag}</span>`).join('')}
                        <div class="mt-2">
                            <span class="badge bg-primary">${doc.category}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
}
renderDocuments(documents);

// Render analytics
const analyticsRow = document.getElementById("analyticsRow");
analytics.forEach(a => {
    analyticsRow.innerHTML += `
        <div class="col">
            <div class="card text-center">
                <div class="card-body">
                    <div class="stat-value">${a.value}</div>
                    <div>${a.label}</div>
                </div>
            </div>
        </div>
    `;
});

// Filter functionality (basic)
function filterDocuments() {
    const tag = document.getElementById("tagFilter").value;
    const author = document.getElementById("authorFilter").value;
    const category = document.getElementById("categoryFilter").value;
    const search = document.getElementById("searchInput").value.toLowerCase();

    let filtered = documents.filter(doc => {
        return (!tag || doc.tags.includes(tag)) &&
               (!author || doc.author === author) &&
               (!category || doc.category === category) &&
               (doc.title.toLowerCase().includes(search) || doc.description.toLowerCase().includes(search));
    });
    renderDocuments(filtered);
}

document.getElementById("tagFilter").addEventListener("change", filterDocuments);
document.getElementById("authorFilter").addEventListener("change", filterDocuments);
document.getElementById("categoryFilter").addEventListener("change", filterDocuments);
document.getElementById("searchInput").addEventListener("input", filterDocuments);
