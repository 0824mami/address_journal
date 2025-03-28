import React, { useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import { motion } from 'framer-motion';
import '../css/Main.css';
import DaySelector from './DaySelector';


const JournalList = ({ show }) => {
const [selectedDay, setSelectedDay] = useState(null);
const [entries, setEntries] = useState([]);  

  useEffect(() => {
    if (!show) return;
    const fetchEntries = async () => {
      let query = supabase
      .from('journalEntries')
      .select('*')
      .order('created_at', { ascending: false });

        if (selectedDay) {
          const dayStr = String(selectedDay).padStart(2, '0');
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0');
          const datePattern = `${year}-${month}-${dayStr}%`;
    
          query = query.like('created_at', datePattern);
        }
    
        const { data, error } = await query;
    
        if (error) {
          console.error('データ取得エラー:', error);
        } else {
          setEntries(data);
        }
      };

    fetchEntries();
  }, [show, selectedDay]);

  return (
    <div style={{ position: 'relative' }}>
      

      <DaySelector onDayChange={setSelectedDay} />
        <motion.section
          className="journal-list"
          initial={{ opacity: 0, x: 50 }} // 右から100pxの位置＋透明
          animate={{ opacity: 1, x: 0 }}   // 元の位置にスライド＋フェードイン
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ overflow: 'hidden', padding: '20px' }} 
        >
          
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              className="journal-entry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              style={{ 
                marginBottom: '20px', 
                background: 'rgba(255, 255, 255, 0.8)',
                padding: '10px',
                borderRadius: '8px',
              }}
            >
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
            </motion.div>
          ))}
        </motion.section>
      </div>
  );
};

export default JournalList;