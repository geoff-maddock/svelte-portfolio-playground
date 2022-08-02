import { gql } from 'graphql-request'

export const authorsQuery = gql`
query GetAuthors {
  authors {
    name
    intro
    bio
    slug
    picture {
      url
    }
  }
}
`

export const projectsQuery = gql`
query GetProjects {
  projects {
    name
    slug
    description
    demo
    sourceCode
    image {
      url
    }
  }
}
`