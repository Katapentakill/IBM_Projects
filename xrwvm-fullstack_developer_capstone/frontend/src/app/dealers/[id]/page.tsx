// src/app/dealers/[id]/page.tsx
'use client';
import { fetchDealerDetails, submitReview, analyzeSentiment } from '@/lib/api';
import { useEffect, useState } from 'react';
import ReviewForm from '../../../components/ReviewForm';

export default function DealerDetail({ params }: { params: { id: string } }) {
  const [dealer, setDealer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDealerDetails(params.id).then(data => {
      setDealer(data);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (!dealer) return <div>Dealer not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{dealer.name}</h1>
      <p className="text-gray-600 mb-6">
        {dealer.address}, {dealer.city}, {dealer.state}
      </p>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        <div className="space-y-4 mb-8">
          {dealer.reviews.map((review: any) => (
            <div key={review.id} className="border p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="text-yellow-400">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
                {review.sentiment && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    review.sentiment > 0.6 ? 'bg-green-100 text-green-800' : 
                    review.sentiment < 0.4 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {review.sentiment > 0.6 ? 'Positive' : review.sentiment < 0.4 ? 'Negative' : 'Neutral'}
                  </span>
                )}
              </div>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-sm text-gray-500 mt-2">
                By {review.userEmail} • {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        <ReviewForm dealerId={params.id} />
      </section>
    </div>
  );
}