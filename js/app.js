// app.js
document.addEventListener('DOMContentLoaded', function() {
    // Load saved tool from localStorage or default to the first tab
    const currentTool = localStorage.getItem('currentTool') || 'invoice-extraction';
    
    // Initialize UI with the saved tool
    initializeUI(currentTool);
});

function initializeUI(tool) {
    // Load and display the selected tool's content
    const tabContent = document.getElementById(`tab-content-${tool}`);
    if (tabContent) {
        tabContent.style.display = 'block';
        
        // Save current tool to localStorage for persistence
        localStorage.setItem('currentTool', tool);
    } else {
        console.error(`Could not find content for tool: ${tool}`);
    }
    
    // Register click event listeners for all tab buttons
    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach((tab) => {
        tab.addEventListener('click', function() {
            const currentTabContent = document.querySelector(`#tab-content-${currentTool}`);
            if (currentTabContent) {
                currentTabContent.style.display = 'none';
                
                // Save the clicked tool to localStorage for persistence
                localStorage.setItem('currentTool', this.id.split('-')[1]);
            } else {
                console.error(`Could not find content for tab: ${this.id}`);
            }
            
            // Display the clicked tool's content
            const newTabContent = document.getElementById(this.id.replace('tab-button', 'tab-content'));
            if (newTabContent) {
                newTabContent.style.display = 'block';
            } else {
                console.error(`Could not find content for tab: ${this.id}`);
            }
        });
    });
    
    // Register click event listeners for all export buttons
    const exports = document.querySelectorAll('.export-button');
    exports.forEach((exportButton) => {
        exportButton.addEventListener('click', function() {
            const toolName = this.id.split('-')[1];
            
            // Call the appropriate export function based on the clicked button
            switch (toolName) {
                case 'invoice':
                    exportInvoices();
                    break;
                case 'expenses':
                    exportExpenses();
                    break;
                default:
                    console.error(`Could not find export function for tool: ${toolName}`);
            }
        });
    });
    
    // Register click event listeners for all error buttons
    const errors = document.querySelectorAll('.error-button');
    errors.forEach((errorButton) => {
        errorButton.addEventListener('click', function() {
            const toolName = this.id.split('-')[1];
            
            // Call the appropriate error handling function based on the clicked button
            switch (toolName) {
                case 'invoice':
                    handleInvoiceErrors();
                    break;
                case 'expenses':
                    handleExpenseErrors();
                    break;
                default:
                    console.error(`Could not find error handling function for tool: ${toolName}`);
            }
        });
    });
    
    // Register click event listeners for all processing buttons
    const processes = document.querySelectorAll('.process-button');
    processes.forEach((processButton) => {
        processButton.addEventListener('click', function() {
            const toolName = this.id.split('-')[1];
            
            // Call the appropriate processing function based on the clicked button
            switch (toolName) {
                case 'invoice':
                    processInvoices();
                    break;
                case 'expenses':
                    processExpenses();
                    break;
                default:
                    console.error(`Could not find processing function for tool: ${toolName}`);
            }
        });
    });
}