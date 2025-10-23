// QR Code Generator - Client-Side JavaScript for GitHub Pages
let qrCode = null;
let currentFormat = 'png';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('qrForm');
    const textInput = document.getElementById('text_input');
    const vcfFile = document.getElementById('vcf_file');
    const jsonFile = document.getElementById('json_file');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const resultsSection = document.getElementById('resultsSection');
    const errorSection = document.getElementById('errorSection');
    const qrDisplay = document.getElementById('qrDisplay');
    const charCount = document.getElementById('charCount');
    const vcfInfo = document.getElementById('vcf_info');
    const jsonInfo = document.getElementById('json_info');
    const inputTypeBadge = document.getElementById('inputTypeBadge');
    const formatSelect = document.getElementById('format');

    // Initialize QR Code object
    qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: "canvas",
        data: "",
        image: "",
        dotsOptions: {
            color: "#000000",
            type: "rounded"
        },
        backgroundOptions: {
            color: "#ffffff"
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 10
        }
    });

    // Character counter for textarea
    textInput.addEventListener('input', function() {
        const count = this.value.length;
        charCount.textContent = count;

        // Clear file selections when typing
        if (count > 0) {
            clearFileInputs();
        }
    });

    // File input handlers
    vcfFile.addEventListener('change', function() {
        handleFileSelection(this, vcfInfo, 'VCF Contact File');
        if (this.files.length > 0) {
            clearTextInput();
            clearOtherFile(jsonFile, jsonInfo);
        }
    });

    jsonFile.addEventListener('change', function() {
        handleFileSelection(this, jsonInfo, 'JSON Data File');
        if (this.files.length > 0) {
            clearTextInput();
            clearOtherFile(vcfFile, vcfInfo);
        }
    });

    function handleFileSelection(input, infoElement, fileType) {
        if (input.files.length > 0) {
            const file = input.files[0];
            const fileName = file.name;
            const fileSize = (file.size / 1024).toFixed(1) + ' KB';

            infoElement.innerHTML = `
                <i class="fas fa-check-circle" style="color: #059669;"></i>
                <strong>${fileName}</strong> (${fileSize})
            `;
            infoElement.classList.add('has-file');

            hideError();
        } else {
            infoElement.innerHTML = '';
            infoElement.classList.remove('has-file');
        }
    }

    function clearFileInputs() {
        vcfFile.value = '';
        jsonFile.value = '';
        vcfInfo.innerHTML = '';
        jsonInfo.innerHTML = '';
        vcfInfo.classList.remove('has-file');
        jsonInfo.classList.remove('has-file');
    }

    function clearTextInput() {
        if (textInput.value.trim()) {
            textInput.value = '';
            charCount.textContent = '0';
        }
    }

    function clearOtherFile(otherInput, otherInfo) {
        otherInput.value = '';
        otherInfo.innerHTML = '';
        otherInfo.classList.remove('has-file');
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validation
        const hasText = textInput.value.trim().length > 0;
        const hasVcfFile = vcfFile.files.length > 0;
        const hasJsonFile = jsonFile.files.length > 0;

        if (!hasText && !hasVcfFile && !hasJsonFile) {
            showError('Please provide text input or upload a file (VCF or JSON).');
            return;
        }

        // Get selected format
        currentFormat = formatSelect.value;

        // Process input
        if (hasVcfFile) {
            processFile(vcfFile.files[0], 'VCF Contact');
        } else if (hasJsonFile) {
            processFile(jsonFile.files[0], 'JSON Data');
        } else {
            generateQRCode(textInput.value.trim(), 'Text/URL');
        }
    });

    function processFile(file, inputType) {
        showLoading(true);
        hideError();
        hideResults();

        const reader = new FileReader();

        reader.onload = function(e) {
            const content = e.target.result;

            // Validate JSON if it's a JSON file
            if (inputType === 'JSON Data') {
                try {
                    JSON.parse(content);
                } catch (error) {
                    showLoading(false);
                    showError('Invalid JSON file. Please check the file format.');
                    return;
                }
            }

            generateQRCode(content, inputType);
        };

        reader.onerror = function() {
            showLoading(false);
            showError('Error reading file. Please try again.');
        };

        reader.readAsText(file);
    }

    function generateQRCode(data, inputType) {
        showLoading(true);
        hideError();
        hideResults();

        try {
            // Update QR code data
            qrCode.update({
                data: data
            });

            // Clear previous QR code display
            qrDisplay.innerHTML = '';

            // Append QR code to display
            qrCode.append(qrDisplay);

            // Update input type badge
            inputTypeBadge.textContent = inputType;

            // Show results
            showLoading(false);
            showResults();

        } catch (error) {
            showLoading(false);
            console.error('Error generating QR code:', error);
            showError('Error generating QR code. Please try again with different input.');
        }
    }

    // Download functionality
    downloadBtn.addEventListener('click', function() {
        if (!qrCode) {
            showError('No QR code to download. Please generate a QR code first.');
            return;
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0] + '_' + 
                         new Date().toTimeString().split(' ')[0].replace(/:/g, '-');
        const filename = `qrcode_${timestamp}.${currentFormat}`;

        qrCode.download({
            name: filename.replace(`.${currentFormat}`, ''),
            extension: currentFormat
        });
    });

    function showLoading(isLoading) {
        const btnText = generateBtn.querySelector('span');
        const spinner = generateBtn.querySelector('.loading-spinner');

        if (isLoading) {
            generateBtn.disabled = true;
            btnText.style.display = 'none';
            spinner.style.display = 'block';
        } else {
            generateBtn.disabled = false;
            btnText.style.display = 'block';
            spinner.style.display = 'none';
        }
    }

    function showResults() {
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function hideResults() {
        resultsSection.style.display = 'none';
    }

    function showError(message) {
        const errorText = document.getElementById('errorText');
        errorText.textContent = message;
        errorSection.style.display = 'block';
        errorSection.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Auto-hide error after 5 seconds
        setTimeout(() => {
            hideError();
        }, 5000);
    }

    function hideError() {
        errorSection.style.display = 'none';
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to generate QR code
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (!generateBtn.disabled) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });

    // Auto-resize textarea
    textInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.max(150, this.scrollHeight) + 'px';
    });

    // Smooth scroll for hero features
    document.querySelectorAll('.hero-features .feature-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelector('.main-container').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    });

    // Enhanced drag and drop functionality
    const fileUploadLabels = document.querySelectorAll('.file-upload-label');

    fileUploadLabels.forEach(label => {
        const input = label.querySelector('input[type="file"]');

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            label.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            label.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            label.addEventListener(eventName, unhighlight, false);
        });

        function highlight() {
            label.style.borderColor = '#6366f1';
            label.style.backgroundColor = '#f0f4ff';
            label.style.transform = 'scale(1.02)';
        }

        function unhighlight() {
            label.style.borderColor = '';
            label.style.backgroundColor = '';
            label.style.transform = '';
        }

        label.addEventListener('drop', function(e) {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                const expectedExt = input.accept;

                if (file.name.toLowerCase().endsWith(expectedExt)) {
                    input.files = files;
                    input.dispatchEvent(new Event('change'));
                } else {
                    showError(`Please select a ${expectedExt.toUpperCase()} file.`);
                }
            }
        });
    });

    // Print QR code functionality
    function printQRCode() {
        if (!qrCode) {
            showError('No QR code to print. Please generate a QR code first.');
            return;
        }

        const canvas = qrDisplay.querySelector('canvas');
        if (canvas) {
            const dataUrl = canvas.toDataURL();
            const printWindow = window.open('', '', 'width=600,height=600');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>QR Code</title>
                        <style>
                            body { 
                                display: flex; 
                                justify-content: center; 
                                align-items: center; 
                                min-height: 100vh; 
                                margin: 0;
                                font-family: Arial, sans-serif;
                            }
                            .print-container {
                                text-align: center;
                            }
                            img { 
                                max-width: 400px; 
                                border: 2px solid #333;
                                border-radius: 8px;
                            }
                            h2 {
                                margin-bottom: 20px;
                                color: #333;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="print-container">
                            <h2>Generated QR Code</h2>
                            <img src="${dataUrl}" alt="QR Code" />
                        </div>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    }

    // Add print button to results section
    const resultsHeader = document.querySelector('.result-header');
    if (resultsHeader) {
        const printBtn = document.createElement('button');
        printBtn.innerHTML = '<i class="fas fa-print"></i> Print';
        printBtn.className = 'print-btn';
        printBtn.style.cssText = `
            background: #6b7280;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.9rem;
            cursor: pointer;
            margin-left: 1rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        `;
        printBtn.addEventListener('click', printQRCode);

        // Initially hide print button
        printBtn.style.display = 'none';

        // Show print button when QR is generated
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'style') {
                    if (resultsSection.style.display === 'block') {
                        printBtn.style.display = 'inline-flex';
                    } else {
                        printBtn.style.display = 'none';
                    }
                }
            });
        });

        observer.observe(resultsSection, { attributes: true });
        resultsHeader.appendChild(printBtn);
    }

    // Format input data display
    function formatDataPreview(data, maxLength = 100) {
        if (data.length <= maxLength) return data;
        return data.substring(0, maxLength) + '...';
    }

    // Initialize with welcome message (optional)
    console.log('%c🎉 QR Code Generator Ready!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
    console.log('%c✨ Features: Text, URLs, JSON files, VCF contacts', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c🔒 100% Client-Side - Your data stays in your browser', 'color: #059669; font-size: 14px;');
});

// Utility functions
function isValidJSON(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}

function isValidURL(str) {
    try {
        new URL(str);
        return true;
    } catch (e) {
        return false;
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}