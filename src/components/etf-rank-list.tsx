'use client';

import type { Etf } from '@/lib/etf-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PerformanceTag } from './performance-tag';
import { Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type EtfRankListProps = {
  etfs: Etf[];
};

export function EtfRankList({ etfs }: EtfRankListProps) {
  if (etfs.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">ETF 漲幅排行列表</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px] text-center">排行</TableHead>
                <TableHead>名稱</TableHead>
                <TableHead className="text-right">週漲幅</TableHead>
                <TableHead className="w-[180px] sm:w-[220px]">狀態標籤</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {etfs.map((etf, index) => {
                const googleSearchUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(etf.name + ' ETF')}`;
                const isPositive = etf.weeklyChange >= 0;

                return (
                  <TableRow key={etf.id}>
                    <TableCell className="text-center font-medium text-lg text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{etf.name}</div>
                          <div className="text-sm text-muted-foreground">{etf.code}</div>
                        </div>
                        <a
                          href={googleSearchUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visual search for ${etf.name}`}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ImageIcon className="h-4 w-4" />
                        </a>
                      </div>
                    </TableCell>
                    <TableCell className={cn("text-right font-semibold", isPositive ? 'text-green-600' : 'text-red-600')}>
                      {isPositive ? '+' : ''}{etf.weeklyChange.toFixed(2)}%
                    </TableCell>
                    <TableCell>
                      <PerformanceTag
                        etfName={etf.name}
                        rank={index + 1}
                        totalEtfs={etfs.length}
                        weeklyChange={etf.weeklyChange}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
