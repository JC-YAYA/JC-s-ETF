'use client';

import type { Etf } from '@/lib/etf-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, Image as ImageIcon } from 'lucide-react';
import { PerformanceTag } from './performance-tag';

type TopPerformerCardProps = {
  etf: Etf | null;
  totalEtfs: number;
};

export function TopPerformerCard({ etf, totalEtfs }: TopPerformerCardProps) {
  if (!etf) {
    return (
      <Card className="bg-card/50 border-dashed animate-pulse">
        <CardHeader className="text-center">
          <CardTitle className="font-headline">請選擇 ETF</CardTitle>
          <CardDescription>請從下方列表選擇您關注的 ETF 以查看排行</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const googleSearchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(etf.name + ' ETF')}`;
  const isPositive = etf.weeklyChange >= 0;

  return (
    <Card className="mb-8 border-2 border-accent shadow-xl shadow-accent/20">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardDescription className="font-headline text-accent font-semibold tracking-wider">本週推薦 ETF</CardDescription>
                <CardTitle className="font-headline text-3xl">{etf.name} <span className="text-muted-foreground">{etf.code}</span></CardTitle>
            </div>
             <a
              href={googleSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visual search for ${etf.name}`}
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
               <span className="hidden sm:inline group-hover:underline">視覺化</span>
              <ImageIcon className="h-5 w-5" />
            </a>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">本週漲幅</p>
            <p className={`text-4xl font-bold flex items-center gap-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className="h-8 w-8" />
              {isPositive ? '+' : ''}{etf.weeklyChange.toFixed(2)}%
            </p>
          </div>
          <PerformanceTag
            etfName={etf.name}
            rank={1}
            totalEtfs={totalEtfs}
            weeklyChange={etf.weeklyChange}
          />
        </div>
      </CardContent>
    </Card>
  );
}
