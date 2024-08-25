import { defineFactory } from '../src/index';
import { FactoryManager } from '../src/manager/factory_manager';

interface UserInterface {
  id: number;
  name: string;
}

interface PostInterface {
  id: number;
  title: string;
  content: string;
  userId: number;
}

interface CommentInterface {
  id: number;
  content: string;
  postId: number;
  userId: number;
}

describe('Factory Manager Test', () => {
  it('if already has tableName, than should occur error', () => {
    // Given
    const testCallBack = () => {
      return {
        id: 1,
        name: 'TEST NAME',
      };
    };

    // When, Then
    // tableName 으로 unique 한 factory 를 생성한다.
    expect(() => {
      const UserFactory = defineFactory<UserInterface>('users', testCallBack);
      const AnotherUserFactory = defineFactory<UserInterface>('users', testCallBack);
    }).toThrow(new Error(`Table name "users" already exists.`));
  });

  describe('addRelationTest', () => {
    it('hasMany Relation create belongs to opposite', () => {
      // Given

      const UserFactory = defineFactory<UserInterface>('users', () => {
        return {
          id: 1,
          name: 'TEST NAME',
        };
      });
      const PostFactory = defineFactory<PostInterface>('posts', () => {
        return {
          id: 1,
          title: 'TEST TITLE',
          content: 'TEST CONTENT',
          userId: 1,
        };
      });

      // When
      UserFactory.hasMany('posts');

      const userRelations = FactoryManager.getInstance().getTableRelation('users');
      const postRelations = FactoryManager.getInstance().getTableRelation('posts');

      // Then
      expect(userRelations?.['has-many'].has('posts')).toBeTruthy();
      expect(postRelations?.['belongs-to'].has('users')).toBeTruthy();
    });

    it('hasOne Relation create belongs to opposite', () => {
      // Given

      const UserFactory = defineFactory<UserInterface>('users', () => {
        return {
          id: 1,
          name: 'TEST NAME',
        };
      });
      const PostFactory = defineFactory<PostInterface>('posts', () => {
        return {
          id: 1,
          title: 'TEST TITLE',
          content: 'TEST CONTENT',
          userId: 1,
        };
      });

      // When
      UserFactory.hasOne('posts');

      const userRelations = FactoryManager.getInstance().getTableRelation('users');
      const postRelations = FactoryManager.getInstance().getTableRelation('posts');

      // Then
      expect(userRelations?.['has-one'].has('posts')).toBeTruthy();
      expect(postRelations?.['belongs-to'].has('users')).toBeTruthy();
    });
  });
});
