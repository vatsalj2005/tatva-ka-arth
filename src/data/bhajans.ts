/**
 * Re-exports from content-loader for backward compatibility.
 * All bhajan data is now auto-discovered from /src/content/ filesystem.
 */
export type { BhajanData as Bhajan, SubdivisionData as Subdivision } from './content-loader';
export {
  subdivisions,
  bhajans,
  getBhajansBySubdivision,
  searchContent,
} from './content-loader';

// Legacy compatibility
export { getBhajanById } from './content-loader';
