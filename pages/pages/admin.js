import { useState } from 'react';

export default function Admin() {
  const [form, setForm] = useState({ gameName: '', number: '', time: '' });
  const [status, setStatus] = useState('');

  const update = async (e) => {
    e.preventDefault();
    setStatus('Updating...');
    const res = await fetch('/api/results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      setStatus('Success! Number Updated.');
      setForm({ gameName: '', number: '', time: '' });
    } else {
      setStatus('Error updating number.');
    }
  };

  return (
    <div style={{ padding: '30px', maxWidth: '400px', margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>Admin Panel</h2>
      <form onSubmit={update} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input placeholder="Game Name (e.g. Gali)" value={form.gameName} onChange={e => setForm({...form, gameName: e.target.value})} required style={{ padding: '10px' }} />
        <input placeholder="Result Number" value={form.number} onChange={e => setForm({...form, number: e.target.value})} required style={{ padding: '10px' }} />
        <input placeholder="Time (e.g. 11:30 PM)" value={form.time} onChange={e => setForm({...form, time: e.target.value})} required style={{ padding: '10px' }} />
        <button type="submit" style={{ padding: '10px', background: 'darkgreen', color: 'white', border: 'none', cursor: 'pointer' }}>Update Result</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

