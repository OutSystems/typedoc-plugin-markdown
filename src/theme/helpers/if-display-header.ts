export function ifDisplayHeader(settings: any, opts: any) {
  return settings && settings.mdEngine === 'gitbook' ? opts.inverse(this) : opts.fn(this);
}
