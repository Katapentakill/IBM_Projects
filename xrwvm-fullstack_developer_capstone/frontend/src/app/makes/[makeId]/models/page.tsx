// src/app/makes/[makeId]/models/page.tsx
'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchCarModels, fetchCarMakes } from '@/lib/api';

export default function CarModelsPage() {
  const { makeId } = useParams();
  const [models, setModels] = useState<any[]>([]);
  const [make, setMake] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchCarMakes().then(makes => makes.find(m => m.id === makeId)),
      fetchCarModels(makeId as string)
    ]).then(([makeData, modelsData]) => {
      setMake(makeData);
      setModels(modelsData);
      setLoading(false);
    });
  }, [makeId]);

  if (loading) return <div className="text-center py-8">Loading models...</div>;
  if (!make) return <div className="text-center py-8">Make not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{make.name} Models</h1>
      <p className="text-gray-600 mb-8">{make.country} • Founded: {make.founded}</p>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {models.map(model => (
              <tr key={model.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{model.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{model.type.toLowerCase()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}