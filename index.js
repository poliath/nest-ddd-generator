#!/usr/bin/env node

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
        [`domain/${moduleName}.ts`]: 'domain.template.ts',
        [`dto/create-${moduleName}.dto.ts`]: 'create-dto.template.ts',
        [`dto/query-${moduleName}.dto.ts`]: 'query-dto.template.ts',
        [`dto/update-${moduleName}.dto.ts`]: 'update-dto.template.ts',
        [`infrastructure/persistence/document/entities/${moduleName}.schema.ts`]: 'entities.template.ts',
        [`infrastructure/persistence/document/mappers/${moduleName}.mapper.ts`]: 'mappers.template.ts',
        [`infrastructure/persistence/document/repository/${moduleName}.repository.ts`]: 'repository.template.ts',
        [`${pluralize.plural(moduleName)}.controller.ts`]: 'controller.template.ts',
        [`${pluralize.plural(moduleName)}.module.ts`]: 'module.template.ts',
        [`${pluralize.plural(moduleName)}.service.ts`]: 'service.template.ts',
        [`infrastructure/persistence/document/document-persistence.module.ts`]: 'document-persistence.module.template.ts',
        [`infrastructure/persistence/${moduleName}.repository.ts`]: 'abstract-repository.template.ts',
    };

    const templateFile = Object.keys(templateMap).find(key => filePath.endsWith(key));
    if (templateFile) {
        const templatePath = path.join(__dirname, 'templates', templateMap[templateFile]);
        let templateContent = fs.readFileSync(templatePath, 'utf8');
        templateContent = templateContent.replace(/\{\{ModuleName\}\}/g, capitalizeFirstLetter(moduleName))
            .replace(/\{\{moduleName\}\}/g, moduleName)
            .replace(/\{\{moduleNamePlural\}\}/g, pluralize.plural(moduleName));
        return templateContent;
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

// Generate the structure based on module name and target directory
const generateStructure = (targetDirectory, moduleName, fillWithDummyContent) => {
    const modulePlural = pluralize.plural(moduleName);
    const basePath = path.join(targetDirectory, modulePlural); // Use the target directory

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

// Main function to prompt user for module name and target directory, then generate structure
const main = () => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Enter target directory (e.g., src/modules): ', (targetDirectory) => {
        readline.question('Enter module name (singular): ', (moduleName) => {
            const moduleNameLowerCase = moduleName.toLowerCase();
            readline.question('Fill files with dummy content? (Y/n): ', (answer) => {
                const fillWithDummyContent = answer.toLowerCase() === 'y';
                generateStructure(targetDirectory, moduleNameLowerCase, fillWithDummyContent);
                readline.close();
            });
        });
    });
};

main();
