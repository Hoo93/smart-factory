import { defineFactory } from '../src/index';

describe('Factory Manager Test', () => {
  interface TestInterface {
    id: string;
    name: string;
  }

  it('if already has tableName, than should occur error', () => {
    // Given
    const testCallBack = () => () => {
      return {
        id: 'TEST ID',
        name: 'TEST NAME',
      };
    };

    // When, Then
    expect(() => {
      const UserFactory = defineFactory<TestInterface>('users', testCallBack());
      const AnotherUserFactory = defineFactory<TestInterface>('users', testCallBack());
    }).toThrow(new Error(`Table name "users" already exists.`));
  });
});
