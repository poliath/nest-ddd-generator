import { {{ModuleName}} } from '../../domain/{{moduleName}}';
import { NullableType } from 'src/core/utils/types/nullable.type';
import { DeepPartial } from 'src/core/utils/types/deep-partial.type';

export abstract class {{ModuleName}}Repository {
  abstract create(data: DeepPartial<{{ModuleName}}>): Promise<{{ModuleName}}>;

  // Define other abstract methods as necessary
}
