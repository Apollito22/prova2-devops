import React, { useEffect, useState } from 'react';

export default function App() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadClasses() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/classes', { cache: 'no-store' });
      if (!response.ok) throw new Error('Não foi possível carregar as turmas.');
      const data = await response.json();
      setClasses(data);
    } catch (err) {
      setError(err.message ?? 'Erro ao conectar com a API.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadClasses(); }, []);

  return (
    <main>
      <header>
        <div><h1>Turmas</h1><p>Lista de turmas cadastradas.</p></div>
        <button onClick={loadClasses} disabled={loading}>
          {loading ? 'Carregando…' : 'Atualizar lista'}
        </button>
      </header>
      {error && <p className="error" role="alert">{error}</p>}
      <div className="table-container" aria-live="polite">
        <table>
          <caption>Turmas cadastradas</caption>
          <thead><tr><th scope="col">ID</th><th scope="col">Nome</th><th scope="col">Turno</th>
            <th scope="col">Capacidade</th><th scope="col">Data de início</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan="5">Carregando turmas…</td></tr>
              : error ? <tr><td colSpan="5">A listagem está indisponível. Tente atualizar novamente.</td></tr>
              : classes.length === 0 ? <tr><td colSpan="5">Nenhuma turma cadastrada.</td></tr>
              : classes.map((item) => <tr key={item.id}>
                  <td>{item.id}</td><td>{item.name}</td><td>{item.shift}</td>
                  <td>{item.capacity}</td><td>{item.start_date}</td>
                </tr>)}
          </tbody>
        </table>
      </div>
    </main>
  );
}
