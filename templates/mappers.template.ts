import { {{ModuleName}} } from '../../../../domain/{{moduleName}}';
import { {{ModuleName}}Schema } from '../entities/{{moduleName}}.schema';

export class {{ModuleName}}Mapper {
  static toDomain(raw: {{ModuleName}}Schema): {{ModuleName}} {
    const {{moduleName}} = new {{ModuleName}}();
    {{moduleName}}.id = raw._id.toString();
    // Add more mappings as needed
    return {{moduleName}};
  }

  static toPersistence({{moduleName}}: {{ModuleName}}): any {
    return {
      // Add mappings from domain to persistence
    };
  }
}
