import { FormEvent, useState } from 'react';
import { LogOut, PackagePlus, RefreshCw, ShieldCheck, Trash2 } from 'lucide-react';

type Product = { id: string; title: string; description: string; price: number; location: string; category: string; imageUrl: string; status: 'available' | 'reserved' | 'sold' | 'hidden' };
type Order = { id: string; status: 'pending' | 'paid' | 'cancelled'; customer: { name: string; email: string; phone?: string }; productIds: string[]; createdAt: string };
type ProductForm = { title: string; description: string; price: string; location: string; category: string; imageUrl: string; status: Product['status'] };

const emptyProduct: ProductForm = { title: '', description: '', price: '', location: '', category: 'Local commercial', imageUrl: '', status: 'available' };

async function parseResponse(response: Response) {
  const text = await response.text();
  if (!text.trim()) return null;
  try { return JSON.parse(text); } catch { throw new Error('Réponse serveur invalide'); }
}

async function adminFetch<T>(path: string, token: string, options?: RequestInit): Promise<T | null> {
  const response = await fetch(path, { ...options, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(options?.headers ?? {}) } });
  const data = await parseResponse(response);
  if (!response.ok) throw new Error((data as { error?: string } | null)?.error ?? 'Request failed');
  return data as T | null;
}

export default function AdminDashboard() {
  const [token, setToken] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyProduct);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true); setError('');
    try {
      const [nextProducts, nextOrders] = await Promise.all([
        adminFetch<Product[]>('/api/admin/products', token),
        adminFetch<Order[]>('/api/admin/orders', token),
      ]);
      setProducts(nextProducts ?? []); setOrders(nextOrders ?? []); setAuthenticated(true);
    } catch (err) { setError(err instanceof Error ? err.message : 'Accès refusé'); setAuthenticated(false); }
    finally { setLoading(false); }
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError('');
    try { await adminFetch('/api/admin/products', token, { method: 'POST', body: JSON.stringify({ ...form, price: Number(form.price) }) }); setForm(emptyProduct); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Impossible de créer le bien'); }
  };

  const remove = async (id: string) => {
    try { await adminFetch(`/api/admin/products?id=${encodeURIComponent(id)}`, token, { method: 'DELETE' }); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Impossible de supprimer le bien'); }
  };

  if (!authenticated) return <main className="flex min-h-screen items-center justify-center bg-brand-dark px-6 text-white"><form onSubmit={(event) => { event.preventDefault(); void load(); }} className="w-full max-w-md rounded-2xl border border-white/10 bg-[#121a29] p-8 shadow-2xl"><div className="mb-8 flex items-center gap-3"><ShieldCheck className="text-gold-400" /><div><p className="text-xs uppercase tracking-[0.25em] text-gold-400">Northline Commercial</p><h1 className="mt-1 font-display text-2xl font-bold">Accès administration</h1></div></div><label className="block text-sm text-gray-300" htmlFor="admin-token">Clé d&apos;accès Admin</label><input id="admin-token" type="password" value={token} onChange={(event) => setToken(event.target.value)} className="mt-2 w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-gold-400" autoComplete="current-password" required /><button className="mt-5 w-full rounded-lg bg-gold-400 px-4 py-3 font-bold text-brand-dark" disabled={loading}>{loading ? 'Vérification…' : 'Ouvrir le back-office'}</button>{error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}</form></main>;

  return <main className="min-h-screen bg-brand-dark px-4 py-8 text-white sm:px-8"><div className="mx-auto max-w-7xl"><header className="mb-8 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center"><div><p className="text-xs uppercase tracking-[0.25em] text-gold-400">Northline Commercial</p><h1 className="mt-2 font-display text-3xl font-bold">Back-office catalogue</h1></div><div className="flex gap-3"><button onClick={() => void load()} className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm"><RefreshCw className="h-4 w-4" /> Actualiser</button><button onClick={() => { setAuthenticated(false); setToken(''); }} className="flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm"><LogOut className="h-4 w-4" /> Quitter</button></div></header><div className="grid gap-8 lg:grid-cols-[380px_1fr]"><form onSubmit={submit} className="h-fit rounded-2xl border border-white/10 bg-[#121a29] p-6"><div className="mb-5 flex items-center gap-2"><PackagePlus className="text-gold-400" /><h2 className="font-display text-xl font-bold">Nouveau bien</h2></div><div className="flex flex-col gap-3">{([['title','Titre'],['description','Description'],['location','Localisation'],['imageUrl','URL image']] as const).map(([key, label]) => <label key={key} className="text-sm text-gray-300">{label}<input value={form[key]} onChange={(event) => setForm({ ...form, [key]: event.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-gold-400" required={key !== 'description' && key !== 'imageUrl'} /></label>)}<label className="text-sm text-gray-300">Prix<input type="number" min="0" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 outline-none focus:border-gold-400" required /></label><label className="text-sm text-gray-300">Catégorie<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#121a29] px-3 py-2"><option>Local commercial</option><option>Bureau</option><option>Entrepôt</option><option>Terrain</option></select></label><label className="text-sm text-gray-300">Statut<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as Product['status'] })} className="mt-1 w-full rounded-lg border border-white/10 bg-[#121a29] px-3 py-2"><option value="available">Disponible</option><option value="reserved">Réservé</option><option value="sold">Vendu</option><option value="hidden">Masqué</option></select></label></div><button className="mt-5 w-full rounded-lg bg-gold-400 px-4 py-3 font-bold text-brand-dark">Ajouter le bien</button></form><section className="flex flex-col gap-8"><div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#121a29] p-6"><h2 className="mb-4 font-display text-xl font-bold">Catalogue</h2><table className="w-full text-left text-sm"><thead className="text-gray-400"><tr><th className="pb-3">Bien</th><th className="pb-3">Prix</th><th className="pb-3">Statut</th><th className="pb-3">Action</th></tr></thead><tbody>{products.map((product) => <tr key={product.id} className="border-t border-white/10"><td className="py-3">{product.title}<span className="block text-xs text-gray-400">{product.location}</span></td><td className="py-3">{product.price.toLocaleString('fr-FR')} €</td><td className="py-3">{product.status}</td><td className="py-3"><button onClick={() => void remove(product.id)} aria-label={`Supprimer ${product.title}`} className="text-red-300"><Trash2 className="h-4 w-4" /></button></td></tr>)}</tbody></table>{products.length === 0 && <p className="py-4 text-sm text-gray-400">Aucun bien enregistré.</p>}</div><div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#121a29] p-6"><h2 className="mb-4 font-display text-xl font-bold">Réservations récentes</h2><table className="w-full text-left text-sm"><thead className="text-gray-400"><tr><th className="pb-3">Client</th><th className="pb-3">Biens</th><th className="pb-3">Statut</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id} className="border-t border-white/10"><td className="py-3">{order.customer.name}<span className="block text-xs text-gray-400">{order.customer.email}</span></td><td className="py-3">{order.productIds.join(', ')}</td><td className="py-3">{order.status}</td></tr>)}</tbody></table>{orders.length === 0 && <p className="py-4 text-sm text-gray-400">Aucune réservation.</p>}</div></section></div></div></main>;
}

export { adminFetch };
