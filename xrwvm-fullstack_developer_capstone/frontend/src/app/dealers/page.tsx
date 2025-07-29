// src/app/dealers/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { fetchDealers } from '@/lib/api';
import Link from 'next/link';

export default function DealersPage() {
  const [dealers, setDealers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stateFilter, setStateFilter] = useState('');

  useEffect(() => {
    fetchDealers(stateFilter || undefined).then(data => {
      setDealers(data);
      setLoading(false);
    });
  }, [stateFilter]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dealers</h1>
      
      <div className="mb-6">
        <label className="block mb-2">Filter by State:</label>
        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All States</option>
          <option value="KS">Kansas (KS)</option>
          <option value="MO">Missouri (MO)</option>
          <option value="CA">California (CA)</option>
        </select>
      </div>

      {loading ? (
        <div>Loading dealers...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealers.map((dealer) => (
            <Link 
              key={dealer.id} 
              href={`/dealers/${dealer.id}`}
              className="border p-4 rounded-lg hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold">{dealer.name}</h2>
              <p className="text-gray-600">{dealer.address}</p>
              <p className="text-gray-600">{dealer.city}, {dealer.state}</p>
              <div className="mt-2">
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {dealer.reviews.length} reviews
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}