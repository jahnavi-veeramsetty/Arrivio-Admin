import React, { useState } from 'react';
import PageHeader from '../../components/layout/PageHeader';
import SearchBar from '../../components/contract/SearchBar';
import LanguageSwitch from '../../components/contract/LanguageSwitch';
import CategoryFilters from '../../components/contract/CategoryFilters';
import ContractCard from '../../components/contract/ContractCard';
import { FileSearch } from 'lucide-react';

const CONTRACTS_DATA = [
  {
    id: '01',
    categoryKey: 'framework',
    enName: 'Cooperation Agreement',
    deName: 'Kooperationsvertrag',
    enDesc: 'B2B framework agreement governing the cooperation, contingent reservations, and accommodation management services.',
    deDesc: 'B2B-Rahmenvereinbarung über die Zusammenarbeit, Kontingentreservierungen und Unterbringungsdienste.',
    enFile: '01_cooperation_agreement.html',
    deFile: '01_kooperationsvertrag.html',
  },
  {
    id: '02',
    categoryKey: 'annex',
    enName: 'Annex A – Contingent & Pricing',
    deName: 'Anlage A – Kontingent & Preise',
    enDesc: 'Details of room contingents, monthly usage fees, and specific partner pricing models (Models A, B, and C).',
    deDesc: 'Einzelheiten über Zimmerkontingente, monatliche Nutzungsgebühren und spezifische Partner-Preismodelle (Modelle A, B und C).',
    enFile: '02_annex_a.html',
    deFile: '02_anlage_a.html',
  },
  {
    id: '03',
    categoryKey: 'annex',
    enName: 'Annex B – Service Description',
    deName: 'Anlage B – Leistungsbeschreibung',
    enDesc: 'Detailed specification of the Arrivio Base Package services including broadband internet, household, and liability insurances.',
    deDesc: 'Detaillierte Spezifikation der Arrivio Basispaket-Leistungen inklusive Breitband-Internet, Hausrat- und Haftpflichtversicherungen.',
    enFile: '03_annex_b.html',
    deFile: '03_anlage_b.html',
  },
  {
    id: '04',
    categoryKey: 'annex',
    enName: 'Annex C – House Rules',
    deName: 'Anlage C – Hausordnung',
    enDesc: 'General house rules governing quiet hours, absolute smoking ban, pets, cleaning responsibilities, and shared facility usage.',
    deDesc: 'Allgemeine Hausordnung bezüglich Ruhezeiten, absolutem Rauchverbot, Haustieren, Reinigungspflichten und Gemeinschaftsräumen.',
    enFile: '04_annex_c.html',
    deFile: '04_anlage_c.html',
  },
  {
    id: '05',
    categoryKey: 'annex',
    enName: 'Annex D – Data Protection & DPA',
    deName: 'Anlage D – Datenschutz & AVV',
    enDesc: 'Standard Data Processing Agreement (DPA) under Art. 28 GDPR detailing personal data processing scopes and security requirements.',
    deDesc: 'Standard-Vereinbarung zur Auftragsverarbeitung (AVV) gemäß Art. 28 DS-GVO mit Einzelheiten zur Datenverarbeitung und Sicherheit.',
    enFile: '05_annex_d.html',
    deFile: '05_anlage_d.html',
  },
  {
    id: '06',
    categoryKey: 'framework',
    enName: 'Residential Use Agreement',
    deName: 'Wohnnutzungsvertrag',
    enDesc: 'Individual accommodation agreement concluded directly with residents for private residential room use.',
    deDesc: 'Einzelvereinbarung mit den Bewohnern über die Überlassung von möbliertem Wohnraum zur privaten Nutzung.',
    enFile: '06_residential_use_agreement.html',
    deFile: '06_wohnnutzungsvertrag.html',
  },
  {
    id: '07',
    categoryKey: 'protocol',
    enName: 'Handover Protocol',
    deName: 'Übergabeprotokoll',
    enDesc: 'Record of room and apartment condition, keys issued, and meter readings at the time of move-in or move-out.',
    deDesc: 'Protokollierung des Zimmer- und Wohnungszustands, übergebener Schlüssel und Zählerstände beim Einzug oder Auszug.',
    enFile: '07_handover_protocol.html',
    deFile: '07_uebergabeprotokoll.html',
  },
  {
    id: '08',
    categoryKey: 'protocol',
    enName: 'Inventory List',
    deName: 'Inventarliste',
    enDesc: 'Detailed checklist of furniture, electronic appliances, and cooking utensils provided in the room and shared spaces.',
    deDesc: 'Detaillierte Checkliste der im Zimmer und in den Gemeinschaftsräumen bereitgestellten Möbel, Geräte und Utensilien.',
    enFile: '08_inventory_list.html',
    deFile: '08_inventarliste.html',
  },
  {
    id: '09',
    categoryKey: 'report',
    enName: 'Damage Report',
    deName: 'Schadensmeldung',
    enDesc: 'Official report form for documenting structural, inventory, or electronic damages reported in the shared units.',
    deDesc: 'Offizielles Formular zur Dokumentation von Bau-, Inventar- oder Elektronikschäden in den Wohneinheiten.',
    enFile: '09_damage_report.html',
    deFile: '09_schadensmeldung.html',
  }
];

export default function Contract() {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState('en');
  const [activeCategory, setActiveCategory] = useState('all');

  const isEn = language === 'en';

  // Filter contract array based on active criteria
  const filteredContracts = CONTRACTS_DATA.filter((contract) => {
    // 1. Category Filter
    if (activeCategory !== 'all' && contract.categoryKey !== activeCategory) {
      return false;
    }

    // 2. Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const name = isEn ? contract.enName.toLowerCase() : contract.deName.toLowerCase();
      const desc = isEn ? contract.enDesc.toLowerCase() : contract.deDesc.toLowerCase();
      const num = contract.id;
      const file = isEn ? contract.enFile.toLowerCase() : contract.deFile.toLowerCase();

      return name.includes(query) || desc.includes(query) || num.includes(query) || file.includes(query);
    }

    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-slide-up">
      {/* Page Header */}
      <PageHeader
        breadcrumb="B2B OPERATION | CONTRACTS"
        title={isEn ? "Document & Contract Registry" : "Dokumenten- & Vertragsregister"}
        description={
          isEn 
            ? "Access, search, and view standard B2B agreements, annexes, handover protocols, and damage forms in both English and German."
            : "Suchen, filtern und öffnen Sie standardmäßige B2B-Vereinbarungen, Anlagen, Übergabeprotokolle und Schadensformulare auf Englisch und Deutsch."
        }
      />
      {/* Control Panel (Search and Language Toggle) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 bg-white dark:bg-[#1a1d23] border border-gray-100 dark:border-gray-800/80 rounded-2xl shadow-sm">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={isEn ? "Search by document title, description, id..." : "Nach Titel, Beschreibung, ID suchen..."}
        />
        <LanguageSwitch language={language} setLanguage={setLanguage} />
      </div>

      {/* Category Pills Filter */}
      <CategoryFilters
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        language={language}
        contracts={CONTRACTS_DATA}
      />

      {/* Contracts Cards Grid or Empty Search State */}
      {filteredContracts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContracts.map((contract) => (
            <ContractCard
              key={contract.id}
              contract={contract}
              language={language}
            />
          ))}
        </div>
      ) : (
        /* Empty Search Results UI */
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white dark:bg-[#1a1d23] border border-gray-100 dark:border-gray-800/80 rounded-2xl text-center shadow-sm">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 mb-4 animate-bounce">
            <FileSearch size={28} />
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
            {isEn ? "No documents found" : "Keine Dokumente gefunden"}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed mb-5">
            {isEn
              ? `We couldn't find any contracts matching "${searchQuery}" in this category. Try adjusting your keywords or filters.`
              : `Es wurden keine Verträge passend zu "${searchQuery}" in dieser Kategorie gefunden. Bitte passen Sie Ihre Suchworte oder Filter an.`}
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="px-4 py-2 bg-[#1a6644]/5 hover:bg-[#1a6644]/10 dark:bg-[#34d399]/5 dark:hover:bg-[#34d399]/10 border border-[#1a6644]/25 dark:border-[#34d399]/25 text-[#1a6644] dark:text-[#34d399] rounded-xl text-xs font-semibold tracking-wide transition-colors cursor-pointer"
          >
            {isEn ? "Reset Search & Filters" : "Suche & Filter zurücksetzen"}
          </button>
        </div>
      )}
    </div>
  );
}
