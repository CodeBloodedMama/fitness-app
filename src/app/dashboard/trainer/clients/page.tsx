// src/app/dashboard/trainer/clients/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { FitnessAPI } from '@/lib/api/fitness-api';
import { Client } from '@/lib/types';
import Link from 'next/link';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClients() {
      try {
        const data = await FitnessAPI.getClients();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchClients();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-gray-500">Loading clients...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">My Clients</h1>
      </div>

      {clients.length === 0 ? (
        <div className="bg-white rounded-lg p-6 text-center text-gray-500">
          No clients assigned yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div
              key={client.userId}
              className="bg-white rounded-lg shadow p-6 space-y-4"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {client.firstName} {client.lastName}
                </h3>
                <p className="text-sm text-gray-500">{client.email}</p>
              </div>
              
              <div className="flex flex-col space-y-2">
                <Link
                  href={`/dashboard/trainer/programs?clientId=${client.userId}`}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  View Programs
                </Link>
                <Link
                  href={`/dashboard/trainer/programs/create?clientId=${client.userId}`}
                  className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                >
                  Create New Program
                </Link>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Active Programs</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {/* You could add a count of active programs here if you add that to your API */}
                      -
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}