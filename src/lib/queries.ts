import { gql } from '@apollo/client';

export const FETCH_PROJETS_LIST = gql`
  query FetchList {
    projectsCollection {
      items {
        sys {
          id
        }

        image {
          url
          title
        }
        description
        title
        websiteUrl
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
export const FETCH_SINGLE_PROJECT = gql`
  query FetchProject($id: String!) {
    projects(id: $id) {
      title
      sys {
        id
      }
      websiteUrl
      description
      image {
        url
        title
      }
    }
  }
`;
export interface Project {
  title: string;
  sys: {
    id: string;
  };
  description: string;
  websiteUrl: string;
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
