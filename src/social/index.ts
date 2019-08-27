// SEE: https://github.com/bradvin/social-share-urls#linkedin

const openWindow = (url: string, width: number, height: number): void => {
  const left = (screen.width - width) * 0.5;
  const top = (screen.height - height) * 0.5;

  window.open(
    url,
    'popupShare',
    `width=${width},height=${height},top=${top},left=${left},scrollbars=1,location=0,personalbar=0,menubar=0,resizable=0,status=0,toolbar=0`
  );
};

/**
 * Open pop up to share on Facebook
 *
 * @param shareURL URL to share
 * @param shareDescription Description to share
 * @param width Width of the embed
 * @param height Height of the embed
 */
export const shareFacebook = (
  shareURL: string,
  shareDescription: string,
  width: number = 570,
  height: number = 570
): void =>
  openWindow(
    `http://www.facebook.com/sharer.php?u=${shareURL}&t=${encodeURIComponent(shareDescription)}`,
    width,
    height
  );

/**
 * Open pop up to share on LinkedIn
 *
 * @param shareURL URL to share
 * @param shareDescription Description to share
 * @param width Width of the embed
 * @param height Height of the embed
 */
export const shareLinkedIn = (
  shareURL: string,
  shareDescription: string,
  width: number = 570,
  height: number = 570
): void =>
  openWindow(
    `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      `${shareURL}?t=${Date.now()}`
    )}&summary=${encodeURIComponent(shareDescription)}`,
    width,
    height
  );

/**
 * Open pop up to share on Twitter
 *
 * @param shareURL URL to share
 * @param shareDescription Description to share
 * @param width Width of the embed
 * @param height Height of the embed
 */
export const shareTwitter = (
  shareURL: string,
  shareDescription: string,
  width: number = 570,
  height: number = 570
): void =>
  openWindow(
    `https://twitter.com/intent/tweet/?text=${encodeURIComponent(
      shareDescription
    )}&url=${shareURL}`,
    width,
    height
  );
