import { gql } from '@apollo/client';

export const FETCH_PROJETS_LIST = gql`
  query FetchList {
    projectsCollection {
      items {
        image {
          url
          title
        }
        description
        title
      }
    }
  }
`;
export interface Project {
  title: string;
  description: string;
  image: {
    url: string;
    title: string;
  };
}

export interface ProjectsCollection {
  projectsCollection: {
    items: Project[];
  };
}
