import { EtfWeeklyRankPage } from '@/components/etf-weekly-rank-page';
import { ALL_ETFS } from '@/lib/etf-data';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 pt-8 pb-4">
        <div>
          <h1 className="text-4xl font-headline font-bold text-primary">ETF Weekly Rank</h1>
          <p className="mt-2 text-lg text-muted-foreground font-body">您的每週投資小助理</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input type="search" placeholder="Search ETFs..." className="pl-10" />
        </div>
      </header>
      <main className="container mx-auto flex-grow px-4 py-4">
        <EtfWeeklyRankPage allEtfs={ALL_ETFS} />
      </main>
      <footer className="container mx-auto mt-12 px-4 py-6 text-center text-xs text-muted-foreground">
        <p>資料來源：模擬數據。本頁面資訊僅供參考，不構成任何投資建議。投資有風險，請謹慎評估。</p>
      </footer>
    </div>
  );
}
