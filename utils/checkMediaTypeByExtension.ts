export function checkMediaTypeByExtension(
  url: string,
): 'image' | 'video' | 'unknown' {
  const extension = url
    .split('.')
    .pop()
    ?.toLowerCase()
    .split('?')[0]
    .split('#')[0];

  if (!extension) return 'unknown';

  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg'];
  const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];

  if (imageExtensions.includes(extension)) return 'image';
  if (videoExtensions.includes(extension)) return 'video';

  return 'unknown';
}
