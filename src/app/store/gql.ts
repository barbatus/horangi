import gql from 'graphql-tag';

export const typeDefs = `
  enum IssueType {
    BUG
    FEAT
    STORY
    EPIC
  }

  enum Status {
    OPEN
    CLOSE
  }

  type Issue {
    id: String!
    name: String!
    type: IssueType!
    status: Status!
    description: String
  }

  type Mutation {
    add(
      name: String!,
      type: IssueType!,
      description: String
    ): Issue
    update(
      id: String!,
      name: String!,
      type: IssueType!,
      status: Status!,
      description: String
    ): Issue
    delete(id: String!)
  }

  type OrderBy {
    field: String!
    dir: Integer!
  }

  type Query {
    issues: [Issue]
    issues(orderBy: OrderBy!): [Issue]
    issue(id: String!): Issue
  }
`;

export const GET_ISSUES = gql`{
    issues @client {
      id
      name
      type
      status
      description
    }
  }
`;

export const GET_ISSUES_ORDER_BY = gql`
  query GetIssues($orderBy: OrderBy!) {
    issues(orderBy: $orderBy) @client {
      id
      name
      type
      status
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
      status
      description
    }
  }
`;

export const UPDATE_ISSUE = gql`
  mutation UpdateIssue(
    $id: String!,
    $name: String!,
    $status: Status!,
    $type: IssueType!,
    $description: String
  ) {
    update(
      id: $id,
      name: $name,
      status: $status,
      type: $type,
      description: $description,
    ) @client {
      id
    }
  }
`;

export const ADD_ISSUE = gql`
  mutation AddIssue(
    $name: String!,
    $type: IssueType!,
    $description: String
  ) {
    add(
      name: $name,
      type: $type,
      description: $description,
    ) @client {
      id
    }
  }
`;

export const DELETE_ISSUE = gql`
  mutation DeleteIssue($id: String!) {
    delete(id: $id) @client {
      id
    }
  }
`;
