import gql from 'graphql-tag';

export const typeDefs = `
  enum IssueType {
    BUG
    FEAT
    STORY
    EPIC
  }

  type Issue {
    id: String!
    name: String!
    type: IssueType!
    description: String
  }

  type Mutation {
    addIssue(
      name: String!,
      type: IssueType!,
      description: String
    ): Issue
    updateIssue(
      id: String!,
      name: String,
      type: IssueType,
      description: String
    ): Issue
  }

  type Sort {
    field: String!
    asc: Boolean!
  }

  type Query {
    sort: Sort
    issues: [Issue]
    issue(id: String!): Issue
  }
`;

export const GET_ISSUES = gql`{
    issues @client {
      id
      name
      type
      description
    }
  }
`;

export const GET_ISSUE = gql`
  query GetIssue($id: String!) {
    issue(id: $id) @client {
      id
      name
      type
      description
    }
  }
`;
