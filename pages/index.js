import { useState, useEffect } from 'react';

export default function Home() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('/api/results')
        .then(res => res.json())
        .then(data => setResults(data))
        .catch(err => console.error(err));
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Har 30 sec mein update
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ background: '#b22222', color: 'white', textAlign: 'center', padding: '30px 10px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>
        <h1 style={{ margin: 0, fontSize: '28px' }}>SATTA KING LIVE RESULT</h1>
        <p style={{ margin: '5px 0 0' }}>Sabse Tez Live Update</p>
      </header>

      <main style={{ maxWidth: '600px', margin: '20px auto', padding: '0 15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {results.length > 0 ? results.map((item) => (
            <div key={item.gameName} style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', textAlign: 'center', border: '1px solid #ddd' }}>
              <h2 style={{ color: '#333', margin: '0', fontSize: '22px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>{item.gameName}</h2>
              <div style={{ fontSize: '50px', fontWeight: 'bold', color: '#0047ab', margin: '15px 0' }}>
                {item.number || '--'}
              </div>
              <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>Update Time: {item.time}</p>
            </div>
          )) : (
            <p style={{ textAlign: 'center', color: '#666' }}>Results loading...</p>
          )}
        </div>
      </main>
    </div>
  );
}

