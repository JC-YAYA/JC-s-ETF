'use client';

import type { Etf } from '@/lib/etf-data';
import { useState, useMemo, useEffect } from 'react';
import { EtfSelector } from './etf-selector';
import { TopPerformerCard } from './top-performer-card';
import { EtfRankList } from './etf-rank-list';

type EtfWeeklyRankPageProps = {
  allEtfs: Etf[];
};

export function EtfWeeklyRankPage({ allEtfs }: EtfWeeklyRankPageProps) {
  const [selectedEtfs, setSelectedEtfs] = useState<Etf[]>([]);

  useEffect(() => {
    // Set initial selected ETFs only once
    setSelectedEtfs(allEtfs.filter(etf => ['0050', '0056', '00878', '00919', '00929'].includes(etf.code)));
  }, []); // Empty dependency array ensures this runs only on mount

  const handleSelectionChange = (newSelection: Etf[]) => {
    setSelectedEtfs(newSelection);
  };

  const visibleEtfs = useMemo(() => {
    const selectedIds = new Set(selectedEtfs.map(e => e.id));
    return allEtfs.filter(etf => selectedIds.has(etf.id));
  }, [selectedEtfs, allEtfs]);

  const sortedEtfs = useMemo(() => {
    return [...visibleEtfs].sort((a, b) => b.weeklyChange - a.weeklyChange);
  }, [visibleEtfs]);

  const topPerformer = sortedEtfs.length > 0 ? sortedEtfs[0] : null;

  return (
    <div className="space-y-8">
      <TopPerformerCard etf={topPerformer} totalEtfs={sortedEtfs.length} />
      
      <EtfSelector
        allEtfs={allEtfs}
        selectedEtfs={selectedEtfs}
        onSelectionChange={handleSelectionChange}
      />
      
      <EtfRankList etfs={sortedEtfs} />
    </div>
  );
}
