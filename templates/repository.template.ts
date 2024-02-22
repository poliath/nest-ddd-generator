import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { {{ModuleName}} } from '../../../../domain/{{moduleName}}';
import { {{ModuleName}}Schema, {{ModuleName}}SchemaDocument } from '../entities/{{moduleName}}.schema';
import { {{ModuleName}}Mapper } from '../mappers/{{moduleName}}.mapper';

@Injectable()
export class {{ModuleName}}Repository {
  constructor(
    @InjectModel({{ModuleName}}Schema.name) private readonly model: Model<{{ModuleName}}SchemaDocument>,
  ) {}

  async create(data: {{ModuleName}}): Promise<{{ModuleName}}> {
    const created = new this.model(data);
    const doc = await created.save();
    return {{ModuleName}}Mapper.toDomain(doc);
  }

  // Implement other repository methods
}
