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
// buttonした
  const [title, setTitle] = useState('');
  const [reflection, setReflection] = useState('');
  const [showSummaryInputs, setShowSummaryInputs] = useState(false);

  // 初期入力送信時の処理
  const handleInitialSubmit = async () => {
    if (eventTheme.trim() === '' && feel.trim() === '') return;
  
    const newEntry = {
      eventTheme,
      feel,
      mode, // モードも一緒に保存しておくと便利！
    };
  
    const { data, error } = await supabase
      .from('journalEntries') 
      .insert([newEntry])
      .select();
  
    if (error) {
      console.error('送信失敗:', error);
    } else {
      console.log('送信成功！:', data);
      const insertedEntry = data[0];
      setEventTheme('');
      setFeel('');
      setShowInterview(true);
      // 画面上にも追加するならこれもあり：
      setJournalEntries([...journalEntries, insertedEntry]);
      console.log('Updated journalEntries:', [...journalEntries, newEntry]);
    }
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
  const handleInterviewFinish = async() => {
    console.log('Interview answers:', interviewAnswers);

  const lastEntry = journalEntries[journalEntries.length - 1];

  const { data, error } = await supabase
    .from('journalEntries')
    .update({ interview: interviewAnswers })
    .eq('id', lastEntry.id)
    .select();

  if (error) {
    console.error('更新失敗:', error);
  } else {
    const updatedEntry = data[0];
    // ローカルstateも更新
    setJournalEntries((prevEntries) => {
      const lastIndex = prevEntries.length - 1;
      return [...prevEntries.slice(0, lastIndex), updatedEntry];
    });

    setInterviewAnswers(['', '', '']);
    // setShowInterview(false);
    setShowInterview(true);
    // 開発時はfalseに
    console.log('更新成功🎉:', updatedEntry);
   }
  };


  


  return (
    <section className='section' style={sectionStyle}>
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
        <div>
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
        </div>
        <div>
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
        <div>
        <button style={btnStyle} onClick={handleInitialSubmit}>
          record
        </button>
        </div>
      </div>
      <div className='journalEntries'>
        {journalEntries.map((entry, index) => (
          <div key={index} className='skewedBox' style={{ marginTop: '10px' }}>
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

                {index === interviewAnswers.length - 1 && interviewAnswers.length < 5 && (
                  <button style={{ backgroundColor: addBtnBgColor }} className="addButton" onClick={addInterviewField}>Add more (max 5)</button>
                )}
                {/* 5行目だったら「まとめに入る」表示 */}
                {index === 4 && (
                  <button onClick={() => setShowSummaryInputs(true)}>
                    まとめに入る
                  </button>
                )}

            </div>
          ))}
          
          <button style={{ backgroundColor: btnBgColor }} onClick={handleInterviewFinish}>Finish Interview</button>
        </div>
      )}
                {showSummaryInputs && (
            <>
              <input
                placeholder="タイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="まとめ・結論（reflection）"
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
              />
            </>
          )}


    </section>
  )
}

export default Section