'use server';

/**
 * @fileOverview An ETF performance tagging AI agent.
 *
 * - tagEtfPerformance - A function that handles the ETF performance tagging process.
 * - TagEtfPerformanceInput - The input type for the tagEtfPerformance function.
 * - TagEtfPerformanceOutput - The return type for the tagEtfPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TagEtfPerformanceInputSchema = z.object({
  etfName: z.string().describe('The name of the ETF.'),
  rank: z.number().describe('The rank of the ETF based on weekly performance.'),
  totalEtfs: z.number().describe('The total number of ETFs being ranked.'),
  weeklyChange: z.number().describe('The weekly change percentage of the ETF.'),
});
export type TagEtfPerformanceInput = z.infer<typeof TagEtfPerformanceInputSchema>;

const TagEtfPerformanceOutputSchema = z.object({
  performanceTag: z.string().describe('A label indicating the ETF performance (e.g., Top Performer, Average, Underperformer).'),
  disclaimer: z.string().describe('A disclaimer for the ETF recommendation.'),
});
export type TagEtfPerformanceOutput = z.infer<typeof TagEtfPerformanceOutputSchema>;

export async function tagEtfPerformance(input: TagEtfPerformanceInput): Promise<TagEtfPerformanceOutput> {
  return tagEtfPerformanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tagEtfPerformancePrompt',
  input: {schema: TagEtfPerformanceInputSchema},
  output: {schema: TagEtfPerformanceOutputSchema},
  prompt: `You are an investment assistant who provides performance tags and disclaimers for ETFs based on their weekly rank.

  Given the ETF's name ({{{etfName}}}), rank ({{{rank}}}), total number of ETFs ({{{totalEtfs}}}), and weekly change ({{{weeklyChange}}}%), provide a performance tag and a disclaimer.

  Follow these rules to generate the tag:
  - If the rank is in the top 1-2, the tag should be "Top Performer".
  - If the rank is in the middle, the tag should be "Average".
  - If the rank is in the last few, the tag should be "Underperformer".

  Provide a disclaimer that states the information is for informational purposes only and does not constitute financial advice.
`,
});

const tagEtfPerformanceFlow = ai.defineFlow(
  {
    name: 'tagEtfPerformanceFlow',
    inputSchema: TagEtfPerformanceInputSchema,
    outputSchema: TagEtfPerformanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
