import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { motion } from 'framer-motion';

const JournalList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from('journalEntries') 
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
    <motion.section className="journal-list"
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    >
      <h2>📒 これまでのジャーナル</h2>
      {entries.map((entry) => (
        <motion.div
            key={entry.id}
            className="journal-entry"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: '20px' }}
        >
        <p><strong>できごと:</strong> {entry.eventTheme}</p>
        <p><strong>感情:</strong> {entry.feel}</p>
        
        {/* // <div key={entry.id} className="journal-entry" style={{ marginBottom: '20px' }}> */}
          

          {Array.isArray(entry.interview) && entry.interview.length > 0 && (
            <ul>
              {entry.interview.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}

          {entry.title && <p><strong>📝 タイトル:</strong> {entry.title}</p>}
          {entry.reflection && <p><strong>🌟 気づき:</strong> {entry.reflection}</p>}
          </motion.div>
      ))}
    </motion.section>
  );
};

export default JournalList;
