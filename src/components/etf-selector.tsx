'use client';

import type { Etf } from '@/lib/etf-data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type EtfSelectorProps = {
  allEtfs: Etf[];
  selectedEtfs: Etf[];
  onSelectionChange: (selected: Etf[]) => void;
};

export function EtfSelector({ allEtfs, selectedEtfs, onSelectionChange }: EtfSelectorProps) {
  const selectedIds = new Set(selectedEtfs.map((etf) => etf.id));

  const handleCheckedChange = (checked: boolean, etf: Etf) => {
    if (checked) {
      onSelectionChange([...selectedEtfs, etf]);
    } else {
      onSelectionChange(selectedEtfs.filter((selected) => selected.id !== etf.id));
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-lg font-headline hover:no-underline">
          選擇您想追蹤的 ETF
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border rounded-md">
            {allEtfs.map((etf) => (
              <div key={etf.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`etf-${etf.id}`}
                  checked={selectedIds.has(etf.id)}
                  onCheckedChange={(checked) => handleCheckedChange(Boolean(checked), etf)}
                />
                <Label htmlFor={`etf-${etf.id}`} className="font-normal cursor-pointer text-sm">
                  {etf.name} <span className="text-muted-foreground">({etf.code})</span>
                </Label>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
