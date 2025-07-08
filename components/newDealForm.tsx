import { useState, useEffect, type SetStateAction } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { searchCompanies } from '../api/companiesHouse';
import Card from './ui/card';
import Input from './ui/input';
import Select from './ui/select';
import TextArea from './ui/textArea';
import Button from './ui/button';

interface NewDealFormProps {
  onDealAdded: () => void;
}

export default function NewDealForm({ onDealAdded }: NewDealFormProps) {
  const [companyName, setCompanyName] = useState('');
  const [companySuggestions, setCompanySuggestions] = useState<CompanySuggestion[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [businessTurnover, setBusinessTurnover] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [purpose, setPurpose] = useState<string>('Cash Flow Boost');
  const [notes, setNotes] = useState('');
  
  const [deals, setDeals] = useLocalStorage('deals', []);

  useEffect(() => {
    if (companyName.length < 3) {
      setCompanySuggestions([]);
      setIsSuggestionsVisible(false);
      return;
    }

    const handler = setTimeout(() => {
      searchCompanies(companyName).then(results => {
        setCompanySuggestions(results);
        setIsSuggestionsVisible(true);
      });
    }, 500); // Debounce API call

    return () => clearTimeout(handler);
  }, [companyName]);

interface CompanySuggestion {
    company_number: string;
    company_name: string;
    address_snippet: string;
}

function handleSelectCompany(company: CompanySuggestion): void {
    setCompanyName(company.company_name);
    setCompanySuggestions([]);
    setIsSuggestionsVisible(false);
};

  function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();
    if (!companyName || !businessTurnover || !loanAmount) {
        alert("Please fill in all required fields.");
        return;
    }
    const newDeal = {
      id: crypto.randomUUID(),
      companyName,
      businessTurnover: parseFloat(businessTurnover),
      fundingType: 'Loans',
      purpose,
      loanAmount: parseFloat(loanAmount),
      notes,
      createdAt: new Date().toISOString(),
    };
    setDeals([...deals, newDeal]);
    
    // Reset form
    setCompanyName('');
    setBusinessTurnover('');
    setLoanAmount('');
    setPurpose('Cash Flow Boost');
    setNotes('');

    onDealAdded();
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">New Deal</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Input
            label="Company Name"
            id="companyName"
            type="text"
            value={companyName}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setCompanyName(e.target.value)}
            placeholder="Start typing a company name..."
            required
            autoComplete="off"
          />
          {isSuggestionsVisible && companySuggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-gray-700 border border-gray-600 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
              {companySuggestions.map((company) => (
                <li
                  key={company.company_number}
                  className="px-4 py-2 text-white hover:bg-gray-600 cursor-pointer"
                  onClick={() => handleSelectCompany(company)}
                >
                  <p className="font-semibold">{company.company_name}</p>
                  <p className="text-sm text-gray-400">{company.address_snippet}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Input
          label="Business Turnover (£)"
          id="businessTurnover"
          type="number"
          value={businessTurnover}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setBusinessTurnover(e.target.value)}
          placeholder="e.g., 500000"
          required
        />
        
        <Input
          label="Funding Type"
          id="fundingType"
          type="text"
          value="Loans"
          disabled
          readOnly
        />

        <Select
          label="Purpose"
          id="purpose"
          value={purpose}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPurpose(e.target.value)}
        >
          <option>Cash Flow Boost</option>
          <option>New Equipment</option>
          <option>Expansion</option>
          <option>Refinance</option>
          <option>Other</option>
        </Select>

        <Input
          label="Loan Amount (£)"
          id="loanAmount"
          type="number"
          value={loanAmount}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setLoanAmount(e.target.value)}
          placeholder="e.g., 50000"
          required
        />

        <TextArea
          label="Notes"
          id="notes"
          value={notes}
          onChange={(e: { target: { value: SetStateAction<string>; }; }) => setNotes(e.target.value)}
          placeholder="Add any relevant notes here..."
        />

        <Button type="submit">Submit Deal</Button>
      </form>
    </Card>
  );
};