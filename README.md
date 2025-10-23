# Professional QR Code Generator

A beautiful, feature-rich **100% client-side** QR Code Generator built with pure JavaScript. Generate QR codes from text, URLs, JSON files, and VCF contact files with a professional, mobile-responsive interface. Perfect for GitHub Pages deployment!

🔗 **[Live Demo](https://yourusername.github.io/qr-code-generator/)**

![QR Code Generator](https://img.shields.io/badge/Status-Active-success)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Ready-blue)
![Client Side](https://img.shields.io/badge/100%25%20Client%20Side-No%20Server-green)

## ✨ Features

### 🎯 Input Types
- **Text Input**: Multiline text, URLs, plain text
- **VCF Files**: Upload contact files (.vcf) to create contact QR codes
- **JSON Files**: Upload JSON files (.json) to encode structured data

### 🖼️ Output Formats
- PNG (Recommended)
- JPG/JPEG
- WEBP

### 🎨 Design Features
- Professional hero section with animations
- Fully responsive design (mobile, tablet, desktop)
- Drag & drop file upload
- Real-time character counter
- Loading animations and smooth transitions
- SEO optimized with meta tags and structured data

### 🔒 Privacy & Security
- **100% Client-Side**: All processing happens in your browser
- **No Data Sent to Server**: Your data never leaves your device
- **No Tracking**: No analytics, no cookies, no tracking
- **Open Source**: Fully transparent code

### 📱 Mobile Optimized
- Touch-friendly interface
- Responsive layouts
- Mobile file upload support
- Optimized for all screen sizes

## 🚀 Quick Start

### Option 1: Use Live Version
Simply visit the [live demo](https://yourusername.github.io/qr-code-generator/) and start generating QR codes instantly!

### Option 2: Deploy Your Own

1. **Fork this repository**
2. **Enable GitHub Pages**:
   - Go to repository Settings
   - Navigate to Pages section
   - Select source: Deploy from a branch
   - Choose branch: `main` or `master`
   - Select folder: `/ (root)`
   - Click Save
3. **Access your deployment**: 
   - Your site will be live at: `https://yourusername.github.io/qr-code-generator/`

### Option 3: Run Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/qr-code-generator.git

# Navigate to directory
cd qr-code-generator

# Open in browser (or use a local server)
# Simply open index.html in your browser
# OR use Python's built-in server:
python -m http.server 8000
# Then visit: http://localhost:8000
```

## 📁 Project Structure

```
qr-code-generator/
├── index.html          # Main HTML file
├── style.css           # Styling
├── script.js           # JavaScript functionality
├── README.md           # This file
└── LICENSE             # License file (optional)
```

## 🎯 How to Use

### Generate QR Code from Text
1. Enter your text, JSON, or URL in the textarea
2. Select your preferred output format
3. Click "Generate QR Code"
4. Download or print the generated QR code

### Generate QR Code from Files
1. Click "Upload VCF Contact" or "Upload JSON File"
2. Select your file from your device
3. Choose output format
4. Click "Generate QR Code"
5. Download or print the QR code

### VCF Contact QR Codes
Upload `.vcf` (vCard) files to create QR codes that can be scanned to add contacts directly to phones. Supports:
- Names
- Phone numbers
- Email addresses
- Physical addresses
- Organizations
- Titles, URLs, and notes

### JSON Data QR Codes
Upload `.json` files to encode structured data. Perfect for:
- Configuration data
- API payloads
- Structured information
- Application data exchange

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox/Grid
- **JavaScript (ES6+)**: Pure vanilla JavaScript
- **QR Code Library**: [qr-code-styling](https://github.com/kozakdenys/qr-code-styling)
- **Icons**: Font Awesome 6.0
- **Fonts**: Google Fonts (Inter)

### Key Features
- **No Backend Required**: Completely static, runs entirely in the browser
- **No Build Process**: No webpack, no npm, just pure files
- **GitHub Pages Ready**: Deploy instantly with zero configuration
- **Progressive Enhancement**: Works even with JavaScript disabled (graceful degradation)

### Browser Compatibility
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Customization

### Change Colors
Edit the CSS variables in `style.css`:
```css
/* Primary gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Button colors */
background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
```

### Modify QR Code Appearance
Edit the QR code styling in `script.js`:
```javascript
qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    dotsOptions: {
        color: "#000000",
        type: "rounded" // Options: square, dots, rounded, classy, etc.
    },
    backgroundOptions: {
        color: "#ffffff"
    }
});
```

### Add Custom Logo to QR Code
```javascript
qrCode = new QRCodeStyling({
    // ... other options
    image: "your-logo-url.png",
    imageOptions: {
        crossOrigin: "anonymous",
        margin: 10
    }
});
```

## 📊 SEO Optimization

The application includes:
- ✅ Meta descriptions and keywords
- ✅ Open Graph tags for social media
- ✅ Twitter Card support
- ✅ Structured data (JSON-LD)
- ✅ Semantic HTML markup
- ✅ Optimized titles and descriptions
- ✅ Mobile-friendly viewport settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Acknowledgments

- [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) - Excellent QR code library
- [Font Awesome](https://fontawesome.com/) - Beautiful icons
- [Google Fonts](https://fonts.google.com/) - Inter font family

## 📧 Contact & Support

If you have any questions or suggestions:
- Open an [issue](https://github.com/yourusername/qr-code-generator/issues)
- Submit a [pull request](https://github.com/yourusername/qr-code-generator/pulls)

## 🎉 Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ using pure JavaScript • 100% Client-Side • No Server Required**
