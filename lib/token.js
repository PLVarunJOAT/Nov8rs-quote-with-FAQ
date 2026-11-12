/* Signed, compressed quote links. The link carries the client's answers; prices are always
   recalculated from the catalog on the server, so editing a link can't change a price.
   QUOTE_SECRET (any long random string) must be set in Vercel. */
const crypto = require('crypto');
const zlib = require('zlib');

const b64u = buf => Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64u = s => Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64');

function secret() {
  const s = process.env.QUOTE_SECRET;
  if (!s || s.length < 16) throw new Error('QUOTE_SECRET is not set (use a long random string)');
  return s;
}
const sig = data => b64u(crypto.createHmac('sha256', secret()).update(data).digest()).slice(0, 32);

function sign(payload) {
  const data = b64u(zlib.deflateRawSync(Buffer.from(JSON.stringify(payload))));
  return data + '.' + sig(data);
}

function verify(token) {
  if (typeof token !== 'string' || token.length > 8000) return null;
  const [data, s] = token.split('.');
  if (!data || !s) return null;
  const expected = sig(data);
  if (s.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(s), Buffer.from(expected))) return null;
  try { return JSON.parse(zlib.inflateRawSync(unb64u(data)).toString()); } catch { return null; }
}

const linkDays = () => Math.max(1, parseInt(process.env.QUOTE_LINK_DAYS || '30', 10));
const expired = p => !p || !p.iat || Date.now() > p.iat + linkDays() * 864e5;

module.exports = { sign, verify, expired, linkDays };
