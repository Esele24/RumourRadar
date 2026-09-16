import { ClaimCategory } from '@/types';
import { NIGERIAN_AUTHORITY_DOMAINS } from './constants';

export interface RouteTarget {
  priorityDomains: string[];
  searchTerms: string[];
  primaryAuthorityName: string;
}

export function getNigeriaRouteTarget(category: ClaimCategory, entity: string, claimText: string): RouteTarget {
  const domains: string[] = [];
  let primaryAuthority = 'Nigerian Regulatory Authority';

  switch (category) {
    case 'banking_fintech':
      domains.push('cbn.gov.ng', 'sec.gov.ng', 'ndic.gov.ng', 'businessday.ng', 'nairametrics.com', 'thecable.ng');
      if (entity.toLowerCase().includes('opay')) {
        domains.unshift('opayweb.com');
        primaryAuthority = 'Central Bank of Nigeria (CBN) / OPay Media Office';
      } else {
        primaryAuthority = 'Central Bank of Nigeria (CBN)';
      }
      break;

    case 'elections_politics':
      domains.push('inec.gov.ng', 'statehouse.gov.ng', 'premiumtimesng.com', 'channelstv.com', 'thecable.ng');
      primaryAuthority = 'INEC / Federal Government of Nigeria';
      break;

    case 'education_exams':
      domains.push('jamb.gov.ng', 'waecnigeria.org', 'neconigeria.org', 'nuc.edu.ng', 'premiumtimesng.com');
      if (entity.toLowerCase().includes('jamb')) primaryAuthority = 'Joint Admissions and Matriculation Board (JAMB)';
      else if (entity.toLowerCase().includes('waec')) primaryAuthority = 'West African Examinations Council (WAEC)';
      else primaryAuthority = 'Federal Ministry of Education';
      break;

    case 'public_health':
      domains.push('ncdc.gov.ng', 'health.gov.ng', 'who.int', 'premiumtimesng.com', 'channelstv.com');
      primaryAuthority = 'Nigeria Centre for Disease Control (NCDC)';
      break;

    case 'telecom_tech':
      domains.push('ncc.gov.ng', 'nitda.gov.ng', 'techcabal.com', 'techpoint.africa', 'thecable.ng');
      primaryAuthority = 'Nigerian Communications Commission (NCC)';
      break;

    case 'security_alerts':
      domains.push('defenceinfo.mil.ng', 'npf.gov.ng', 'humanglemedia.com', 'thecable.ng', 'premiumtimesng.com');
      primaryAuthority = 'Nigeria Defence Headquarters / Police Force';
      break;

    default:
      domains.push('premiumtimesng.com', 'channelstv.com', 'thecable.ng', 'punchng.com');
      primaryAuthority = 'National Verified News Reporting';
  }

  return {
    priorityDomains: domains,
    searchTerms: [entity, category.replace('_', ' ')],
    primaryAuthorityName: primaryAuthority
  };
}
