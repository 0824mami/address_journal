import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';

const JournalList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from('journalEntries') // あなたのテーブル名にあわせてね！
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('データ取得エラー:', error);
      } else {
        setEntries(data);
      }
    };

    fetchEntries();
  }, []);

  return (
    <section className="journal-list">
      <h2>📒 これまでのジャーナル</h2>
      {entries.map((entry) => (
        <div key={entry.id} className="journal-entry" style={{ marginBottom: '20px' }}>
          <p><strong>できごと:</strong> {entry.eventTheme}</p>
          <p><strong>感情:</strong> {entry.feel}</p>

          {Array.isArray(entry.interview) && entry.interview.length > 0 && (
            <ul>
              {entry.interview.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}

          {entry.title && <p><strong>📝 タイトル:</strong> {entry.title}</p>}
          {entry.reflection && <p><strong>🌟 気づき:</strong> {entry.reflection}</p>}
        </div>
      ))}
    </section>
  );
};

export default JournalList;
