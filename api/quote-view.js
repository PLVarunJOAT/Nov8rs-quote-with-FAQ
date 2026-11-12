/* GET /api/quote-view?t=<token>  Checks the link and returns the answers for the quote page. */
const { verify, expired, linkDays } = require('../lib/token');

module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  let p;
  try { p = verify(String(req.query.t || '')); } catch (e) { return res.status(500).json({ error: e.message }); }
  if (!p) return res.status(404).json({ error: 'invalid' });
  if (expired(p)) return res.status(410).json({ error: 'expired' });
  return res.status(200).json({ quote_id: p.id, issued_at: p.iat, expires_at: p.iat + linkDays() * 864e5, answers: p.a });
};
