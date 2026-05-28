import { useMemo, useState } from 'react';
import { Plus, Search, Pencil, Trash2, X, DoorOpen } from 'lucide-react';
import { mockPartners } from '../../../mockdata/b2bData';

const ROOM_TYPES = ['Single Room', 'Shared Room', 'Studio'];
const ROOM_STATUSES = ['Vacant', 'Reserved', 'Occupied'];

function generateInitialRooms(property) {
  if (property.category !== 'Community Building') return [];

  const prefix = property.id.replace('prop-', 'R').toUpperCase();
  const typeMix = ['Single Room', 'Single Room', 'Single Room', 'Single Room', 'Single Room', 'Single Room', 'Single Room', 'Shared Room', 'Studio', 'Studio'];
  const count = 30;
  const partnersInCity = mockPartners.filter((partner) => partner.city === property.city);
  const occupancyRate = (property.occupancyRate || 96) / 100;

  return Array.from({ length: count }, (_, index) => {
    const floor = Math.floor(index / 6) + 1;
    const seq = (index % 6) + 1;
    const id = `${prefix}-${floor}-${String(seq).padStart(2, '0')}`;
    const type = typeMix[index % typeMix.length];
    const roll = (index * 17) % 100;
    let status;
    if (roll < occupancyRate * 100 - 8) status = 'Occupied';
    else if (roll < occupancyRate * 100 + 4) status = 'Reserved';
    else status = 'Vacant';

    const partner = partnersInCity.length > 0
      ? partnersInCity[index % partnersInCity.length]
      : null;
    const assignedPartner = status !== 'Vacant' && partner ? partner.name : null;
    const occupiedBy = status === 'Occupied' && partner ? `${partner.name.split(' ')[0]} placement` : null;
    const lastEvent = status === 'Occupied'
      ? 'Lease active'
      : status === 'Reserved'
        ? 'Held for pipeline cohort'
        : 'Ready for assignment';
    const lastEventDate = status === 'Occupied'
      ? '2026-04-15'
      : status === 'Reserved'
        ? '2026-05-15'
        : '2026-05-20';

    return { id, type, floor, status, assignedPartner, occupiedBy, lastEvent, lastEventDate };
  });
}

function StatusPill({ status }) {
  const styles = {
    Occupied: 'bg-blue-50 text-blue-700 border-blue-100',
    Reserved: 'bg-amber-50 text-amber-700 border-amber-100',
    Vacant: 'bg-green-50 text-green-700 border-green-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${styles[status] || styles.Vacant}`}>
      {status}
    </span>
  );
}

function RoomEditor({ room, onClose, onSave, onDelete }) {
  const [draft, setDraft] = useState(room || { id: '', type: 'Single Room', floor: 1, status: 'Vacant', assignedPartner: null });
  const isNew = !room;

  return (
    <div className="fixed inset-0 z-[110] flex justify-center items-start pt-24 bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 space-y-5" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-widest">{isNew ? 'Add Room' : `Edit ${room.id}`}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Room ID</span>
            <input
              type="text"
              value={draft.id}
              onChange={(event) => setDraft({ ...draft, id: event.target.value })}
              placeholder="e.g. R001-3-04"
              disabled={!isNew}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-[#1a6644] focus:outline-none disabled:opacity-60"
            />
          </label>

          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Type</span>
            <select
              value={draft.type}
              onChange={(event) => setDraft({ ...draft, type: event.target.value })}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-[#1a6644] focus:outline-none"
            >
              {ROOM_TYPES.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>

          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Floor</span>
            <input
              type="number"
              min="1"
              value={draft.floor}
              onChange={(event) => setDraft({ ...draft, floor: Number(event.target.value) })}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-[#1a6644] focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</span>
            <select
              value={draft.status}
              onChange={(event) => setDraft({ ...draft, status: event.target.value })}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-[#1a6644] focus:outline-none"
            >
              {ROOM_STATUSES.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>

          <label className="block">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Assigned Partner</span>
            <select
              value={draft.assignedPartner || ''}
              onChange={(event) => setDraft({ ...draft, assignedPartner: event.target.value || null })}
              className="mt-1 w-full px-3 py-2 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-[#1a6644] focus:outline-none"
            >
              <option value="">— Unassigned —</option>
              {mockPartners.map((partner) => (
                <option key={partner.id} value={partner.name}>{partner.name} · {partner.type}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
          <div>
            {!isNew && (
              <button
                onClick={() => onDelete(room.id)}
                className="px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 size={12} /> Delete
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-100">
              Cancel
            </button>
            <button
              onClick={() => onSave(draft)}
              disabled={!draft.id}
              className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-[#1a6644] text-white hover:bg-[#155236] disabled:opacity-40"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RoomManagement({ property }) {
  const [rooms, setRooms] = useState(() => generateInitialRooms(property));
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editor, setEditor] = useState({ open: false, room: null });

  if (property.category !== 'Community Building') return null;

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    return rooms.filter((room) => {
      if (statusFilter !== 'All' && room.status !== statusFilter) return false;
      if (!term) return true;
      return (
        room.id.toLowerCase().includes(term) ||
        (room.assignedPartner || '').toLowerCase().includes(term) ||
        (room.occupiedBy || '').toLowerCase().includes(term) ||
        room.type.toLowerCase().includes(term)
      );
    });
  }, [rooms, search, statusFilter]);

  const counts = useMemo(() => ({
    total: rooms.length,
    occupied: rooms.filter((room) => room.status === 'Occupied').length,
    reserved: rooms.filter((room) => room.status === 'Reserved').length,
    vacant: rooms.filter((room) => room.status === 'Vacant').length,
  }), [rooms]);

  const handleSave = (draft) => {
    setRooms((previous) => {
      const exists = previous.some((room) => room.id === draft.id);
      const normalised = {
        ...draft,
        occupiedBy: draft.status === 'Occupied' ? (draft.assignedPartner ? `${draft.assignedPartner.split(' ')[0]} placement` : 'Direct B2C') : null,
        lastEvent: draft.status === 'Occupied' ? 'Lease active' : draft.status === 'Reserved' ? 'Held for pipeline cohort' : 'Ready for assignment',
        lastEventDate: '2026-05-22',
      };
      if (exists) {
        return previous.map((room) => (room.id === draft.id ? { ...room, ...normalised } : room));
      }
      return [...previous, normalised];
    });
    setEditor({ open: false, room: null });
  };

  const handleDelete = (id) => {
    setRooms((previous) => previous.filter((room) => room.id !== id));
    setEditor({ open: false, room: null });
  };

  return (
    <section className="bg-white dark:bg-gray-800 rounded-[2.5rem] border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
            <DoorOpen size={16} className="text-[#1a6644]" /> Room Management & Partner Coordination
          </h3>
          <button
            onClick={() => setEditor({ open: true, room: null })}
            className="flex items-center gap-2 px-4 py-2 bg-[#1a6644] text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#155236] transition-all"
          >
            <Plus size={14} /> Add Room
          </button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Total Rooms', value: counts.total, color: 'text-gray-800' },
            { label: 'Occupied', value: counts.occupied, color: 'text-blue-600' },
            { label: 'Reserved', value: counts.reserved, color: 'text-amber-600' },
            { label: 'Vacant', value: counts.vacant, color: 'text-green-600' },
          ].map((stat) => (
            <div key={stat.label} className="p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/30">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className={`text-lg font-black italic ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search room ID, partner, or tenant..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 text-sm focus:ring-2 focus:ring-[#1a6644] focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 text-xs font-bold uppercase tracking-widest text-gray-600 focus:ring-2 focus:ring-[#1a6644] focus:outline-none"
          >
            <option value="All">All Statuses</option>
            {ROOM_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-gray-900/50">
              <th className="px-6 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Room</th>
              <th className="px-6 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Type</th>
              <th className="px-6 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Assigned Partner</th>
              <th className="px-6 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Tenant</th>
              <th className="px-6 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest">Last Event</th>
              <th className="px-6 py-3 text-[9px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {filtered.length === 0 && (
              <tr>
                <td colSpan="7" className="px-6 py-10 text-center text-gray-400 italic">No rooms match your filter.</td>
              </tr>
            )}
            {filtered.map((room) => (
              <tr key={room.id} className="hover:bg-gray-50/40 transition-colors group">
                <td className="px-6 py-3 text-sm font-black italic text-gray-800">{room.id}</td>
                <td className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">{room.type}</td>
                <td className="px-6 py-3"><StatusPill status={room.status} /></td>
                <td className="px-6 py-3 text-xs text-gray-700">{room.assignedPartner || <span className="text-gray-300 italic">—</span>}</td>
                <td className="px-6 py-3 text-xs text-gray-500">{room.occupiedBy || <span className="text-gray-300 italic">—</span>}</td>
                <td className="px-6 py-3">
                  <p className="text-xs text-gray-700">{room.lastEvent}</p>
                  <p className="text-[10px] text-gray-400 tabular-nums">{room.lastEventDate}</p>
                </td>
                <td className="px-6 py-3 text-right">
                  <button
                    onClick={() => setEditor({ open: true, room })}
                    className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Pencil size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editor.open && (
        <RoomEditor
          room={editor.room}
          onClose={() => setEditor({ open: false, room: null })}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </section>
  );
}
