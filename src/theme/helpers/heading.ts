export function heading(level: string, settings: any) {
  return settings && settings.mdEngine === 'gitbook'
    ? level.substring(0, level.length - 1)
    : level;
}
