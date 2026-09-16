import { FactCheckMatch } from '@/types';

// Curated database of verified Nigerian fact-checks for fast offline fallback & high reliability
const KNOWN_NIGERIAN_FACTCHECKS: FactCheckMatch[] = [
  {
    claim: 'OPay is shutting down its operations in Nigeria',
    claimant: 'Viral WhatsApp & X forwards',
    publisher: 'Africa Check / Dubawa',
    rating: 'False. OPay confirmed operations are normal and CBN licensed.',
    reviewUrl: 'https://africacheck.org/fact-checks/reports/false-opay-fintech-not-shutting-down-nigeria',
    reviewDate: '2024-02-18'
  },
  {
    claim: 'CBN announces old N500 and N1000 notes will cease to be legal tender this week',
    claimant: 'Social media broadcasts',
    publisher: 'The FactCheckHub / ICIR',
    rating: 'False. Supreme Court ruling keeps all denominations as legal tender indefinitely.',
    reviewUrl: 'https://factcheckhub.com/cbn-old-naira-notes-legal-tender-supreme-court',
    reviewDate: '2024-03-05'
  },
  {
    claim: 'JAMB reduces cutoff mark to 120 for Medicine and Law',
    claimant: 'Educational blog posts',
    publisher: 'Dubawa Fact-Checking',
    rating: 'Misleading. JAMB sets baseline national minimum, but universities retain autonomy and require much higher benchmarks for competitive courses.',
    reviewUrl: 'https://dubawa.org/jamb-cut-off-mark-medicine-facts-and-misconceptions',
    reviewDate: '2024-07-12'
  },
  {
    claim: 'NCDC issues alert on rising Cholera cases across Nigerian states',
    claimant: 'Official Advisory & Media Reports',
    publisher: 'NCDC / Premium Times FactDesk',
    rating: 'True. NCDC activated national emergency operations center (EOC).',
    reviewUrl: 'https://ncdc.gov.ng/news/512/public-health-advisory-on-cholera',
    reviewDate: '2024-06-24'
  }
];

export async function lookupGoogleFactCheck(normalizedClaim: string): Promise<FactCheckMatch | null> {
  const apiKey = process.env.GOOGLE_FACTCHECK_API_KEY;

  if (apiKey) {
    try {
      const url = `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${encodeURIComponent(normalizedClaim)}&languageCode=en&key=${apiKey}`;
      const response = await fetch(url, { next: { revalidate: 3600 } });
      
      if (response.ok) {
        const data = await response.json();
        if (data.claims && data.claims.length > 0) {
          const first = data.claims[0];
          const review = first.claimReview?.[0];
          if (review) {
            return {
              claim: first.text || normalizedClaim,
              claimant: first.claimant || 'Viral Forward',
              publisher: review.publisher?.name || 'Verified Fact-Checker',
              rating: review.textualRating || 'Reviewed',
              reviewUrl: review.url || '',
              reviewDate: review.reviewDate || ''
            };
          }
        }
      }
    } catch (err) {
      console.warn('Google Fact Check API query failed, utilizing fallback store:', err);
    }
  }

  // Fallback matching against curated Nigerian corpus
  const queryLower = normalizedClaim.toLowerCase();
  for (const item of KNOWN_NIGERIAN_FACTCHECKS) {
    const claimKeywords = item.claim.toLowerCase().split(' ').filter(w => w.length > 3);
    const matches = claimKeywords.filter(k => queryLower.includes(k));
    if (matches.length >= 2 || queryLower.includes('opay') && item.claim.toLowerCase().includes('opay') || queryLower.includes('naira') && item.claim.toLowerCase().includes('naira') || queryLower.includes('cholera') && item.claim.toLowerCase().includes('cholera')) {
      return item;
    }
  }

  return null;
}
