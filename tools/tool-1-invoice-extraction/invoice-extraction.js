class InvoiceExtraction {
    constructor() {
        this.init();
    }

    init() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.getElementById('upload-btn')?.addEventListener('click', () => this.uploadFile());
        document.getElementById('process-btn')?.addEventListener('click', () => this.processData());
        document.getElementById('reset-btn')?.addEventListener('click', () => this.reset());
        document.getElementById('export-btn')?.addEventListener('click', () => this.exportResults());
    }

    uploadFile() {
        const fileInput = document.getElementById('invoice-upload');
        const file = fileInput.files[0];
        if (!file) {
            this.showError('Please select a file to upload.');
            return;
        }
        // Simulate upload and processing
        this.processData();
    }

    processData() {
        const inputData = this.getInputData();
        if (!inputData) return;
        
        APIHandler.showLoadingSpinner(document.getElementById('results'));
        
        APIHandler.callAPI('/api/invoice-extraction', inputData)
            .then(results => this.displayResults(results))
            .catch(error => this.showError(error));
    }

    getInputData() {
        const fileInput = document.getElementById('invoice-upload');
        if (!fileInput.files[0]) {
            this.showError('No file selected.');
            return null;
        }
        return { file: fileInput.files[0] };
    }

    displayResults(results) {
        APIHandler.hideLoadingSpinner(document.getElementById('results'));
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <p><strong>Invoice Number:</strong> ${results.invoiceNumber || 'N/A'}</p>
            <p><strong>Date:</strong> ${results.date || 'N/A'}</p>
            <p><strong>Amount:</strong> ${results.amount || 'N/A'}</p>
            <p><strong>Vendor:</strong> ${results.vendor || 'N/A'}</p>
        `;
    }

    reset() {
        document.getElementById('invoice-upload').value = '';
        document.getElementById('results').innerHTML = '';
    }

    exportResults() {
        const results = document.getElementById('results').innerText;
        const blob = new Blob([results], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'invoice-extraction-results.txt';
        a.click();
        URL.revokeObjectURL(url);
    }

    showError(error) {
        console.error(error);
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `<p style="color: red;">Error: ${error}</p>`;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new InvoiceExtraction();
});