import React, { useState, useEffect } from 'react';

export default function EestiReisikaaslaneFull() {
  const [results, setResults] = useState(false);
  const [profile, setProfile] = useState('seenior');
  const [activity, setActivity] = useState('muuseum');
  const [darkMode, setDarkMode] = useState(false);
  
  // Simuleeritud ilm
  const weather = { temp: 11, rainChance: 65 };

  // Leaflet kaardi laadimine tulemuste vaatesse
  useEffect(() => {
    if (results) {
      if (!window.L) {
        const leafletCSS = document.createElement('link');
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(leafletCSS);

        const leafletJS = document.createElement('script');
        leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        leafletJS.async = true;
        leafletJS.onload = initMap;
        document.body.appendChild(leafletJS);
      } else {
        initMap();
      }
    }
  }, [results]);

  const initMap = () => {
    if (window.L && document.getElementById('map')) {
      const container = document.getElementById('map');
      if (container._leaflet_id) { container._leaflet_id = null; }
      
      const map = window.L.map('map').setView([59.4370, 24.7536], 13);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap'
      }).addTo(map);

      window.L.marker([59.4370, 24.7536]).addTo(map)
        .bindPopup('Eesti Ajaloomuuseum (Suurgildi hoone)')
        .openPopup();
    }
  };

  return (
    <div className={`min-h-screen font-sans antialiased pb-12 transition-colors duration-200 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Päis */}
      <header className={`shadow-md transition-colors ${darkMode ? 'bg-slate-800 text-white' : 'bg-emerald-700 text-white'}`}>
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">Eesti Reisikaaslane</h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="bg-black/20 hover:bg-black/30 text-xs px-2.5 py-1.5 rounded-lg transition"
            >
              {darkMode ? '☀️ Hele' : '🌙 Tumeroheline'}
            </button>
            <a 
              href="tel:112" 
              className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition shadow"
            >
              Hädaabi 112
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-6">
        {!results ? (
          <div className={`rounded-xl shadow-sm border p-6 transition-colors ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <h2 className="text-2xl font-bold mb-6">Kuhu täna reisime?</h2>
            
            <form onSubmit={(e) => { e.preventDefault(); setResults(true); }} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">1. Sinu praegune asukoht</label>
                <select className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-300'}`}>
                  <option value="Tallinn">Tallinn</option>
                  <option value="Tartu">Tartu</option>
                  <option value="Pärnu">Pärnu</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">2. Kes reisib?</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'seenior', label: 'Seenior / Pensionär' },
                    { id: 'pere', label: 'Perereis lastega' }
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setProfile(item.id)}
                      className={`p-3 text-sm font-medium rounded-lg border text-left transition ${
                        profile === item.id 
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500' 
                          : `${darkMode ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-50'}`
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg text-lg"
              >
                Leia parimad kohad täna
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <button 
              onClick={() => setResults(false)}
              className="text-sm font-semibold text-emerald-500 hover:underline flex items-center gap-1"
            >
              &larr; Muuda otsingut
            </button>

            <div className={`p-4 rounded-r-xl border-l-4 border-amber-500 shadow-sm ${darkMode ? 'bg-amber-950/40 text-amber-200' : 'bg-amber-50 text-amber-900'}`}>
              <h3 className="font-bold text-lg">Ilmahoiatus ja nutikas soovitus</h3>
              <p className="text-sm mt-1">Sademete tõenäosus: {weather.rainChance}% (Vihmaohus)</p>
              <p className="text-sm font-medium mt-2 p-2 rounded bg-amber-500/20">
                <strong>Plaan B:</strong> Kuna täna sajab vihma, lülitasime sisse siseruumide muuseumid!
              </p>
            </div>

            <div id="map" className="w-full h-64 rounded-xl border border-slate-700 shadow-inner z-0"></div>

            <div className={`p-5 rounded-xl border shadow-sm ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <h4 className="font-bold text-lg">Eesti Ajaloomuuseum (Suurgildi hoone)</h4>
              <p className="text-xs opacity-75 mt-1">Kaugus: 450 m | Pensionäri soodustus -50%</p>
              <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition">
                Salvesta plaani
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
