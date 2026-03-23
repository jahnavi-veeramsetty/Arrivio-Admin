import { useState, useMemo } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import EmployeesTable from '../../components/b2b/employees/EmployeesTable';
import EmployeeDetail from '../../components/b2b/employees/EmployeeDetail';
import { mockEmployees } from '../../mockdata/b2bData';
import { useToast } from '../../components/ui/Toast';
import { Search } from 'lucide-react';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(mockEmployees);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  
  const { show, addToast } = useToast();

  const cities = useMemo(() => ['All', ...new Set(mockEmployees.map(e => e.city))], []);

  const filteredEmployees = useMemo(() => {
    return employees.filter(e => {
      const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.company.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || e.status === statusFilter;
      const matchCity = cityFilter === 'All' || e.city === cityFilter;
      return matchSearch && matchStatus && matchCity;
    });
  }, [employees, search, statusFilter, cityFilter]);

  const handleAction = (action) => {
    if (action === 'Assign Unit') {
      show(`Unit allocation workflow started for ${selected.name}.`, 'success');
    } else if (action === 'Update Status') {
      show(`Status update requested for ${selected.name}. Record will be updated upon validation.`, 'warn');
    }
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Employee Tracker" 
        breadcrumb="B2B Partners → Employees"
        description="Track B2B employee housing status and lease agreements."
      />

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by name or company..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#1a6644] transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-xs py-2 px-3 focus:ring-2 focus:ring-[#1a6644] text-gray-600 dark:text-gray-300 font-bold uppercase tracking-tight"
            onChange={(e) => setCityFilter(e.target.value)}
          >
            {cities.map(c => <option key={c} value={c}>{c === 'All' ? 'All Cities' : c}</option>)}
          </select>

          <select 
            className="flex-1 md:flex-none bg-gray-50 dark:bg-gray-900 border-none rounded-xl text-xs py-2 px-3 focus:ring-2 focus:ring-[#1a6644] text-gray-600 dark:text-gray-300 font-bold uppercase tracking-tight"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Awaiting Housing">Awaiting Housing</option>
            <option value="Housed">Housed</option>
            <option value="Departed">Departed</option>
          </select>
        </div>
      </div>

      <EmployeesTable 
        employees={filteredEmployees} 
        onRowClick={setSelected} 
      />

      {selected && (
        <EmployeeDetail 
          employee={selected} 
          onClose={() => setSelected(null)} 
          onAction={handleAction}
        />
      )}

    </div>
  );
}
