import { Injectable } from '@nestjs/common';
import { Create{{ModuleName}}Dto } from './dto/create-{{moduleName}}.dto';
import { Update{{ModuleName}}Dto } from './dto/update-{{moduleName}}.dto';

@Injectable()
export class {{ModuleName}}Service {
  create(create{{ModuleName}}Dto: Create{{ModuleName}}Dto) {
    return 'This action adds a new {{moduleName}}';
  }

  findAll() {
    return 'This action returns all {{moduleNamePlural}}';
  }

  findOne(id: number) {
    return 'This action returns a #' + id + ' {{moduleName}}';
  }

  update(id: number, update{{ModuleName}}Dto: Update{{ModuleName}}Dto) {
    return 'This action updates a #' + id + ' {{moduleName}}';
  }

  remove(id: number) {
    return 'This action removes a #' + id + ' {{moduleName}}';
  }
}
