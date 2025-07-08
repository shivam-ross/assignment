const COMPANIES_HOUSE_API_KEY = "555fcdbb-5f62-457a-8c6c-95695c58876a";

export async function searchCompanies(query: string) {
  if (!query) {
    console.warn('No query provided.');
    return [];
  }

  if (!COMPANIES_HOUSE_API_KEY) {
    console.warn('Companies House API key not provided. Using mock data.');
    return [
      { company_name: `${query} Example Ltd`, company_number: '12345', address_snippet: 'Mock Address, London' },
      { company_name: `${query} Solutions PLC`, company_number: '67890', address_snippet: 'Mock Street, Manchester' },
    ];
  }

  const encodedKey = btoa(`${COMPANIES_HOUSE_API_KEY}:`);
  const encodedQuery = encodeURIComponent(query);

  try {
    const response = await fetch(
      `/api/companies-house/search/companies?q=${encodedQuery}&items_per_page=5`,
      {
        headers: {
          Authorization: `Basic ${encodedKey}`,
        },
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch from Companies House API: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = await response.json();
    if (!data.items) {
      console.warn('No items in API response:', data);
      return [];
    }

    return data.items.map((item: { title: any; company_number: any; address_snippet: any }) => ({
      company_name: item.title,
      company_number: item.company_number,
      address_snippet: item.address_snippet,
    }));
  } catch (error) {
    console.error('Error searching companies:', error);
    return [];
  }
}