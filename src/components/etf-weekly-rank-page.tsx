'use client';

import type { Etf } from '@/lib/etf-data';
import { useState, useMemo } from 'react';
import { EtfSelector } from './etf-selector';
import { TopPerformerCard } from './top-performer-card';
import { EtfRankList } from './etf-rank-list';

type EtfWeeklyRankPageProps = {
  allEtfs: Etf[];
};

export function EtfWeeklyRankPage({ allEtfs }: EtfWeeklyRankPageProps) {
  const [selectedEtfs, setSelectedEtfs] = useState<Etf[]>(
    allEtfs.filter(etf => ['0050', '0056', '00878', '00919', '00929'].includes(etf.code))
  );

  const sortedEtfs = useMemo(() => {
    return [...selectedEtfs].sort((a, b) => b.weeklyChange - a.weeklyChange);
  }, [selectedEtfs]);

  const topPerformer = sortedEtfs.length > 0 ? sortedEtfs[0] : null;

  return (
    <div className="space-y-8">
      <TopPerformerCard etf={topPerformer} totalEtfs={sortedEtfs.length} />
      
      <EtfSelector
        allEtfs={allEtfs}
        selectedEtfs={selectedEtfs}
        onSelectionChange={setSelectedEtfs}
      />
      
      <EtfRankList etfs={sortedEtfs} />
    </div>
  );
}
