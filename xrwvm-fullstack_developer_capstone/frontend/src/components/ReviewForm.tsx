// src/components/ReviewForm.tsx
'use client';
import { useState } from 'react';
import { submitReview, analyzeSentiment } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function ReviewForm({ dealerId }: { dealerId: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentimentScore, setSentimentScore] = useState<number | null>(null);
  const { isAuthenticated } = useAuth();

  const handleAnalyzeSentiment = async () => {
    if (comment.length < 10) return;
    const { score } = await analyzeSentiment(comment);
    setSentimentScore(score);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitReview(dealerId, { rating, comment });
      setComment('');
      setRating(5);
      setSentimentScore(null);
      alert('Review submitted successfully!');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-blue-50 p-4 rounded-lg text-blue-800">
        Please login to submit a review.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>
      
      <div className="mb-4">
        <label className="block mb-2">Rating</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Comment</label>
        <textarea
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            setSentimentScore(null);
          }}
          onBlur={handleAnalyzeSentiment}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
      </div>

      {sentimentScore !== null && (
        <div className="mb-4 flex items-center">
          <span className="mr-2">Sentiment:</span>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${
                sentimentScore > 0.6 ? 'bg-green-500' : 
                sentimentScore < 0.4 ? 'bg-red-500' : 'bg-yellow-500'
              }`} 
              style={{ width: `${sentimentScore * 100}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm">
            {sentimentScore > 0.6 ? 'Positive' : sentimentScore < 0.4 ? 'Negative' : 'Neutral'}
          </span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}