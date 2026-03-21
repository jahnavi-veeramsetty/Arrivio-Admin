import { useLocation } from 'react-router-dom';

export default function Placeholder({ title }) {
  const location = useLocation();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="p-10 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-md w-full">
        <div className="text-5xl mb-4">🚧</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-sm text-gray-400 font-mono mt-4 bg-gray-50 px-3 py-1.5 rounded-lg">{location.pathname}</p>
        <p className="text-sm text-gray-500 mt-4">This page is under construction. Content will be added soon.</p>
      </div>
    </div>
  );
}
