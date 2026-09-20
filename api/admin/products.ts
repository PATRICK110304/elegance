import type { IncomingMessage, ServerResponse } from 'node:http';

export type AdminProduct = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  imageUrl: string;
  status: 'available' | 'reserved' | 'sold' | 'hidden';
  updatedAt: string;
};

const products: AdminProduct[] = [];

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function authorized(req: IncomingMessage) {
  const header = req.headers.authorization ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  return Boolean(process.env.ADMIN_SECRET) && token === process.env.ADMIN_SECRET;
}

async function body(req: IncomingMessage) {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  return JSON.parse(raw || '{}') as Partial<AdminProduct>;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!authorized(req)) return json(res, 401, { error: 'Unauthorized' });
  const url = new URL(req.url ?? '/', 'http://localhost');
  const id = url.searchParams.get('id');

  if (req.method === 'GET') return json(res, 200, products.filter((product) => product.status !== 'hidden'));
  if (req.method === 'POST' || req.method === 'PUT') {
    const input = await body(req);
    if (!input.title || !input.location || !input.category || typeof input.price !== 'number') return json(res, 400, { error: 'title, location, category and numeric price are required' });
    const now = new Date().toISOString();
    if (req.method === 'PUT') {
      const index = products.findIndex((product) => product.id === id);
      if (index < 0) return json(res, 404, { error: 'Product not found' });
      products[index] = { ...products[index], ...input, updatedAt: now } as AdminProduct;
      return json(res, 200, products[index]);
    }
    const product: AdminProduct = { id: crypto.randomUUID(), description: '', imageUrl: '', status: 'available', ...input, updatedAt: now } as AdminProduct;
    products.push(product);
    return json(res, 201, product);
  }
  if (req.method === 'DELETE') {
    const index = products.findIndex((product) => product.id === id);
    if (index < 0) return json(res, 404, { error: 'Product not found' });
    products[index] = { ...products[index], status: 'hidden', updatedAt: new Date().toISOString() };
    return json(res, 204, null);
  }
  res.setHeader('Allow', 'GET, POST, PUT, DELETE');
  return json(res, 405, { error: 'Method not allowed' });
}

export { products };

export const config = { api: { bodyParser: false } };
