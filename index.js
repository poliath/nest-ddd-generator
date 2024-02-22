const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Adjusted function to get template content, now directly mapping file types to template files
const getTemplateContent = (filePath, moduleName) => {
    // Mapping of file paths to template names
    const templateMap = {
        [`domain/${moduleName}.ts`]: 'domain.template.js',
        [`dto/create-${moduleName}.dto.ts`]: 'create-dto.template.js',
        [`dto/query-${moduleName}.dto.ts`]: 'query-dto.template.js',
        [`dto/update-${moduleName}.dto.ts`]: 'update-dto.template.js',
        [`infrastructure/persistence/document/entities/${moduleName}.schema.ts`]: 'entities.template.js',
        [`infrastructure/persistence/document/mappers/${moduleName}.mapper.ts`]: 'mappers.template.js',
        [`infrastructure/persistence/document/repository/${moduleName}.repository.ts`]: 'repository.template.js',
        [`${pluralize.plural(moduleName)}.controller.ts`]: 'controller.template.js',
        [`${pluralize.plural(moduleName)}.module.ts`]: 'module.template.js',
        [`${pluralize.plural(moduleName)}.service.ts`]: 'service.template.js',
        [`infrastructure/persistence/document/document-persistence.module.ts`]: 'document-persistence.module.template.js',
        [`infrastructure/persistence/${moduleName}.repository.ts`]: 'abstract-repository.template.js',
    };

    // Find the template file name based on the current file being processed
    const templateFile = Object.keys(templateMap).find(key => filePath.endsWith(key));
    if (templateFile) {
        const templatePath = path.join(__dirname, 'templates', templateMap[templateFile]);
        const templateContent = fs.readFileSync(templatePath, 'utf8');
        return templateContent.replace(/\{\{ModuleName\}\}/g, capitalizeFirstLetter(moduleName))
            .replace(/\{\{moduleName\}\}/g, moduleName);
    }
    return '// Template not found\n';
};

// Create directories recursively
const createDirectories = (basePath, dirs) => {
    dirs.forEach(dir => {
        const dirPath = path.join(basePath, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });
};

// Create files with template content
const createFiles = (basePath, files, moduleName, fillWithDummyContent) => {
    files.forEach(file => {
        const filePath = path.join(basePath, file);
        if (!fs.existsSync(filePath) && fillWithDummyContent) {
            const content = getTemplateContent(filePath, moduleName);
            fs.writeFileSync(filePath, content);
        } else if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '// Replace with your own content\n');
        }
    });
};

// Generate the structure based on module name
const generateStructure = (moduleName, fillWithDummyContent) => {
    const modulePlural = pluralize.plural(moduleName);
    const basePath = path.join(__dirname, modulePlural);

    // Define directories and files to be created
    const dirs = [
        'domain',
        'dto',
        'infrastructure/persistence/document/entities',
        'infrastructure/persistence/document/mappers',
        'infrastructure/persistence/document/repository',
    ];

    const files = [
        `domain/${moduleName}.ts`,
        `dto/create-${moduleName}.dto.ts`,
        `dto/query-${moduleName}.dto.ts`,
        `dto/update-${moduleName}.dto.ts`,
        `infrastructure/persistence/document/entities/${moduleName}.schema.ts`,
        `infrastructure/persistence/document/mappers/${moduleName}.mapper.ts`,
        `infrastructure/persistence/document/repository/${moduleName}.repository.ts`,
        `${modulePlural}.controller.ts`,
        `${modulePlural}.module.ts`,
        `${modulePlural}.service.ts`,
        `infrastructure/persistence/document/document-persistence.module.ts`,
        `infrastructure/persistence/${moduleName}.repository.ts`,
    ];

    // Create directories and files
    createDirectories(basePath, dirs);
    createFiles(basePath, files, moduleName, fillWithDummyContent);
};

// Main function to prompt user for module name and generate structure
const main = () => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Enter module name (singular): ', (moduleName) => {
        const moduleNameLowerCase = moduleName.toLowerCase();
        readline.question('Fill files with dummy content? (Y/n): ', (answer) => {
            const fillWithDummyContent = answer.toLowerCase() === 'y';
            generateStructure(moduleNameLowerCase, fillWithDummyContent);
            readline.close();
        });
    });
};

main();
