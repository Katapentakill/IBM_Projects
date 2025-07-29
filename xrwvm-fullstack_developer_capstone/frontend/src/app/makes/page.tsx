// src/app/makes/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { fetchCarMakes } from '@/lib/api';

export default function CarMakesPage() {
  const [makes, setMakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCarMakes().then(data => {
      setMakes(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-center py-8">Loading car makes...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Car Makes</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {makes.map(make => (
          <div key={make.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow p-6">
            <div className="flex items-center justify-center h-20 mb-4">
              <div className="text-4xl font-bold text-gray-300">
                {make.name.charAt(0)}
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-lg mb-1">{make.name}</h3>
              <p className="text-gray-600 text-sm">{make.country}</p>
              <p className="text-xs text-gray-500 mt-2">Founded: {make.founded}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}