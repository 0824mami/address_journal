import React, { useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import '../css/Section.css'

const Section = ({ mode }) => {
  // mode の変更を確認するために useEffect を使う
  useEffect(() => {
    console.log("Section: Current mode is", mode);
    setJournalEntries([]); // モードが変更されたときにジャ
  }, [mode]);
  
  const sectionStyle = {
    backgroundColor: mode === 'good' ? '#F3EBDE' : '#CEDEDE',
    color: mode === 'good' ? '#333' : '#444',
    padding: '20px'
  };

  const btnBgColor = mode === 'good' ? '#DE8D8D' : '#A4C4C3';
  const addBtnBgColor = mode === 'good' ? 'transparent' : '#A4C4C3';

  // mode に応じてテキストやスタイルを変える
  // const titleText = mode === 'good' ? '成功体験ジャーナル' : '落ち込みモードのジャーナル';
  const questionText = mode === 'good' ? 'Why did you achieve it?' : 'Why do you think so??';
  const placeholderEventTheme = mode === 'good' ? 'What you achieved' : 'What went wrong';
  const placeholderFeel = mode === 'good' ? 'What you feel' : 'How do you feel now?';
  const btnStyle = {
    backgroundColor: mode === 'good' ? '#DE8D8D' : '#A4C4C3',
  };
  // 各入力欄の状態を管理
  const [eventTheme, setEventTheme] = useState('');
  const [feel, setFeel] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);

  // インタビューセクションの表示状態と回答内容
  const [showInterview, setShowInterview] = useState(false);
  const [interviewAnswers, setInterviewAnswers] = useState(['', '', '']);

  // 初期入力送信時の処理
  const handleInitialSubmit = () => {
    if (eventTheme.trim() === '' && feel.trim() === '') return;

   
    const newEntry = { eventTheme, feel };
    setJournalEntries([...journalEntries, newEntry]);
    setEventTheme('');
    setFeel('');
    // 初期入力送信後、インタビューセクションを表示
    setShowInterview(true);

    // ページのトップにスクロール
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 動的にインタビュー入力欄を追加する（最大5つまで）
  const addInterviewField = () => {
    if (interviewAnswers.length < 5) {
      setInterviewAnswers([...interviewAnswers, '']);
    }
  };
   // インタビュー入力欄の値を更新する関数
  const handleInterviewChange = (index, value) => {
    const newAnswers = [...interviewAnswers];
    newAnswers[index] = value;
    setInterviewAnswers(newAnswers);
  };

  // インタビュー内容送信時の処理（必要に応じてjournalEntriesに統合するなど）
  const handleInterviewFinish = () => {
    console.log('Interview answers:', interviewAnswers);
    // 例として、最新の日記エントリにインタビュー結果を付加する場合:
    setJournalEntries((prevEntries) => {
      const lastIndex = prevEntries.length - 1;
      const lastEntry = prevEntries[lastIndex];
      const updatedEntry = { ...lastEntry, interview: interviewAnswers };
      return [...prevEntries.slice(0, lastIndex), updatedEntry];
    });
    // インタビュー入力欄をリセットし、インタビューセクションを非表示にする
    setInterviewAnswers(['', '', '']);
    setShowInterview(false);
    // テスト時はtrueに
  };

  return (
    <section className='section' style={sectionStyle}>
      <div className='heading'>
        <h1>What is Lorem Ipsum?</h1>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>
      <div className='journalArea'>
        <div>
          <input
            placeholder={placeholderEventTheme}
            value={eventTheme}
            onChange={(e) => setEventTheme(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder={placeholderFeel}
            value={feel}
            onChange={(e) => setFeel(e.target.value)}
          />
        </div>
        <button style={btnStyle} onClick={handleInitialSubmit}>record</button>
      </div>
      <div className='journalEntries'>
        {journalEntries.map((entry, index) => (
          <div key={index} style={{ marginTop: '10px' }}>
            <p><strong>{mode === 'good' ? 'たっせい! :' : 'うんうん :'}</strong> {entry.eventTheme}</p>
            <p><strong>{mode === 'good' ? 'すごい!! :' : 'なるほど :'}</strong> {entry.feel}</p>
          </div>
        ))}
      </div>
      {showInterview && (
        <div className='interviewSection' style={{ marginTop: '20px' }}>
          <h3>{questionText}</h3>
          {interviewAnswers.map((answer, index) => (
            <div key={index}>
              <input
                placeholder={`Bullet point ${index + 1}`}
                value={answer}
                onChange={(e) => handleInterviewChange(index, e.target.value)}
              />
            </div>
          ))}
          {interviewAnswers.length < 5 && (
            <button style={{ backgroundColor: addBtnBgColor }} className="addButton" onClick={addInterviewField}>Add more (max 5)</button>
          )}
          <button style={{ backgroundColor: btnBgColor }} onClick={handleInterviewFinish}>Finish Interview</button>
        </div>
      )}


    </section>
  )
}

export default Section