const fs = require('fs');
const path = require('path');

// Ensure rules directory exists
const rulesDir = path.join(__dirname, '..', 'rules');
if (!fs.existsSync(rulesDir)) {
    fs.mkdirSync(rulesDir);
}

// Copy contents from .cline-rules to rules directory
const sourceDir = path.join(__dirname, '..', '.cline-rules');
if (fs.existsSync(sourceDir)) {
    fs.readdirSync(sourceDir).forEach(file => {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(rulesDir, file);
        
        if (fs.statSync(sourcePath).isDirectory()) {
            if (!fs.existsSync(targetPath)) {
                fs.mkdirSync(targetPath, { recursive: true });
            }
            
            // Copy .clinerules file
            const sourceRuleFile = path.join(sourcePath, '.clinerules');
            const targetRuleFile = path.join(targetPath, '.clinerules');
            if (fs.existsSync(sourceRuleFile)) {
                fs.copyFileSync(sourceRuleFile, targetRuleFile);
            }
        }
    });
}