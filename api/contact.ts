import type { VercelRequest, VercelResponse } from '@vercel/node';

/** Simple in-memory rate limit (per serverless instance). */
const hits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const WINDOW_MS = 15 * 60 * 1000;
const MAX_MESSAGE = 2000;
const MAX_FIELD = 200;

function clientIp(req: VercelRequest): string {
  const xf = req.headers['x-forwarded-for'];
  if (typeof xf === 'string') return xf.split(',')[0].trim();
  if (Array.isArray(xf) && xf[0]) return xf[0].split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= MAX_FIELD;
}

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function truncate(str: unknown, max: number): string {
  return String(str ?? '').slice(0, max);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // No useful CORS for browsers from other origins on this form
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Try again later.' });
  }

  const body = req.body || {};
  // Honeypot: bots fill hidden field → silent success, no email
  if (body.website || body.company_url) {
    return res.status(200).json({ success: true });
  }

  const name = truncate(body.name, MAX_FIELD).trim();
  const email = truncate(body.email, MAX_FIELD).trim().toLowerCase();
  const phone = truncate(body.phone, 40).trim();
  const company = truncate(body.company, MAX_FIELD).trim();
  const interest = truncate(body.interest, MAX_FIELD).trim();
  const message = truncate(body.message, MAX_MESSAGE).trim();

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({ error: 'Unable to send message' });
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || 'patrickndri120@gmail.com';
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || 'Northline Commercial <onboarding@resend.dev>';

  const html = `
    <h2>Nouvelle demande – Northline Commercial</h2>
    <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
    <p><strong>Email :</strong> ${escapeHtml(email)}</p>
    <p><strong>Téléphone :</strong> ${escapeHtml(phone || '—')}</p>
    <p><strong>Entreprise :</strong> ${escapeHtml(company || '—')}</p>
    <p><strong>Intérêt :</strong> ${escapeHtml(interest || '—')}</p>
    <p><strong>IP :</strong> ${escapeHtml(ip)}</p>
    <p><strong>Message :</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `[Northline] ${interest || 'Contact'} – ${name}`.slice(0, 200),
        html,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error('Resend error:', response.status, errBody);
      // Never leak provider details to the client
      return res.status(502).json({ error: 'Unable to send message' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return res.status(500).json({ error: 'Unable to send message' });
  }
}
