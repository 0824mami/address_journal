import React, { useState } from 'react';
import Header from '../components/Header';     // 共通のヘッダー（必要ならアイコンなども含む）
import Section from '../components/Section';  // 成功体験ジャーナルのコンポーネント（UIは基本同じとする）
import Footer from '../components/Footer';     // フッター（共通の場合）

const JournalPage = () => {
    // 'good' が成功体験ジャーナル、'bad' が落ち込みモードのジャーナル
    const [mode, setMode] = useState('good');
    console.log("JournalPage mode:", mode);

    return (
        <div>
            {/* ヘッダーにモード切替用のアイコンやボタンを配置 */}
            <Header mode={mode} setMode={setMode} />

            {/* メインのコンテンツ。modeに応じて同じSectionコンポーネントを使いながら表示内容やテキストを変える */}
            <main>
                <Section mode={mode} />
            </main>

            <Footer />
        </div>
    );
};

export default JournalPage;
