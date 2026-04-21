# Bookkeeping Automation Web Application - Master Plan & Framework

## Project Overview
A free, tab-based web application providing 20 AI-powered tools for bookkeepers to automate time-consuming tasks.

---

## 1. Overall Architecture

```
bookkeeping-automation-app/
├── index.html                 # Main entry point
├── css/
│   ├── main.css              # Global styles
│   └── responsive.css        # Mobile responsiveness
├── js/
│   ├── app.js                # Main app controller
│   ├── tab-manager.js        # Tab switching logic
│   └── api-handler.js        # API communication
├── tools/
│   ├── tool-1-invoice-extraction/
│   │   ├── invoice-extraction.html
│   │   ├── invoice-extraction.js
│   │   └── invoice-extraction.css
│   ├── tool-2-expense-categorization/
│   ├── tool-3-bank-reconciliation/
│   └── ... (tools 4-20)
├── api/
│   ├── routes/
│   │   ├── invoice-extraction.js
│   │   ├── expense-categorization.js
│   │   └── ... (routes for each tool)
│   └── middleware/
│       ├── auth.js
│       └── validation.js
├── assets/
│   ├── icons/
│   └── images/
└── config/
    └── app-config.js
```

---

## 2. Main Index HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bookkeeping Automation Suite - Free Tools</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
    <div class="app-container">
        <!-- Header -->
        <header class="app-header">
            <div class="header-content">
                <h1>Bookkeeping Automation Suite</h1>
                <p>20 Free Tools to Automate Your Accounting Tasks</p>
            </div>
        </header>

        <!-- Navigation Tabs -->
        <nav class="tab-navigation">
            <div class="tabs-container">
                <button class="tab-button active" data-tool-id="1" data-tool-name="invoice-extraction">
                    Invoice Extraction
                </button>
                <button class="tab-button" data-tool-id="2" data-tool-name="expense-categorization">
                    Expense Categorization
                </button>
                <button class="tab-button" data-tool-id="3" data-tool-name="bank-reconciliation">
                    Bank Reconciliation
                </button>
                <!-- Add remaining 17 tools -->
            </div>
        </nav>

        <!-- Tool Container -->
        <main class="tool-container">
            <div id="tool-content"></div>
        </main>

        <!-- Footer -->
        <footer class="app-footer">
            <p>&copy; 2026 Bookkeeping Automation Suite. All tools are free to use.</p>
        </footer>
    </div>

    <script src="js/app.js"></script>
    <script src="js/tab-manager.js"></script>
    <script src="js/api-handler.js"></script>
</body>
</html>
```

---

## 3. Tab Manager (js/tab-manager.js)

```javascript
class TabManager {
    constructor() {
        this.currentTool = null;
        this.tools = {};
        this.init();
    }

    init() {
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', (e) => this.switchTool(e));
        });
    }

    switchTool(event) {
        const toolId = event.target.dataset.toolId;
        const toolName = event.target.dataset.toolName;
        this.loadTool(toolId, toolName);
        this.updateActiveTab(event.target);
    }

    loadTool(toolId, toolName) {
        const toolPath = `tools/tool-${toolId}-${toolName}/`;
        fetch(`${toolPath}${toolName}.html`)
            .then(response => response.text())
            .then(html => {
                document.getElementById('tool-content').innerHTML = html;
                this.loadToolScript(toolPath, toolName);
                this.loadToolStyles(toolPath, toolName);
            })
            .catch(error => console.error('Error loading tool:', error));
    }

    loadToolScript(toolPath, toolName) {
        const script = document.createElement('script');
        script.src = `${toolPath}${toolName}.js`;
        document.body.appendChild(script);
    }

    loadToolStyles(toolPath, toolName) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `${toolPath}${toolName}.css`;
        document.head.appendChild(link);
    }

    updateActiveTab(button) {
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new TabManager();
});
```

---

## 4. Tool Template Structure

Each tool should follow this template:

### Tool HTML Template (`tools/tool-X-name/tool-name.html`)

```html
<div class="tool-wrapper">
    <div class="tool-header">
        <h2>Tool Name</h2>
        <p>Brief description of what this tool does</p>
    </div>

    <div class="tool-content">
        <!-- Tool-specific UI elements go here -->
        <div class="input-section">
            <!-- Input fields, file uploads, etc. -->
        </div>
        
        <div class="output-section">
            <!-- Results display -->
        </div>
    </div>

    <div class="tool-footer">
        <button class="btn-primary" id="process-btn">Process</button>
        <button class="btn-secondary" id="reset-btn">Reset</button>
        <button class="btn-secondary" id="export-btn">Export Results</button>
    </div>
</div>
```

### Tool JavaScript Template (`tools/tool-X-name/tool-name.js`)

```javascript
class ToolName {
    constructor() {
        this.init();
    }

    init() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.getElementById('process-btn')?.addEventListener('click', () => this.processData());
        document.getElementById('reset-btn')?.addEventListener('click', () => this.reset());
        document.getElementById('export-btn')?.addEventListener('click', () => this.exportResults());
    }

    processData() {
        // Get input data
        const inputData = this.getInputData();
        
        // Call API
        this.callAPI(inputData)
            .then(results => this.displayResults(results))
            .catch(error => this.showError(error));
    }

    getInputData() {
        // Extract data from form inputs
    }

    callAPI(data) {
        return fetch('/api/tool-name', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json());
    }

    displayResults(results) {
        // Render results in the output section
    }

    reset() {
        // Clear all inputs and outputs
    }

    exportResults() {
        // Export data (CSV, JSON, etc.)
    }

    showError(error) {
        console.error(error);
        // Display error message to user
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ToolName();
});
```

### Tool CSS Template (`tools/tool-X-name/tool-name.css`)

```css
.tool-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.tool-header {
    margin-bottom: 30px;
    border-bottom: 2px solid #007bff;
    padding-bottom: 15px;
}

.tool-header h2 {
    margin: 0 0 10px 0;
    color: #333;
}

.tool-header p {
    margin: 0;
    color: #666;
    font-size: 14px;
}

.tool-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
}

.input-section, .output-section {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
}

.tool-footer {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.btn-primary, .btn-secondary {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-primary:hover {
    background-color: #0056b3;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background-color: #545b62;
}

@media (max-width: 768px) {
    .tool-content {
        grid-template-columns: 1fr;
    }
}
```

---

## 5. API Route Template

### Backend API Route (`api/routes/tool-name.js`)

```javascript
const express = require('express');
const router = express.Router();

router.post('/api/tool-name', async (req, res) => {
    try {
        const inputData = req.body;
        
        // Validate input
        if (!inputData) {
            return res.status(400).json({ error: 'Invalid input' });
        }
        
        // Process data (call AI model, perform calculations, etc.)
        const results = await processToolLogic(inputData);
        
        // Return results
        res.json({
            success: true,
            data: results
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

async function processToolLogic(data) {
    // Tool-specific logic here
    // This could call OpenAI API, perform calculations, etc.
}

module.exports = router;
```

---

## 6. API Handler (js/api-handler.js)

```javascript
class APIHandler {
    static async callAPI(endpoint, data) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    static showLoadingSpinner(element) {
        element.innerHTML = '<div class="spinner"></div>';
    }

    static hideLoadingSpinner(element) {
        element.innerHTML = '';
    }
}
```

---

## 7. List of 20 Tools with IDs

```javascript
const TOOLS = [
    { id: 1, name: 'invoice-extraction', title: 'Invoice Extraction' },
    { id: 2, name: 'expense-categorization', title: 'Expense Categorization' },
    { id: 3, name: 'bank-reconciliation', title: 'Bank Reconciliation' },
    { id: 4, name: 'financial-summaries', title: 'Monthly Financial Summaries' },
    { id: 5, name: 'pl-statements', title: 'P&L Statements' },
    { id: 6, name: 'duplicate-detection', title: 'Duplicate Transaction Detection' },
    { id: 7, name: 'client-email-automation', title: 'Client Email Automation' },
    { id: 8, name: 'client-reports', title: 'Auto-generated Client Reports' },
    { id: 9, name: 'spreadsheet-cleaning', title: 'Spreadsheet Data Cleaning' },
    { id: 10, name: 'receipt-matching', title: 'Receipt to Transaction Matching' },
    { id: 11, name: 'payroll-summaries', title: 'Payroll Summaries' },
    { id: 12, name: 'tax-reminders', title: 'Quarterly Tax Reminders' },
    { id: 13, name: 'onboarding-packets', title: 'Client Onboarding Packets' },
    { id: 14, name: 'email-summarization', title: 'Email Summarization' },
    { id: 15, name: 'transaction-tagging', title: 'Auto-tagging Transactions' },
    { id: 16, name: 'spending-anomalies', title: 'Spending Anomaly Detection' },
    { id: 17, name: 'engagement-letters', title: 'Engagement Letter Drafting' },
    { id: 18, name: 'yearend-checklists', title: 'Year-end Checklists' },
    { id: 19, name: 'document-sorting', title: 'Auto-sorting Documents' },
    { id: 20, name: 'bookkeeping-sops', title: 'Bookkeeping SOPs Generator' }
];

module.exports = TOOLS;
```

---

## 8. Development Workflow

### For Each New Tool:

1. **Create folder structure:**
   ```bash
   mkdir -p tools/tool-X-tool-name
   ```

2. **Create the three files:**
   - `tool-name.html` (UI template)
   - `tool-name.js` (Frontend logic)
   - `tool-name.css` (Styling)

3. **Create API route:**
   - `api/routes/tool-name.js`

4. **Update main files:**
   - Add tab button to `index.html`
   - Register API route in main server file

5. **Test independently:**
   - Load the tool and verify functionality

---

## 9. Key Features to Implement

- **Tab persistence:** Save current tool to localStorage
- **Error handling:** Consistent error messages across all tools
- **Loading states:** Show spinner during processing
- **Export functionality:** CSV, JSON, or PDF export options
- **Responsive design:** Mobile-friendly layouts
- **Authentication:** Optional login for saved data (future enhancement)

---

This framework allows independent developers to build each tool without affecting others. Each tool is self-contained and can be tested, debugged, and deployed separately.