'use client';

import { useEffect, useState } from 'react';
import { getPerformanceTag } from '@/app/actions';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TagEtfPerformanceOutput } from '@/ai/flows/performance-tagging';

type PerformanceTagProps = {
  etfName: string;
  rank: number;
  totalEtfs: number;
  weeklyChange: number;
};

export function PerformanceTag({ etfName, rank, totalEtfs, weeklyChange }: PerformanceTagProps) {
  const [data, setData] = useState<TagEtfPerformanceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (totalEtfs > 0) {
      setIsLoading(true);
      getPerformanceTag({ etfName, rank, totalEtfs, weeklyChange })
        .then(result => {
          if (isMounted) {
            setData(result);
            setIsLoading(false);
          }
        })
        .catch(error => {
          console.error("Failed to get performance tag:", error);
          if (isMounted) {
            setIsLoading(false);
          }
        });
    }

    return () => {
      isMounted = false;
    };
  }, [etfName, rank, totalEtfs, weeklyChange]);

  if (isLoading) {
    return <Skeleton className="h-6 w-28 rounded-full" />;
  }

  if (!data) return null;

  const { performanceTag, disclaimer } = data;

  let badgeClass = '';
  if (performanceTag.includes('佳') || performanceTag.toLowerCase().includes('top')) { // 表現較佳
    badgeClass = 'bg-accent text-accent-foreground hover:bg-accent/90 border-transparent shadow';
  } else if (performanceTag.includes('弱') || performanceTag.toLowerCase().includes('under')) { // 表現偏弱
    badgeClass = 'bg-muted text-muted-foreground border-transparent';
  } else {
    badgeClass = 'bg-secondary text-secondary-foreground border-transparent';
  }

  return (
    <div className="flex items-center gap-2">
      <Badge className={cn(badgeClass)}>{performanceTag}</Badge>
      <Popover>
        <PopoverTrigger asChild>
          <button className="text-muted-foreground hover:text-foreground transition-opacity" aria-label="Disclaimer">
            <Info className="h-4 w-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="text-sm w-72 sm:w-80" side="top" align="start">
          <h4 className="font-headline font-semibold mb-2">AI 小助理提示</h4>
          <p className="font-body">{disclaimer}</p>
        </PopoverContent>
      </Popover>
    </div>
  );
}
