import { useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Card from './ui/card';
import Input from './ui/input';

export default function DealsPage() {
  const [deals, setDeals] = useLocalStorage('deals', []);
  const [searchTerm, setSearchTerm] = useState('');
  interface SortConfig {
    key: string;
    direction: 'ascending' | 'descending';
  }
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [dealToDelete, setDealToDelete] = useState<any>(null);

  const sortedAndFilteredDeals = useMemo(() => {
    let sortableItems = [...deals];

    if (searchTerm) {
      sortableItems = sortableItems.filter(deal =>
        deal.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [deals, searchTerm, sortConfig]);

  function requestSort(key: string) {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction })
  };

  function handleDelete(id: any) {
    setDeals(deals.filter((deal: { id: any; }) => deal.id !== id));
    setDealToDelete(null); // Close modal after deletion
  };
  
  function formatCurrency(amount: number | bigint) {
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(amount);
  }

  function SortableHeader({ label, columnKey }: { label: string; columnKey: string }) {
    const isSorted = sortConfig?.key === columnKey;
    const icon = isSorted ? (sortConfig?.direction === 'ascending' ? '▲' : '▼') : '↕';
    return (
        <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer" onClick={() => requestSort(columnKey)}>
            <div className="flex items-center gap-2">
                {label}
                <span className="text-gray-400">{icon}</span>
            </div>
        </th>
    );
  };

    return (
      <Card className="w-full">
        <div className="sm:flex sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Deals</h2>
            <div className="mt-4 sm:mt-0">
                <Input
                  label=""
                  id="search"
                  type="text"
                  placeholder="Search by company..."
                  onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearchTerm(e.target.value)}
                  className="!py-1.5 text-sm text-gray-900 bg-white/60 border border-white/70 backdrop-blur rounded-md focus:outline-none focus:ring-2 focus:ring-white/80 focus:border-white/80 transition"
                />
            </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white">
            <thead className="bg-white/50">
              <tr>
                <SortableHeader label="Company Name" columnKey="companyName" />
                <SortableHeader label="Business Turnover" columnKey="businessTurnover" />
                <SortableHeader label="Loan Amount" columnKey="loanAmount" />
                <SortableHeader label="Purpose" columnKey="purpose" />
                <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Notes</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 text-gray-900 sm:pr-6">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white">
              {sortedAndFilteredDeals.length > 0 ? sortedAndFilteredDeals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-700/80 hover:text-white group transition">
                  <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900 group-hover:text-white">{deal.companyName}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-800 group-hover:text-white">{formatCurrency(deal.businessTurnover)}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-800 group-hover:text-white">{formatCurrency(deal.loanAmount)}</td>
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-800 group-hover:text-white">{deal.purpose}</td>
                  <td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate group-hover:text-white" title={deal.notes}>{deal.notes || '-'}</td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button onClick={() => setDealToDelete(deal)} className="text-red-500 hover:text-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              )) : (
                  <tr>
                      <td colSpan={6} className="text-center py-10 text-gray-400">
                          No deals found.
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
  
        {/* Delete Confirmation Modal */}
        {dealToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-gray-800 rounded-lg p-8 shadow-xl max-w-sm w-full">
                  <h3 className="text-lg font-bold text-white">Confirm Deletion</h3>
                  <p className="mt-2 text-sm text-gray-300">
                      Are you sure you want to delete the deal for <span className="font-semibold">{dealToDelete?.companyName}</span>? This action cannot be undone.
                  </p>
                  <div className="mt-6 flex justify-end space-x-4">
                      <button 
                          onClick={() => setDealToDelete(null)}
                          className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition"
                      >
                          Cancel
                      </button>
                      <button 
                          onClick={() => handleDelete(dealToDelete.id)}
                          className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
                      >
                          Delete
                      </button>
                  </div>
              </div>
          </div>
        )}
      </Card>
    )
  };