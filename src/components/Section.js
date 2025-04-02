import React, { useState, useEffect } from 'react';
import supabase from '../lib/supabase';
import { getCurrentUser } from '../modules/auth.repository';
import '../css/Section.css'

const Section = ({ mode }) => {
  // mode の変更を確認するために useEffect を使う
  useEffect(() => {
    console.log("Section: Current mode is", mode);
    setJournalEntries([]); // モードが変更ャーナルをリセット
    setInterviewAnswers(['', '', '', '', '']);
    setShowSummaryInputs(false); //modeChangeまとめリセット
  }, [mode]);
  
  const sectionStyle = {
    backgroundColor: mode === 'good' ? '#F3EBDE' : '#CEDEDE',
    color: mode === 'good' ? '#333' : '#444',
    padding: '20px'
  };

  const btnBgColor = mode === 'good' ? '#DE8D8D' : '#A4C4C3';
  const subBtnBgColor = mode === 'good' ? '#DE8D8D' : '#A4C4C3';
  const subBgColor = mode === 'good' ? 'rgba(222, 141, 141, 0.25)' : 'rgba(164, 196, 195, 0.25)';

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
  const [interviewAnswers, setInterviewAnswers] = useState(['', '', '', '', '']);
// buttonした
  const [title, setTitle] = useState('');
  const [reflection, setReflection] = useState('');
  const [showSummaryInputs, setShowSummaryInputs] = useState(false);

  // 初期入力送信時の処理
  const handleInitialSubmit = async () => {
    const user = await getCurrentUser();
    if (!user) return;
    if (eventTheme.trim() === '' && feel.trim() === '') return;
  
    const newEntry = {
      eventTheme,
      feel,
      mode, 
      user_id: user.id,
    };
  
    const { data, error } = await supabase
      .from('journalEntries') 
      .insert([newEntry])
      .select();
  
    if (error) {
      console.error('送信失敗:', error);
    } else {
      const insertedEntry = data[0];
      setEventTheme('');
      setFeel('');
      setShowInterview(true);
      setJournalEntries([...journalEntries, insertedEntry]);
      console.log('Updated journalEntries:', [...journalEntries, newEntry]);
    }
  };

   // インタビュー入力欄の値を更新する関数
  const handleInterviewChange = (index, value) => {
    const newAnswers = [...interviewAnswers];
    newAnswers[index] = value;
    setInterviewAnswers(newAnswers);
  };

  // インタビュー内容送信時の処理（必要に応じてjournalEntriesに統合するなど）
  const handleInterviewFinish = async() => {
    console.log('Interview answers:', interviewAnswers);

  const lastEntry = journalEntries[journalEntries.length - 1];

  const { data, error } = await supabase
    .from('journalEntries')
    .update({ interview: interviewAnswers, 
      title: title,
      reflection: reflection
    })
    .eq('id', lastEntry.id)
    .select();

  if (error) {
    console.error('更新失敗:', error);
  } else {
    const updatedEntry = data[0];
    setJournalEntries((prevEntries) => {
      const lastIndex = prevEntries.length - 1;
      return [...prevEntries.slice(0, lastIndex), updatedEntry];
    });

    setInterviewAnswers(['', '', '', '', '']);
    // setShowInterview(false);
    setShowInterview(true);
    // 開発時はfalseに
    console.log('更新成功🎉:', updatedEntry);
   }
  };


  return (
      <section className='section' style={sectionStyle}>
    <div className="sectionWrapper">

          <div className='heading'>
          {mode === 'good' ? (
        <>
        <h1>まだ叶ってない“未来”を、先に書いてみよう。
        <span style={{ fontSize: '0.9em', color: '#666', marginBottom: '20px' }}>
          What if you wrote it down?
        </span>
        </h1>

        <p>
        このジャーナルは、あなたの“内なる手紙”。
        「なぜそれができたの？」「どうして乗り越えられたの？」
        未来の自分と対話するように、自由に書いてみて。
            {/* <span>This journal is a letter to your inner self.  
            “How did you do it?” “What helped you get through?”  
            Imagine future-you answering those questions, and let the words flow.</span> */}
              </p>
            </>
      ) : (
    <>
      <h1>このジャーナルは、モヤモヤした気持ちを一度、外に出す場所
          <span style={{ fontSize: '0.9em', color: '#666', marginBottom: '20px' }}>
          What if you let it out?
          </span>
          </h1>
        
          <p>
          つづき＿このジャーナルは、モヤモヤした気持ちを一度、外に出す場所
          「そうだったんだね」「なぜそう思うの？」と自分に問いかけてみて。
          {/* <span>What if you let it out?</span> */}
          </p>
          </>
  )}
  </div>
    <div className='journalArea'>
        <div className='journalInput'>
          <input
            placeholder={placeholderEventTheme}
            value={eventTheme}
            onChange={(e) => setEventTheme(e.target.value)}
            disabled={journalEntries.length > 0} // journalEntries にデータがある場合は無効化
            style={{
              backgroundColor: journalEntries.length > 0 ? '#f0f0f0' : '#fff', // 無効化時の背景色を変更
              cursor: journalEntries.length > 0 ? 'not-allowed' : 'text', // 無効化時のカーソルを変更
            }}
          />
          <input
              placeholder={placeholderFeel}
              value={feel}
              onChange={(e) => setFeel(e.target.value)}
              disabled={journalEntries.length > 0} // journalEntries にデータがある場合は無効化
              style={{
                backgroundColor: journalEntries.length > 0 ? '#f0f0f0' : '#fff', // 無効化時の背景色を変更
                cursor: journalEntries.length > 0 ? 'not-allowed' : 'text', // 無効化時のカーソルを変更
              }}
            />
        </div>
       
        <div className="buttonWrapper">
          <button style={btnStyle} onClick={handleInitialSubmit}>
            record
          </button>
        </div>
        
      
      <div className='journalEntries'>
        {journalEntries.map((entry, index) => (
          <div key={index} className='skewedBox' style={{ marginTop: '10px' }}>
            <p><strong>{mode === 'good' ? 'できたこと :' : '起こったこと :'}</strong> {entry.eventTheme}</p>
            <p><strong>{mode === 'good' ? '感じたこと :' : '感じたこと :'}</strong> {entry.feel}</p>
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

    {/* 常に 5 行表示されるので、まとめボタンは下に表示 */}
    <div className='buttonWrapper'>
      <button
        style={{ backgroundColor: subBtnBgColor }}
        onClick={() => setShowSummaryInputs(true)}
      >
        まとめに入る
      </button>
    </div>
        </div>
      )}
        {showSummaryInputs && (
          <div className='summaryArea'
          style={{
            backgroundColor: subBgColor, // 動的に背景色を適用
          }}>
            <>
            <div>
            <input
                placeholder="タイトル"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            </div>
             <div>
                <textarea
                  placeholder="まとめ・結論（reflection）"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                />
                <div>
                <button style={{ backgroundColor: btnBgColor }} 
                onClick={handleInterviewFinish}>
                  Finish Interview
                </button>
                </div>
                </div>                
                
                </>
              </div>
            )}
          </div>
        </div>
      </section>
    
  )
}

export default Section