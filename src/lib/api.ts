import client from '../../contentfulClient';

export interface Project {
  title: string;
  description: string;
}

export interface ProjectEntry {
  fields: {
    title: string;
    description: string;
  };
  contentTypeId: string;
}

export async function fetchProjects(): Promise<Project[]> {
  const response = await client.getEntries<ProjectEntry>({
    content_type: 'projects', // Replace with your Contentful content type ID
  });

  return response.items.map((item) => ({
    title: item.fields.title,
    description: item.fields.description,
  }));
}
