export function getDeviceInfo(userAgent?: string) {
  const ua = typeof window !== "undefined" ? navigator.userAgent : userAgent || "";
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
  const isDesktop = !isMobile;

  return { isMobile, isDesktop };
}
