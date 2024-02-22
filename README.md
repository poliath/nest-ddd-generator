# Nest DDD Generator

The `nest-ddd-generator` is a CLI tool designed to accelerate the development process within NestJS applications by scaffolding Domain-Driven Design (DDD) module structures. This utility focuses on automating the creation of folders and files that adhere to DDD principles, making it easier for developers to maintain a consistent architecture across NestJS projects.

## Features

- Generates folder and file structure for NestJS modules following DDD principles.
- Offers customizable templates for domain, DTOs, entities, mappers, repositories, controllers, services, and more.
- Supports interactive prompts to set target directory, module name, and choose between filling files with boilerplate code or leaving them empty.
- Designed to speed up development in NestJS projects by providing a foundational DDD structure.

## Generated Structure Overview

The `nest-ddd-generator` scaffolds your NestJS module with a structure that supports Domain-Driven Design (DDD) principles. Here is the directory and file structure for a module named `users`:

```
users/
├── domain/
│   └── user.ts
├── dto/
│   ├── create-user.dto.ts
│   ├── query-user.dto.ts
│   └── update-user.dto.ts
├── infrastructure/
│   └── persistence/
│       ├── document/
│       │   ├── entities/
│       │   │   └── user.schema.ts
│       │   ├── mappers/
│       │   │   └── user.mapper.ts
│       │   ├── repositories/
│       │   │   └── user.repository.ts
│       │   └── document-persistence.module.ts
│       └── user.repository.ts
├── users.controller.ts
├── users.module.ts
└── users.service.ts
```

### Structure Description

- **`/domain`**: Contains domain models and business logic that are core to the application.
- **`/dto`**: Data Transfer Objects (DTOs) define how data is sent over the network, enabling validation and documentation.
- **`/infrastructure/persistence`**: Implements the persistence layer, separating the domain model from data mapping and database management.
    - **`/document`**: Specific to document databases (e.g., MongoDB), including entities, mappers, and repositories for database interactions.
- **`users.controller.ts`**: Handles incoming requests, invoking services with validated data.
- **`users.module.ts`**: Groups the module components, making the `users` module self-contained and organized.
- **`users.service.ts`**: Contains service logic, acting as the intermediary between the controller and data access layers.

This structure is designed to streamline the development of scalable and maintainable applications by following DDD principles within the NestJS framework.

## Installation

This package should be installed globally to ensure it can be run from anywhere in your system:

```bash
npm install -g nest-ddd-generator
```

## Usage

Once installed, you can invoke the generator using the following command:

```bash
nest-ddd-gen
```

You will be prompted to provide:

1. **Target Directory**: The directory relative to your project root where the new module should be created (e.g., `src/modules`).
2. **Module Name**: The name of the module you wish to generate. This should be in singular form (e.g., `user`).
3. **Boilerplate Code**: Choose whether to fill the generated files with example boilerplate code or leave them empty.

### Example

```plaintext
Enter target directory (e.g., src/modules): src/modules
Enter module name (singular): user
Fill files with dummy content? (Y/n): Y
```

This will generate a `user` module under `src/modules/user` with predefined file structures and optional boilerplate content.

## Templates

The provided templates are examples to illustrate the principle of usage and may contain errors. Users are encouraged to customize these templates to fit their project's needs and conventions.

## Collaboration

We are actively seeking collaborators to enhance this package and extend its capabilities. If you're interested in contributing or have suggestions for improvement, please reach out to [igolubic on GitHub](https://github.com/igolubic).

## License

This project is licensed under the MIT License.