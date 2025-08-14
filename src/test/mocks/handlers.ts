import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock contact form API
  http.post('/api/send-email', async ({ request }) => {
    const body = await request.json();
    
    // Simulate validation
    if (!body || !body.name || !body.email || !body.message) {
      return HttpResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    return HttpResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  }),

  // Mock Contentful GraphQL API
  http.post('https://graphql.contentful.com/content/v1/spaces/test-space-id', () => {
    return HttpResponse.json({
      data: {
        projectsCollection: {
          items: [
            {
              sys: { id: 'test-project-1' },
              title: 'Test Project 1',
              description: 'Test description 1',
              websiteUrl: 'https://example1.com',
              image: {
                url: 'https://example.com/image1.jpg',
                title: 'Test Image 1',
              },
            },
            {
              sys: { id: 'test-project-2' },
              title: 'Test Project 2',
              description: 'Test description 2',
              websiteUrl: 'https://example2.com',
              image: {
                url: 'https://example.com/image2.jpg',
                title: 'Test Image 2',
              },
            },
          ],
        },
        stacksCollection: {
          items: [
            {
              label: 'React',
              stackUrl: 'https://reactjs.org',
              image: { url: 'https://example.com/react.png' },
            },
            {
              label: 'Next.js',
              stackUrl: 'https://nextjs.org',
              image: { url: 'https://example.com/nextjs.png' },
            },
          ],
        },
      },
    });
  }),
];