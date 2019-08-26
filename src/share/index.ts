export const share = (
  type: string,
  shareURL: string,
  shareDescription: string,
  width: number = 570,
  height: number = 570
): void => {
  const openWindow = (url: string): void => {
    const left = (screen.width - width) * 0.5;
    const top = (screen.height - height) * 0.5;

    window.open(
      url,
      'popupShare',
      `width=${width},height=${height},top=${top},left=${left},scrollbars=1,location=0,personalbar=0,menubar=0,resizable=0,status=0,toolbar=0`
    );
  };

  switch (type) {
    case 'facebook':
      openWindow(
        `http://www.facebook.com/sharer.php?u=${shareURL}&t=${encodeURIComponent(shareDescription)}`
      );
      break;
    case 'linkedin':
      openWindow(
        `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          `${shareURL}?t=${Date.now()}`
        )}&summary=${encodeURIComponent(shareDescription)}`
      );
      break;
    case 'twitter':
      openWindow(
        `https://twitter.com/intent/tweet/?text=${encodeURIComponent(
          shareDescription
        )}&url=${shareURL}`
      );
      break;
    default:
      console.warn(`Unknown share type: ${type}`);
      break;
  }
};
