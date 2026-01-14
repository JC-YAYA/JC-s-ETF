
'use server';

import { tagEtfPerformance, type TagEtfPerformanceInput, type TagEtfPerformanceOutput } from '@/ai/flows/performance-tagging';

export async function getPerformanceTag(input: TagEtfPerformanceInput): Promise<TagEtfPerformanceOutput> {
  return await tagEtfPerformance(input);
}
