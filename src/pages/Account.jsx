import ProfilePanel from '../components/account/ProfilePanel';
import AccessSections from '../components/account/AccessSections';

export default function Account() {
  return (
    <div className="p-6 flex gap-6 items-start max-w-5xl mx-auto">
      <ProfilePanel />
      <AccessSections />
    </div>
  );
}
