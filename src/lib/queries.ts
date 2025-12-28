import { gql } from "@apollo/client";
import { Document } from "@contentful/rich-text-types";

export const FETCH_PROJECT_LISTS = gql`
  query FetchList($limit: Int!, $skip: Int!) {
    projectsCollection(limit: $limit, skip: $skip) {
      total
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
export const FETCH_BLOG_LIST = gql`
  query FetchBlogs {
    blogsCollection(limit: 10) {
      items {
        blogTitle
        sys {
          id
          firstPublishedAt
          publishedAt
        }
        description {
          json
          links {
            assets {
              hyperlink {
                url
              }
              block {
                url
              }
            }
          }
        }
        teaserIntro
        image1 {
          url
          title
        }
        image2 {
          url
          title
        }
        image3 {
          url
          title
        }
        coverImage {
          url
          title
          width
          height
        }
      }
    }
  }
`;
export const FETCH_SINGLE_BLOG = gql`
  query FetchSingleBlog($id: String!) {
    blogs(id: $id) {
      blogTitle
      sys {
        firstPublishedAt
        publishedAt
      }
      coverImage {
        url
        width
        height
      }
      description {
        json
        links {
          assets {
            block {
              sys {
                id
              }
              url
              title
              width
              height
            }
          }
        }
      }
      image1 {
        url
      }
    }
  }
`;

export interface Blog {
  blogTitle: string;
  sys: {
    id: string;
    firstPublishedAt: Date;
    publishedAt: Date;
  };
  teaserIntro: string;
  description: {
    json: Document;
    links: {
      assets: {
        block: {
          sys: {
            id: string;
          };
          url: string;
          title: string;
          width: number;
          height: number;
        }[];
      };
    };
  };
  image1: {
    url: string;
    title: string;
  };
  image2: {
    url: string;
    title: string;
  };
  image3: {
    url: string;
    title: string;
  };
  coverImage: {
    url: string;
    title: string;
    width: number;
    height: number;
  };
}
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
    total: number;
    items: Project[];
  };
}
export interface BlogsCollection {
  blogsCollection: {
    items: Blog[];
  };
}
