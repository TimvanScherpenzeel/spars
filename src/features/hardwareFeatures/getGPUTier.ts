// Vendor
import { getGPUTier } from 'detect-gpu';

export default ((): { tier: string; type: string } => getGPUTier())();
