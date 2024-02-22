const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');

// Create directories recursively
const createDirectories = (basePath, dirs) => {
    dirs.forEach(dir => {
        const dirPath = path.join(basePath, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });
};

// Create files with basic content
const createFiles = (basePath, files) => {
    files.forEach(file => {
        const filePath = path.join(basePath, file.name);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, file.content);
        }
    });
};

// Generate the structure based on module name
const generateStructure = (moduleName) => {
    const modulePlural = pluralize.plural(moduleName);
    const basePath = path.join(__dirname, modulePlural);

    // Create base directory
    if (!fs.existsSync(basePath)) {
        fs.mkdirSync(basePath, { recursive: true });
    }

    // Define directories and files to be created
    const dirs = [
        'domain',
        'dto',
        'infrastructure/persistence/document/entities',
        'infrastructure/persistence/document/mappers',
        'infrastructure/persistence/document/repository',
    ];

    const files = [
        { name: `domain/${moduleName}.ts`, content: `// ${moduleName} domain entity\n` },
        { name: `dto/create-${moduleName}.dto.ts`, content: `// Create ${moduleName} DTO\n` },
        { name: `dto/query-${moduleName}.dto.ts`, content: `// Query ${moduleName} DTO\n` },
        { name: `dto/update-${moduleName}.dto.ts`, content: `// Update ${moduleName} DTO\n` },
        { name: `infrastructure/persistence/document/entities/${moduleName}.schema.ts`, content: `// ${moduleName} schema\n` },
        { name: `infrastructure/persistence/document/mappers/${moduleName}.mapper.ts`, content: `// ${moduleName} mapper\n` },
        { name: `infrastructure/persistence/document/repository/${moduleName}.repository.ts`, content: `// ${moduleName} repository\n` },
        { name: `${modulePlural}.controller.ts`, content: `// ${modulePlural} controller\n` },
        { name: `${modulePlural}.module.ts`, content: `// ${modulePlural} module\n` },
        { name: `${modulePlural}.service.ts`, content: `// ${modulePlural} service\n` },
        { name: `infrastructure/persistence/document/document-persistence.module.ts`, content: `// Document persistence module\n` },
        { name: `infrastructure/persistence/${moduleName}.repository.ts`, content: `// ${moduleName} abstract repository\n` },
    ];

    // Create directories
    createDirectories(basePath, dirs);

    // Create files
    createFiles(basePath, files);
};

// Main function to prompt user for module name and generate structure
const main = () => {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Enter module name (singular): ', (moduleName) => {
        const moduleNameLowerCase = moduleName.toLowerCase();
        generateStructure(moduleNameLowerCase);
        readline.close();
    });
};

main();
