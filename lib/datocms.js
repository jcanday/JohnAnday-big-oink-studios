import { GraphQLClient } from "graphql-request";
export function request({ query, variables, includeDrafts, excludeInvalid }) {
  const headers = {
    authorization: `Bearer 42bbee8a9d458c1bfc2f2c2e211f6e`,
  };
  if (includeDrafts) {
    headers['X-Include-Drafts'] = 'false';
  }
  if (excludeInvalid) {
    headers['X-Exclude-Invalid'] = 'true';
  }
  const client = new GraphQLClient('https://graphql.datocms.com', { headers });
  return client.request(query, variables);
}