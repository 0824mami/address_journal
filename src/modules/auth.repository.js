// modules/authRepository.js
import supabase from '../lib/supabase';

// 匿名ログイン
export const signInAnonymously = async () => {
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  return data.user;
};

// ユーザー取得
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
};
