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

export const FETCH_TECH_STACKS = gql`
  query getTechStack {
    stacksCollection {
      items {
        label
        stackUrl
        image {
          url
        }
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

export interface TechStack {
  label: string;
  stackUrl: string;
  image: {
    url: string;
  };
}
export interface StacksCollection {
  stacksCollection: {
    items: TechStack[];
  };
}
export interface ProjectsCollection {
  projectsCollection: {
    items: Project[];
  };
}
