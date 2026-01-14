export type Etf = {
  id: string;
  name: string;
  code: string;
  weeklyChange: number;
};

export const ALL_ETFS: Etf[] = [
  { id: '1', name: '元大台灣50', code: '0050', weeklyChange: 2.5 },
  { id: '2', name: '元大高股息', code: '0056', weeklyChange: 1.2 },
  { id: '3', name: '富邦台50', code: '006208', weeklyChange: 2.45 },
  { id: '4', name: '國泰永續高股息', code: '00878', weeklyChange: 1.8 },
  { id: '5', name: '富邦科技', code: '0052', weeklyChange: 3.1 },
  { id: '6', name: '元大S&P500', code: '00646', weeklyChange: -0.5 },
  { id: '7', name: '群益台灣精選高息', code: '00919', weeklyChange: 2.1 },
  { id: '8', name: '復華台灣科技優息', code: '00929', weeklyChange: 2.9 },
  { id: '9', name: '中信關鍵半導體', code: '00891', weeklyChange: 4.2 },
  { id: '10', name: '國泰台灣5G+', code: '00881', weeklyChange: 3.5 },
  { id: '11', name: '富邦越南', code: '00885', weeklyChange: -1.1 },
  { id: '12', name: '元大滬深300正2', code: '00637L', weeklyChange: 0.8 },
];
