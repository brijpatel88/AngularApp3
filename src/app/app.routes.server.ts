import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'books',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'books/add',
    renderMode: RenderMode.Prerender
  },

  // Dynamic routes should NOT be prerendered unless you provide ids
  {
    path: 'books/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'books/update/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'books/delete/:id',
    renderMode: RenderMode.Client
  }
];