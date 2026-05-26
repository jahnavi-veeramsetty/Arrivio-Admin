import { useState, useMemo } from 'react';

import EmployeesTable from '../../components/b2b/employees/EmployeesTable';
import EmployeeDetail from '../../components/b2b/employees/EmployeeDetail';
import { b2bRoutedEmployees } from '../../mockdata/tenantsData';
import { Search } from 'lucide-react';

export default function EmployeesPage() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');

  const cities = useMemo(() => ['All', ...new Set(b2bRoutedEmployees.map((employee) => employee.city))], []);

  const filteredEmployees = useMemo(() => {
    return b2bRoutedEmployees.filter((employee) => {
      const matchSearch = employee.name.toLowerCase().includes(search.toLowerCase()) || employee.company.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || employee.status === statusFilter;
      const matchCity = cityFilter === 'All' || employee.city === cityFilter;

      return matchSearch && matchStatus && matchCity;
    });
  }, [search, statusFilter, cityFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[10px] text-[#1a6644] font-bold uppercase tracking-[0.2em] mb-1">B2B OPERATION | EMPLOYEE TRACKER</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search by name or company..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1a6644] transition-all"
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            className="flex-1 md:flex-none bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-xs py-2 px-3 focus:ring-2 focus:ring-[#1a6644] text-gray-600 dark:text-gray-300 font-bold uppercase tracking-tight"
            onChange={(event) => setCityFilter(event.target.value)}
          >
            {cities.map((city) => <option key={city} value={city}>{city === 'All' ? 'All Cities' : city}</option>)}
          </select>

          <select
            className="flex-1 md:flex-none bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-xs py-2 px-3 focus:ring-2 focus:ring-[#1a6644] text-gray-600 dark:text-gray-300 font-bold uppercase tracking-tight"
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Housing Confirmed">Housing Confirmed</option>
            <option value="Move-in Scheduled">Move-in Scheduled</option>
            <option value="Lease Active">Lease Active</option>
            <option value="Awaiting Visa Clearance">Awaiting Visa Clearance</option>
          </select>
        </div>
      </div>

      <EmployeesTable employees={filteredEmployees} onRowClick={setSelected} />

      {selected && (
        <EmployeeDetail employee={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
