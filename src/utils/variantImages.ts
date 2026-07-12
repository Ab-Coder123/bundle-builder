export function getVariantImage(productId: string, variantName: string, fallback: string): string {
  const nameLower = (variantName || '').toLowerCase();
  if (productId === 'wyze-cam-pan-v3') {
    if (nameLower === 'white') return '/images/variants/wyze-cam-pan-v3-white.png';
    if (nameLower === 'black') return '/images/variants/wyze-cam-pan-v3-black.png';
  }
  if (productId === 'wyze-cam-v4') {
    if (nameLower === 'white') return '/images/variants/wyze-cam-v4-white.png';
    if (nameLower === 'grey' || nameLower === 'gray') return '/images/variants/wyze-cam-v4-grey.png';
    if (nameLower === 'black') return '/images/variants/wyze-cam-v4-black.png';
  }
  if (productId === 'wyze-battery-cam-pro') {
    if (nameLower === 'white') return '/images/variants/wyze-battery-cam-pro-white.png';
    if (nameLower === 'black') return '/images/variants/wyze-battery-cam-pro-black.png';
  }
  if (productId === 'wyze-cam-floodlight-v2' || productId === 'wyze-floodlight-v2') {
    if (nameLower === 'white') return '/images/variants/wyze-floodlight-v2-white.png';
    if (nameLower === 'black') return '/images/variants/wyze-floodlight-v2-black.png';
  }
  return fallback;
}
