import type { IncomingMessage, ServerResponse } from 'node:http';

type OrderStatus = 'pending' | 'paid' | 'cancelled';
export type AdminOrder = { id: string; status: OrderStatus; customer: { name: string; email: string; phone?: string }; productIds: string[]; createdAt: string };
const orders: AdminOrder[] = [];

export default function handler(req: IncomingMessage, res: ServerResponse) {
  const header = req.headers.authorization ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!process.env.ADMIN_SECRET || token !== process.env.ADMIN_SECRET) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Unauthorized' }));
  }
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.setHeader('Allow', 'GET');
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify(orders));
}

export { orders };
