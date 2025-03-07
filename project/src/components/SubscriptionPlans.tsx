import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    id: 'mobile',
    name: 'Mobile',
    price: 4.99,
    features: [
      'Watch on mobile phone and tablet',
      'One device at a time',
      'Unlimited movies and TV shows',
      'Cancel anytime',
    ],
    quality: 'Good',
    resolution: '480p',
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 9.99,
    features: [
      'Watch on all devices',
      'Two devices at a time',
      'HD available',
      'Unlimited movies and TV shows',
      'Cancel anytime',
    ],
    quality: 'Better',
    resolution: '1080p',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 14.99,
    features: [
      'Watch on all devices',
      'Four devices at a time',
      'HD + Ultra HD available',
      'Unlimited movies and TV shows',
      'Cancel anytime',
      'Offline downloads',
    ],
    quality: 'Best',
    resolution: '4K + HDR',
  },
];

export function SubscriptionPlans() {
  return (
    <div className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Choose Your Plan</h2>
          <p className="mt-4 text-xl text-gray-300">
            No contracts. No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                <p className="mt-4 text-gray-300">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400">/month</span>
                </p>
                <div className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-blue-500" />
                      <span className="ml-3 text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <span>Video quality</span>
                    <span>{plan.quality}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-gray-300">
                    <span>Resolution</span>
                    <span>{plan.resolution}</span>
                  </div>
                </div>
                <button className="mt-8 w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}