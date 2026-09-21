import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from '../i18n';

export type PropertyStatus = 'available' | 'reserved' | 'sold';

export interface ProductFilterValues {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  availableOnly: boolean;
}

interface ProductFiltersProps {
  value: ProductFilterValues;
  categories: string[];
  resultCount: number;
  onChange: (value: ProductFilterValues) => void;
}

const initialFilters: ProductFilterValues = {
  search: '',
  category: 'Tous les biens',
  minPrice: '',
  maxPrice: '',
  availableOnly: false,
};

export { initialFilters };

export default function ProductFilters({ value, categories, resultCount, onChange }: ProductFiltersProps) {
  const { t } = useTranslation();
  const hasActiveFilters = useMemo(
    () => value.search || value.category !== initialFilters.category || value.minPrice || value.maxPrice || value.availableOnly,
    [value],
  );

  const update = (patch: Partial<ProductFilterValues>) => onChange({ ...value, ...patch });

  return (
    <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-white">
          <SlidersHorizontal className="h-4 w-4 text-gold-400" aria-hidden="true" />
          {t('filters', 'title')}
        </div>
        <span className="text-xs text-gray-500" aria-live="polite">
          {resultCount} {resultCount > 1 ? t('filters', 'many') : t('filters', 'one')}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[2fr_1.25fr_1fr_1fr]">
        <label className="relative block">
          <span className="sr-only">{t('filters', 'searchLabel')}</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
          <input
            type="search"
            value={value.search}
            onChange={(event) => update({ search: event.target.value })}
            placeholder={t('filters', 'searchPlaceholder')}
            className="h-12 w-full rounded-lg border border-white/10 bg-brand-dark pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-gold-400"
          />
        </label>

        <label>
          <span className="sr-only">{t('filters', 'category')}</span>
          <select
            value={value.category}
            onChange={(event) => update({ category: event.target.value })}
            className="h-12 w-full appearance-none rounded-lg border border-white/10 bg-brand-dark px-4 text-sm text-gray-300 outline-none transition-colors focus:border-gold-400"
          >
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </label>

        <label>
          <span className="sr-only">{t('filters', 'min')}</span>
          <input
            type="number"
            min="0"
            value={value.minPrice}
            onChange={(event) => update({ minPrice: event.target.value })}
            placeholder={t('filters', 'min')}
            className="h-12 w-full rounded-lg border border-white/10 bg-brand-dark px-4 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-gold-400"
          />
        </label>

        <label>
          <span className="sr-only">{t('filters', 'max')}</span>
          <input
            type="number"
            min="0"
            value={value.maxPrice}
            onChange={(event) => update({ maxPrice: event.target.value })}
            placeholder={t('filters', 'max')}
            className="h-12 w-full rounded-lg border border-white/10 bg-brand-dark px-4 text-sm text-white outline-none transition-colors placeholder:text-gray-600 focus:border-gold-400"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
        <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={value.availableOnly}
            onChange={(event) => update({ availableOnly: event.target.checked })}
            className="h-4 w-4 accent-gold-400"
          />
          {t('filters', 'available')}
        </label>
        {hasActiveFilters && (
          <button type="button" onClick={() => onChange(initialFilters)} className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-400 transition-colors hover:text-gold-300">
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            {t('filters', 'reset')}
          </button>
        )}
      </div>
    </div>
  );
}
