import { FactoryOption, InstanceGeneratorFunction } from '../factory/types';
import { defineFactory } from '../factory/factory-manager';
import { Factory } from '../factory/factory.interface';

describe('Factory Manager Test', () => {
  interface TestInterface {
    id: string;
    name: string;
    email: string;
  }

  it('should create a Factory instance with the correct parameters', () => {
    // Given
    const tableName = 'users';

    const instanceGenerator: InstanceGeneratorFunction<TestInterface> = () => {
      return {
        id: 'test id',
        name: 'test name',
        email: 'test@email.com',
      };
    };
    const config: FactoryOption = {
      primaryKey: {
        name: 'id',
        type: 'string',
      },
    };

    // When
    const factory = defineFactory(tableName, instanceGenerator, config);

    // Then
    expect(factory).toBeInstanceOf(Factory); // Check that factory is an instance of Factory
    expect(factory.tableName).toBe(tableName); // Check that tableName is set correctly
    expect(factory.instanceGenerator).toBe(instanceGenerator); // Check that instanceGenerator is set correctly
    expect(factory['primaryIdSet']).toBeInstanceOf(Set); // Check that primaryIdSet is a Set
  });
});
