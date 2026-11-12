/* NOV8RS quote engine: company config (catalog, questions, pricing rules, FAQs, use cases) + generic engine.
   Loaded by the pages (<script src="/quote-engine.js">) and by the API functions (require). */
/* =====================================================================
   COMPANY CONFIG: NOV8RS
   Everything specific to one company lives in this file: brand, SEO, catalog
   (prices + deliverables), question flow, pricing rules, offers and texts.
   To launch the quote system for another company, copy this folder and edit it.
   Pricing: carried over unchanged from the previous build (Fulfilment Pricing
   10-26, "Quote Builder" tab). Enterprise GAS-EO from $29,997/mo, Cold Email
   Management $1,497/mo from month 2, NOV8RS System yearly $2,997.
   ===================================================================== */
(function(root){
const ctx={};
const has=(a,v)=>Array.isArray(a)&&a.includes(v);
const isAny=(x,arr)=>arr.includes(x);
const webOn=a=>has(a.services,'brand')&&has(a.br_needs,'website');
const mk=(a,c)=>has(a.services,'mkt')&&has(a.mk_channels,c);
const pkgOn=a=>has(a.services,'infra')&&isAny(a.infra_pkg,['std','sf']);
const fmt=n=>'$'+Math.round(n).toLocaleString('en-US');

const brand={
  name:'NOV8RS', legalName:'NOV8RS', short:'NOV8RS',
  /* TODO: confirm these four before going live */
  url:'https://nov8rs.io', quoteUrl:'https://nov8rs.io/',
  email:'hello@nov8rs.io', bookingUrl:'https://nov8rs.io', ownerName:'our strategy team',
  address:{street:'',city:'',region:'',postal:'',country:''},
  logo:'brand/nov8rs-logo.png', mark:'brand/nov8rs-mark-128.png', markLarge:'brand/nov8rs-mark-512.png',
  colors:{accent:'#94660F',accentDark:'#F0B43E',gold:'#E2A93B',black:'#000000'},
  tagline:'Project Quote Builder',
  /* Trust signals shown under the first question. Only add REAL figures, e.g.
     proof:['120+ businesses helped','4.9★ from 80 reviews','12 years in business'] */
  proof:[]
};

const seo={
  title:'Instant Quote: Branding, Marketing, GAS-EO & AI Automation | NOV8RS',
  description:'Build your own NOV8RS quote in minutes. Pick branding, marketing, GAS-EO (generative, answer and search engine optimization) or AI and automation services and get your price instantly, no sales call needed.',
  ogImage:'brand/nov8rs-mark-512.png',
  intro:'NOV8RS is a business operating system and done-for-you growth team. Use this quote builder to pick the services you need and get a real price and invoice on the spot.',
  links:[
    {href:'https://nov8rs.io',label:'NOV8RS home'},
    {href:'https://nov8rs.io',label:'Book a strategy call'}
  ],
  faq:[
    {q:'How does the NOV8RS quote builder work?',a:'Pick the services you want, answer a few questions about your business, and enter your name and email. Your quote appears right away, and we email you a copy with a secure link to pay and get started.'},
    {q:'Do I have to get on a sales call?',a:'No. The quote builder prices your project instantly. If anything you pick needs a closer look, we confirm the details with you before sending an invoice.'},
    {q:'What is GAS-EO?',a:'GAS-EO stands for Generative, Answer and Search Engine Optimization. It gets your business cited by AI tools like ChatGPT and Gemini, featured in answer boxes and voice search, and ranked on Google and Maps.'},
    {q:'Can I pay yearly?',a:'Yes, for your platform subscription. Pay the NOV8RS System or the Unlimited CRM plan for a full year and get two months free. Services are billed monthly.'},
    {q:'What is the NOV8RS System?',a:'It is our CRM platform with unlimited AI, unlimited API access and unlimited sub-accounts. Most of our services run on it, and one subscription covers everything on your quote.'}
  ]
};

/* Catalog: price fields once (one-time), mo (monthly), yr (yearly override).
   inc = deliverables shown on the quote (from the sheet's descriptions). */
const catalog={
 'NV-WEB-AISETUP':{name:'AI Website Setup',cat:'Websites',once:97,inc:['A ready-made website design, set up for you', 'Looks great on phones', 'Basic setup so Google can find it', 'A contact form', 'Live quickly', '1 page included']},
 'NV-WEB-PAGE':   {name:'Website Page Add-On',cat:'Websites',once:50,unit:'page',inc:['Extra pages for your website', 'Designed to match your brand', 'Set up so Google can find them']},
 'NV-WEB-ESS':    {name:'Essentials Bundle',cat:'Websites',once:497,platform:true,inc:['Your website, set up for you', 'Up to 7 pages', 'Connected to the NOV8RS System, so enquiries go straight in', 'Essential add-on tools (SnapOns)', 'Everything you need to get online fast']},
 'NV-WEB-CUSTOM': {name:'Custom Website',cat:'Websites',once:4997,from:true,review:true,platform:true,inc:['Designed from scratch for your business', 'Matches your brand', 'Set up so Google can find it', 'AI tools built in', 'Fully connected to the NOV8RS System']},
 'NV-AI-REC':     {name:'AI Receptionist',cat:'AI Systems',once:997,platform:true,inc:['Answers your phone calls', 'Talks to callers and answers their questions', 'Passes important calls to you', 'Works 24/7']},
 'NV-AI-SBI':     {name:'AI Sales Bot (Inbound)',cat:'AI Systems',once:997,platform:true,inc:['Replies to new enquiries straight away', 'Follows up automatically', 'Keeps chasing until they book or buy']},
 'NV-AI-SBIO':    {name:'AI Sales Bot (In + Outbound)',cat:'AI Systems',once:997,platform:true,inc:['Everything the AI sales bot does', 'Also calls new enquiries back for you', 'Your sales follow-up, done automatically']},
 'NV-AI-SUP':     {name:'AI Support Bot',cat:'AI Systems',once:997,platform:true,inc:['Answers your customers’ questions', 'Handles common questions automatically', 'Sends tricky questions to the right person', 'Works 24/7']},
 'NV-AI-CALL':    {name:'AI Callbot Campaign',cat:'AI Systems',once:997,platform:true,inc:['AI calls a list of people for you', 'Follows up and books appointments', 'Wins back old customers']},
 'NV-AI-ADS':     {name:'AI Ad Campaign Creation',cat:'AI Systems',once:997,platform:true,inc:['AI helps create your ads', 'Picks who sees them and how they look']},
 'NV-AI-STORE':   {name:'AI Storefront (Standard)',cat:'AI Systems',once:2997,platform:true,pkg:true,inc:['A website', 'AI that answers your calls', 'AI that replies to new enquiries', 'AI that answers customer questions', 'The NOV8RS System', 'Add-on tools (SnapOns)', 'Everything connected, working together']},
 'NV-AI-SFORCE':  {name:'AI Salesforce Bundle',cat:'AI Systems',once:4997,platform:true,pkg:true,inc:['Everything in AI Storefront', 'AI that calls people for you', 'Every AI tool we offer', 'Like a complete AI sales team']},
 'NV-CRM':        {name:'Unlimited CRM',cat:'Platform',mo:97,yr:997,yrNote:'Yearly: 2 months free',inc:['Keep track of all your customers and leads']},
 'NV-PLATFORM':   {name:'NOV8RS System',cat:'Platform',mo:297,yr:2997,yrNote:'Yearly: 2 months free',inc:['One place for your customers, leads and messages (a CRM)', 'Unlimited AI tools', 'Connects with your other apps', 'Separate workspaces for each location or team', 'One subscription covers everything on this quote']},
 'NV-BR-START':   {name:'Complete Branding Starter Pack',cat:'Branding & Design',once:297,noBundle:true,inc:['Your logo and brand colours', 'Business card and letterhead designs', 'Images for the top of your social media pages', '10 ready-made designs you can reuse', 'A simple guide on using your brand']},
 'NV-SEO-FULL':   {name:'Full Visibility Bundle',cat:'GAS-EO & Search Visibility',mo:1997,platform:true,inc:['Improve your website so Google ranks it higher', 'Show up in local searches and Google Maps', 'Set up your Google Business Profile', 'Help you appear in AI apps and quick answers', 'Your first month’s payment covers setup; work starts once it’s paid']},
 'NV-SEO-ENT':    {name:'Enterprise GAS-EO Program',cat:'GAS-EO & Search Visibility',mo:29997,from:true,review:true,platform:true,inc:['A custom plan for national brands, franchises and big companies', 'Planned with our team in a strategy meeting']},
 'NV-SOC-MGMT':   {name:'Social Media Management',cat:'Social Media',mo:497,platform:true,inc:['12–16 posts a month', 'A posting plan made in advance', 'Captions written for you', 'Posted for you on schedule']},
 'NV-ADS-MGMT':   {name:'Paid Ad Campaign Management',cat:'Paid Advertising',mo:997,platform:true,inc:['We improve your ads every week', 'We test different versions to find what works', 'We keep an eye on your budget', 'A simple monthly report', 'Priced per campaign, per app']},
 'NV-ADS-FUNNEL': {name:'Ad Campaign Funnel',cat:'Paid Advertising',once:997,platform:true,inc:['A page built to turn ad clicks into enquiries', 'Automatic follow-up messages', 'Enquiries go straight into your NOV8RS System']},
 'NV-ADS-PPC':    {name:'PPC Full Launch Package',cat:'Paid Advertising',once:1497,platform:true,inc:['We set up your ads', 'We run them for the first month', 'Ad designs and wording included']},
 'NV-EM-COLD':    {name:'Cold Email Full System',cat:'Email Marketing & Cold Outreach',once:2997,platform:true,inc:['Separate email accounts set up just for outreach', 'We set it up and launch it', 'We run it for the first month', 'Fully done for you']},
 'NV-EM-MGMT':    {name:'Cold Email Management',cat:'Email Marketing & Cold Outreach',mo:1497,platform:true,inc:['We keep it running and improving from month 2']},
 'NV-EM-LEAD':    {name:'Cold Email Lead Conversion Fee',cat:'Email Marketing & Cold Outreach',unitPrice:50,unitText:'per lead converted',inc:['A small fee for each new customer it brings you, billed monthly']},
 'NV-PK-TRAFFIC': {name:'Traffic Pack',cat:'Bundled Core Services',mo:2997,platform:true,pkg:true,inc:['We run 2 ad campaigns for you', 'Weekly improvements, testing, budget checks and a monthly report', 'Full GAS-EO: rank higher on Google, show up on Maps, Google Business Profile set up', 'Setup included: your first month’s payment covers it']},
 'NV-PK-CONVERT': {name:'Convert Pack',cat:'Bundled Core Services',mo:3997,platform:true,pkg:true,inc:['We run 3–5 ad campaigns for you on 3 or more apps', 'Weekly improvements, testing, budget checks and a monthly report', 'Full GAS-EO: rank higher on Google, show up on Maps, Google Business Profile set up', 'Setup included: your first month’s payment covers it']},
 'NV-CUSTOM':     {name:'Custom request',cat:'Custom',contact:true,review:true}
};
const PLATFORM_NOTE='One subscription covers everything on this quote.';

const sections=[
{id:'svc',title:'Services',eyebrow:'Free quote · no sales call needed',heading:'What can we help you with?',
 lede:'Pick everything you need. Answer a few easy questions and we\u2019ll email you a quote made for your business.',show:()=>true,showText:'Always',qs:[
 {id:'services',label:'Pick all that apply',type:'multi',req:true,big:true,opts:[
  {v:'brand',l:'Branding & website',d:'A logo, a look and a website that match how good my business is'},
  {v:'mkt',l:'Marketing',d:'I want more customers, but I don\u2019t have time for ads, social media or emails'},
  {v:'gaseo',l:'Get found online (GAS-EO)',d:'People can\u2019t find me on Google, Google Maps or AI apps like ChatGPT'},
  {v:'infra',l:'AI & automation',d:'I miss calls, reply to people late, or do the same tasks over and over'}]}]},

/* 1. BRANDING */
{id:'brand',title:'Branding',eyebrow:'1 · Branding & website',heading:'What do you need?',lede:'Pick everything you want help with.',
 show:a=>has(a.services,'brand'),showText:'services includes Branding',qs:[
 {id:'br_needs',label:'Choose what you need',type:'multi',req:true,opts:[
  {v:'kit',l:'Logo & brand kit',d:'Your logo, colours, business cards, social media images and ready-made designs',sku:'NV-BR-START'},
  {v:'website',l:'Website',d:'A new website, or a better version of the one you have'},
  {v:'other',l:'Something else',d:'Tell us exactly what you need',sku:'NV-CUSTOM'}]},
 {id:'br_logo',label:'Do you have a logo today?',type:'single',req:true,show:a=>has(a.br_needs,'kit'),showText:'br_needs includes Brand identity kit',opts:[
  {v:'none',l:'No, I need a new one'},{v:'refresh',l:'Yes, but it needs updating'},{v:'keep',l:'Yes, and I want to keep it'}]},
 {id:'br_other',label:'Tell us what you need',type:'textarea',req:true,show:a=>has(a.br_needs,'other'),showText:'br_needs includes Something else',ph:'Example: packaging for 3 products and a name for a new product line'}]},

{id:'web',title:'Website',eyebrow:'1 · Website',heading:'Tell us about your website',lede:'This helps us pick the right website for you.',
 show:webOn,showText:'Branding selected AND br_needs includes Website',qs:[
 {id:'web_kind',label:'Which one sounds most like what you want?',type:'single',req:true,opts:[
  {v:'ai',l:'A simple, professional website',d:'Quick to set up, looks great on phones, includes a contact form',sku:'NV-WEB-AISETUP'},
  {v:'ess',l:'A website plus tools to run my business',d:'Up to 7 pages, plus our system to keep track of customers and leads',sku:'NV-WEB-ESS'},
  {v:'custom',l:'A fully custom website',d:'Designed from scratch just for you, with AI tools built in',sku:'NV-WEB-CUSTOM'}]},
 {id:'web_pages',label:'How many pages do you need?',type:'single',req:true,show:a=>isAny(a.web_kind,['ai','ess']),showText:'web_kind = fast site OR site + system',
  help:'For example: Home, About, Services and Contact. Not sure? Pick your best guess.',opts:[
  {v:'1',l:'1 page'},{v:'3',l:'2–3 pages'},{v:'5',l:'4–5 pages'},{v:'7',l:'6–7 pages'},{v:'10',l:'8–10 pages'},{v:'15',l:'11–15 pages'},{v:'16',l:'More than 15',review:true}],
  rule:'Pages beyond what the package includes bill as Website Page Add-On, one per extra page. AI Website Setup includes 1 page; Essentials includes 7. "More than 15" goes to review.'},
 {id:'web_current',label:'Do you have a website right now?',type:'single',req:true,opts:[{v:'no',l:'No'},{v:'yes',l:'Yes, replace it with the new one'}]},
 {id:'web_url',label:'What is your website address?',type:'url',req:true,show:a=>a.web_current==='yes',showText:'web_current = yes',ph:'https://'},
 {id:'web_custom',label:'What should your website do?',type:'textarea',req:true,show:a=>a.web_kind==='custom',showText:'web_kind = custom',ph:'For example: take bookings, sell products, show your work. Websites you like help too.'}]},

/* 2. MARKETING */
{id:'mkt',title:'Marketing',eyebrow:'2 · Marketing',heading:'How do you want to get more customers?',
 lede:'Pick everything you want help with. Don’t see it? Choose "Something else" and tell us.',
 show:a=>has(a.services,'mkt'),showText:'services includes Marketing',qs:[
 {id:'mk_channels',label:'Choose what you need',type:'multi',req:true,opts:[
  {v:'ads',l:'Online ads',d:'Ads on Google, Facebook, Instagram and more'},
  {v:'social',l:'Social media posts',d:'We create and post content for you every week'},
  {v:'cold',l:'Emails to new business customers',d:'We email businesses you want to sell to and book calls for you'},
  {v:'other',l:'Something else',d:'Tell us exactly what you need',sku:'NV-CUSTOM'}]},
 {id:'mk_other',label:'Tell us what you need',type:'textarea',req:true,show:a=>has(a.mk_channels,'other'),showText:'mk_channels includes Something else',ph:'Example: direct mail to 5,000 homes plus a referral program'},
 {id:'mk_goal',label:'What matters most to you?',type:'single',req:true,opts:[
  {v:'leads',l:'More leads and calls'},{v:'sales',l:'More online sales'},{v:'bookings',l:'More bookings'},{v:'brand',l:'More people knowing my name'},{v:'retention',l:'Customers coming back'}]}]},

{id:'ads',title:'Ads',eyebrow:'2 · Online ads',heading:'Tell us about your ads',lede:'We start with an audit of your business, competitors and any ads you run, then send you our recommendations before anything goes live.',
 tip:a=>!has(a.services,'gaseo')?'Tip: get ads and GAS-EO together as a bundle and pay less than buying them separately. Your quote will show how much you save.':'',
 show:a=>mk(a,'ads'),showText:'Marketing selected AND mk_channels includes Paid ads',qs:[
 {id:'ads_mode',label:'What do you need?',type:'single',req:true,opts:[
  {v:'launch',l:'Start new ads',d:'We set them up, create the ads and run them for the first month',sku:'NV-ADS-PPC'},
  {v:'manage',l:'Take over ads I already run',d:'We improve them every week and send you a monthly report',sku:'NV-ADS-MGMT'},
  {v:'build',l:'Just create the ads',d:'We build them, and you run them yourself',sku:'NV-AI-ADS'}],
  rule:'launch → PPC Full Launch Package, then Paid Ad Campaign Management monthly from month 2. manage → Paid Ad Campaign Management. build → AI Ad Campaign Creation.'},
 {id:'ads_campaigns',label:'How many ad campaigns do you want to run?',type:'single',req:true,show:a=>isAny(a.ads_mode,['launch','manage']),showText:'ads_mode = launch OR manage',opts:[
  {v:'1',l:'1'},{v:'2',l:'2'},{v:'3',l:'3'},{v:'4',l:'4'},{v:'5',l:'5'},{v:'6',l:'6 or more',review:true}],
  help:'Each app counts separately. For example, the same ad on Google and on Facebook counts as 2.',
  rule:'Without GAS-EO: Paid Ad Campaign Management × count (1 = Marketer Pack). With GAS-EO: 1 → priced separately + Traffic Pack offer, 2 → Traffic Pack, 3–5 → Convert Pack. 6 or more → review.'},
 {id:'ads_platforms',label:'Where do you want your ads to show?',type:'multi',req:true,show:a=>isAny(a.ads_mode,['launch','manage']),showText:'ads_mode = launch OR manage',opts:[
  {v:'google',l:'Google'},{v:'meta',l:'Facebook & Instagram'},{v:'youtube',l:'YouTube'},{v:'tiktok',l:'TikTok'},{v:'linkedin',l:'LinkedIn'},{v:'bing',l:'Microsoft / Bing'}]},
 {id:'ads_spend',label:'How much do you plan to spend on ads each month?',type:'single',req:true,help:'You pay this straight to Google, Facebook and so on. It isn\u2019t paid to us.',opts:[
  {v:'1',l:'Under $1,000'},{v:'3',l:'$1,000–$3,000'},{v:'7',l:'$3,000–$7,500'},{v:'15',l:'$7,500+'}]},
 {id:'ads_funnel',label:'Do you need a page for people who click your ads, plus automatic follow-up messages?',type:'single',req:true,opts:[
  {v:'yes',l:'Yes, please build it',d:'A page that turns clicks into enquiries, and messages that follow up for you',sku:'NV-ADS-FUNNEL'},{v:'no',l:'No, I already have this'}]}]},

{id:'social',title:'Social media',eyebrow:'2 · Social media',heading:'Tell us about your social media',lede:'We plan, create and post 12–16 posts a month for you.',
 show:a=>mk(a,'social'),showText:'Marketing selected AND mk_channels includes Social media',qs:[
 {id:'so_platforms',label:'Where should we post?',type:'multi',req:true,opts:[
  {v:'fb',l:'Facebook'},{v:'ig',l:'Instagram'},{v:'tiktok',l:'TikTok'},{v:'linkedin',l:'LinkedIn'},{v:'x',l:'X'},{v:'gbp',l:'Google (your business listing)'}]},
 {id:'so_volume',label:'Is 12–16 posts a month (3–4 a week) enough?',type:'single',req:true,opts:[
  {v:'yes',l:'Yes',sku:'NV-SOC-MGMT'},{v:'more',l:'I need more than that',review:true}]}]},

{id:'cold',title:'Emails to businesses',eyebrow:'2 · Emails to new business customers',heading:'Tell us who you want to reach',lede:'We set everything up, write the emails and run it for the first month. After that we keep it running monthly, plus a small fee for each customer it brings you.',
 show:a=>mk(a,'cold'),showText:'Marketing selected AND mk_channels includes Cold email',qs:[
 {id:'ce_list',label:'Do you have a list of people to email?',type:'single',req:true,opts:[{v:'yes',l:'Yes'},{v:'no',l:'No, please find them for me'}]},
 {id:'ce_who',label:'Who do you want to reach?',type:'text',req:true,ph:'Example: HVAC company owners in Missouri and Kansas'}]},

/* 3. GAS-EO */
{id:'gaseo',title:'Get found online',eyebrow:'3 · Get found online (GAS-EO)',heading:'Tell us how you want to be found',
 lede:'We help your business show up when people search on Google and Google Maps, ask voice assistants, or ask AI apps like ChatGPT for a recommendation. We start with an audit and send you our recommendations, then keep improving it every month. Most businesses see real progress in 3–6 months.',
 tip:a=>!(mk(a,'ads')&&isAny(a.ads_mode,['launch','manage']))?'Tip: add online ads and get both as a bundle, for less than buying them separately. Your quote will show how much you save.':'',
 show:a=>has(a.services,'gaseo'),showText:'services includes GAS-EO',qs:[
 {id:'seo_focus',label:'Where do you most want to show up?',type:'multi',req:true,opts:[
  {v:'geo',l:'In AI apps',d:'ChatGPT, Gemini and others'},{v:'aeo',l:'In quick answers',d:'Google\u2019s answer boxes and voice search'},{v:'seo',l:'On Google search',d:'Higher up the results page'},{v:'unsure',l:'Not sure, you choose'}]},
 {id:'seo_scope',label:'Where are your customers?',type:'single',req:true,opts:[
  {v:'local',l:'Near my business (1 location)'},{v:'multi',l:'Near my business (more than 1 location)'},{v:'national',l:'Across a region or the whole country',review:true},{v:'ecom',l:'I sell online',review:true},
  {v:'enterprise',l:'We\u2019re a large company',d:'National brand, franchise or big software company'}],
  rule:'Full Visibility Bundle is priced per location. Several locations → bundle × location count. Regional/national and online store → review. Enterprise → qualifying questions below.'},
 {id:'seo_locations',label:'How many locations?',type:'number',req:true,min:2,max:500,show:a=>a.seo_scope==='multi',showText:'seo_scope = several locations',ph:'e.g. 4',
  rule:'Full Visibility Bundle × locations.'},
 {id:'ent_revenue',label:'Yearly revenue (roughly)',type:'single',req:true,show:a=>a.seo_scope==='enterprise',showText:'seo_scope = enterprise',opts:[
  {v:'2',l:'Under $2M'},{v:'10',l:'$2M–$10M'},{v:'50',l:'$10M–$50M'},{v:'50p',l:'$50M+'}]},
 {id:'ent_locations',label:'How many locations, franchises or cities do you serve?',type:'single',req:true,show:a=>a.seo_scope==='enterprise',showText:'seo_scope = enterprise',opts:[
  {v:'10',l:'1–10'},{v:'24',l:'11–24'},{v:'99',l:'25–99'},{v:'100',l:'100+'}],
  rule:'Qualifies for the Enterprise GAS-EO Program (from $29,997/mo, strategy meeting) at $10M+ revenue OR 25+ locations. Otherwise priced as regional/national (review).'},
 {id:'seo_gbp',label:'Do you have a Google Business Profile? (Your free listing on Google Maps)',type:'single',req:true,show:a=>isAny(a.seo_scope,['local','multi']),showText:'seo_scope = local OR several locations',opts:[
  {v:'yes',l:'Yes'},{v:'no',l:"No / I don't know"}]},
 {id:'seo_url',label:'What is your website address?',type:'url',req:true,show:a=>!webOn(a)||a.web_current==='yes',showText:'Website NOT being built, OR replacing a current site',ph:'https://'}]},

/* 4. INFRASTRUCTURE */
{id:'infra',title:'AI & automation',eyebrow:'4 · AI & automation',heading:'What should AI do for you?',lede:'Pick a ready-made package, or choose just the jobs you want AI to do.',
 show:a=>has(a.services,'infra'),showText:'services includes Infrastructure',qs:[
 {id:'infra_pkg',label:'Which option suits you?',type:'single',req:true,opts:[
  {v:'std',l:'AI Storefront',d:'A website plus AI that answers your calls, replies to new enquiries and helps your customers, all in one',sku:'NV-AI-STORE'},
  {v:'sf',l:'AI Salesforce',d:'Everything in AI Storefront, plus AI that calls people for you and books appointments. Like a full AI sales team.',sku:'NV-AI-SFORCE'},
  {v:'pick',l:'Let me pick the jobs'}],
  rule:'Both packages include a website and every bot they list (AI Storefront includes the support bot; AI Salesforce includes all bots), so no individual bots are sold with them. A template website chosen under Branding is folded in; a custom website stays as its own line.'},
 {id:'ai_tools',label:'Which jobs should AI do for you?',type:'multi',req:true,show:a=>a.infra_pkg==='pick',showText:'infra_pkg = individual tools',opts:[
  {v:'rec',l:'Answer my phone calls, day and night',sku:'NV-AI-REC'},
  {v:'sbi',l:'Reply to new enquiries and follow up',sku:'NV-AI-SBI'},
  {v:'sbo',l:'Call new enquiries back for me',sku:'NV-AI-SBIO'},
  {v:'sup',l:'Answer my customers\u2019 questions',sku:'NV-AI-SUP'},
  {v:'call',l:'Call lists of people for me',d:'To book appointments or win back old customers',sku:'NV-AI-CALL'}],
  rule:'Leads + outbound follow-up together bill as one AI Sales Bot (In + Outbound).'},
 {id:'ai_crm',label:'Do you use software to keep track of your customers? (called a CRM)',type:'single',req:true,show:a=>a.infra_pkg==='pick',showText:'infra_pkg = individual tools',opts:[
  {v:'pl',l:'Yes, NOV8RS'},{v:'none',l:'No'},{v:'other',l:'Yes, a different one',d:'Like HubSpot or Salesforce'}],
  rule:'NOV8RS → no new subscription. None → NOV8RS System added. Something else → NOV8RS System added + integration review.'},
 {id:'infra_other',label:'Anything else you\u2019d like done automatically?',type:'textarea',ph:'For example: send new online orders into my accounting software'}]},

{id:'wrap',title:'Timeline',eyebrow:'Almost done',heading:'Nearly there',lede:'',show:()=>true,showText:'Always',qs:[
 {id:'timeline',label:'When would you like to start?',type:'single',req:true,opts:[{v:'now',l:'Right away'},{v:'30',l:'Within 30 days'},{v:'90',l:'In the next 60–90 days'},{v:'explore',l:'Just looking for now'}]},
 {id:'pl_existing',label:'Are you already on the NOV8RS System?',type:'single',req:true,help:'Our all-in-one system for your customers, messages and AI tools. Most of our services run on it.',
  show:a=>ctx.needsPlatform(a)&&a.ai_crm!=='pl',showText:'quote includes a service that runs on the NOV8RS System',opts:[
  {v:'yes',l:'Yes, I already have it'},{v:'no',l:'No'}],
  rule:'No → NOV8RS System ($297/mo) added once. Yes → not charged again.'}]},

{id:'optin',title:'Get your quote',eyebrow:'Last step',heading:'Your personalised plan is ready',
 lede:'Tell us where to send it. Your quote arrives by email in a few minutes.',show:()=>true,showText:'Always (pricing gate)',qs:[
 {id:'email',label:'Email',type:'email',req:true,ph:'you@company.com'},
 {id:'fname',label:'First name',type:'text',req:true,half:true},
 {id:'lname',label:'Last name',type:'text',half:true},
 {id:'biz',label:'Business name',type:'text'},
 {id:'phone',label:'Mobile phone',type:'tel',ph:'(555) 555-0100',help:'Required only if you check the texting box below.',
  rule:'Optional, but must be a valid 10-digit number when sms_consent is checked.'},
 {id:'consent',label:'Permission to email you',type:'consent',req:true,
  text:'Yes, email me my quote, along with follow-up about the services I picked. I can unsubscribe at any time.'},
 {id:'sms_consent',label:'Permission to text you',type:'consent',
  text:'Also text me about my quote at the number above. Message and data rates may apply. Reply STOP to opt out at any time.'}]}
];;

/* =====================================================================
   PRICING RULES
   ===================================================================== */
function entQualified(a){
  return has(a.services,'gaseo')&&a.seo_scope==='enterprise'&&(isAny(a.ent_revenue,['50','50p'])||isAny(a.ent_locations,['99','100']));
}
function price(a,k){
  const {add,include,O}=k; const svc=a.services||[];
  const usesPlatform=()=>k.lines.some(l=>l.sku&&catalog[l.sku].platform);
  const pkg=pkgOn(a);
  const pkgName=a.infra_pkg==='sf'?'AI Salesforce':'AI Storefront';

  /* Branding */
  if(has(svc,'brand')){
    if(has(a.br_needs,'kit')) add('Branding','NV-BR-START');
    if(has(a.br_needs,'other')) add('Branding','NV-CUSTOM',{name:'Custom branding request',note:'Priced after review'});
  }
  if(webOn(a)&&a.web_kind){
    const g='Website';
    if(a.web_kind==='custom') add(g,'NV-WEB-CUSTOM',{note:'Starting price; final scope confirmed after review'});
    else if(pkg) include(g,'Website',`Included in ${pkgName}`);
    else{
      add(g,a.web_kind==='ess'?'NV-WEB-ESS':'NV-WEB-AISETUP');
      const incl=a.web_kind==='ess'?7:1, pages=+a.web_pages||0;
      if(a.web_pages==='16') add(g,'NV-CUSTOM',{name:'More than 15 pages',note:'Page count confirmed after review'});
      else if(pages>incl) add(g,'NV-WEB-PAGE',{qty:pages-incl,name:`Website Page Add-On × ${pages-incl}`});
    }
  }

  /* Ads + GAS-EO packs */
  const ent=entQualified(a);
  const adsOngoing=mk(a,'ads')&&isAny(a.ads_mode,['launch','manage']);
  const nCamp=+a.ads_campaigns||1;
  const usePack=adsOngoing&&has(svc,'gaseo')&&nCamp>=2&&!ent;
  const packSku=nCamp===2?'NV-PK-TRAFFIC':'NV-PK-CONVERT';
  let packSave=0, setupSave=0;

  /* Marketing */
  if(has(svc,'mkt')){
    if(mk(a,'ads')&&a.ads_mode){
      const g='Online ads', n=a.ads_campaigns;
      if(a.ads_mode==='build') add(g,'NV-AI-ADS');
      if(a.ads_mode==='launch'&&n){
        if(usePack){ setupSave+=catalog['NV-ADS-PPC'].once*nCamp;
          include(g,nCamp>1?`Campaign launch × ${nCamp}`:'Campaign launch',`Included in the ${catalog[packSku].name}`,['Campaign setup','Creative pack']); }
        else add(g,'NV-ADS-PPC',{qty:nCamp,name:nCamp>1?`PPC Full Launch Package × ${nCamp}`:undefined,note:'Setup, creative pack and first month of management'});
      }
      if(adsOngoing&&!usePack&&n){
        add(g,'NV-ADS-MGMT',{qty:nCamp,m2:a.ads_mode==='launch',name:nCamp>1?`Paid Ad Campaign Management × ${nCamp}`:'Paid Ad Campaign Management (Marketer Pack)',review:n==='6',
          note:[nCamp>1?'$997 per campaign per platform':'',a.ads_mode==='launch'?'Starts month 2':'',n==='6'?'Count confirmed after review':''].filter(Boolean).join(' · ')});
      }
      if(a.ads_funnel==='yes') add(g,'NV-ADS-FUNNEL');
    }
    if(mk(a,'social')&&a.so_volume) add('Social media','NV-SOC-MGMT',{review:a.so_volume==='more',note:a.so_volume==='more'?'Extra posting volume confirmed after review':''});
    if(mk(a,'cold')){const g='Emails to businesses';
      add(g,'NV-EM-COLD');
      add(g,'NV-EM-MGMT',{m2:true,note:'Starts month 2'});
      add(g,'NV-EM-LEAD');}
    if(has(a.mk_channels,'other')) add('Marketing','NV-CUSTOM',{name:'Custom marketing request',note:'Priced after review'});
  }

  /* GAS-EO */
  if(has(svc,'gaseo')&&a.seo_scope){
    const g='Getting found online (GAS-EO)';
    if(ent) add(g,'NV-SEO-ENT',{note:'Starting price · strategy meeting required before invoicing'});
    else{
      const scopeReview=O('seo_scope',a.seo_scope).review||a.seo_scope==='enterprise';
      const locs=a.seo_scope==='multi'?Math.max(2,parseInt(a.seo_locations)||2):1;
      if(usePack){
        const sep=catalog['NV-ADS-MGMT'].mo*nCamp+catalog['NV-SEO-FULL'].mo;
        packSave=Math.max(0,sep-catalog[packSku].mo);
        add(g,packSku,{review:scopeReview||a.ads_campaigns==='6',note:`${nCamp} campaigns + GAS-EO for 1 location · package setup only`});
        if(locs>1) add(g,'NV-SEO-FULL',{qty:locs-1,name:`Full Visibility Bundle × ${locs-1} additional location${locs>2?'s':''}`,note:`${fmt(catalog['NV-SEO-FULL'].mo)} per location`});
      }else{
        add(g,'NV-SEO-FULL',{qty:locs,name:locs>1?`Full Visibility Bundle × ${locs} locations`:undefined,review:scopeReview,
          note:(locs>1?`${fmt(catalog['NV-SEO-FULL'].mo)} per location`:'')+(scopeReview?(locs>1?' · ':'')+'Scope confirmed after review':'')});
      }
    }
  }

  /* Infrastructure: packages include every bot they list, so no add-on bots are sold with them */
  if(has(svc,'infra')&&a.infra_pkg){
    const g='AI & automation';
    if(a.infra_pkg==='std') add(g,'NV-AI-STORE');
    if(a.infra_pkg==='sf') add(g,'NV-AI-SFORCE');
    if(a.infra_pkg==='pick'){
      const t=a.ai_tools||[];
      if(has(t,'rec')) add(g,'NV-AI-REC');
      if(has(t,'sbo')) add(g,'NV-AI-SBIO'); else if(has(t,'sbi')) add(g,'NV-AI-SBI');
      if(has(t,'sup')) add(g,'NV-AI-SUP');
      if(has(t,'call')) add(g,'NV-AI-CALL');
      if(a.ai_crm==='other') add(g,'NV-CUSTOM',{name:'Integration with your current CRM',note:'Priced after review'});
    }
    if((a.infra_other||'').trim()) add(g,'NV-CUSTOM',{name:'Custom automation request',note:'Priced after review'});
  }

  /* NOV8RS System: once per client, only if something on the quote runs on it */
  const platform=usesPlatform();
  const hasPL=a.ai_crm==='pl'||a.pl_existing==='yes';
  /* platform_plan='crm' is never asked in the form: the server sets it only when the client accepts the
     lower-cost Unlimited CRM offer from the email sequence. */
  if(platform&&!hasPL) add('Your system',a.platform_plan==='crm'?'NV-CRM':'NV-PLATFORM',{note:a.platform_plan==='crm'?'Lower-cost platform plan':PLATFORM_NOTE});
  if(platform&&hasPL) include('Your system','NOV8RS System','Already subscribed');

  return {packSave,setupSave,usePack,packSku:usePack?packSku:null,adsOngoing,nCamp,platform,ent};
}

/* Pack offers shown on the quote when a client has ads OR GAS-EO but not on a pack */
function offer(a,r){
  if(r.usePack||r.ent||a.ads_campaigns==='6') return null;
  const C=catalog, seo=C['NV-SEO-FULL'].mo, ad=C['NV-ADS-MGMT'].mo, n=r.nCamp, launch=mk(a,'ads')&&a.ads_mode==='launch';
  const pk=c=>c<=2?'NV-PK-TRAFFIC':'NV-PK-CONVERT';
  const setupNote=()=>launch?` You also skip the ${fmt(C['NV-ADS-PPC'].once*n)} campaign launch setup on your quote now: on a pack you only pay the package setup.`:'';
  const hasSeo=has(a.services,'gaseo');
  if(r.adsOngoing&&!hasSeo){
    const camps=Math.max(n,2), sku=pk(camps), now=ad*n, pack=C[sku].mo, sep=ad*camps+seo;
    return {kind:'addSeo',sku,name:C[sku].name,pack,now,sep,save:sep-pack,
      head:`Add full GAS-EO${n===1?' and a second campaign':''} for ${fmt(pack-now)}/mo more`,
      body:`The ${C[sku].name} covers ad management for ${camps} campaigns plus full GAS-EO for one location at ${fmt(pack)}/mo. Bought separately, that’s ${fmt(sep)}/mo.${setupNote()}`,
      cta:`Switch to the ${C[sku].name}`,
      apply:A=>{if(!has(A.services,'gaseo'))A.services=[...A.services,'gaseo'];if(!A.ads_campaigns||A.ads_campaigns==='1')A.ads_campaigns='2';return 'gaseo';}};
  }
  if(hasSeo&&r.adsOngoing&&n===1){
    const pack=C['NV-PK-TRAFFIC'].mo, now=ad+seo, sep=ad*2+seo;
    return {kind:'addCampaign',sku:'NV-PK-TRAFFIC',name:'Traffic Pack',pack,now,sep,save:sep-pack,
      head:`Add a second campaign for ${fmt(pack-now)}/mo more`,
      body:`The Traffic Pack covers 2 ad campaigns plus GAS-EO for ${fmt(pack)}/mo. You’re at ${fmt(now)}/mo for 1 campaign plus GAS-EO now; a second campaign on its own would be another ${fmt(ad)}/mo.${setupNote()}`,
      cta:'Switch to the Traffic Pack',apply:A=>{A.ads_campaigns='2';return null;}};
  }
  if(hasSeo&&!r.adsOngoing){
    const pack=C['NV-PK-TRAFFIC'].mo, sep=seo+ad*2;
    return {kind:'addAds',sku:'NV-PK-TRAFFIC',name:'Traffic Pack',pack,now:seo,sep,save:sep-pack,
      head:`Add ad management for 2 campaigns for ${fmt(pack-seo)}/mo more`,
      body:`The Traffic Pack covers GAS-EO plus ad management for 2 campaigns at ${fmt(pack)}/mo, and you only pay the package setup. Bought separately, that’s ${fmt(sep)}/mo.`,
      cta:'Switch to the Traffic Pack',
      apply:A=>{if(!has(A.services,'mkt')){A.services=[...A.services,'mkt'];A.mk_channels=['ads'];}
        else if(!has(A.mk_channels,'ads'))A.mk_channels=[...(A.mk_channels||[]),'ads'];
        if(!isAny(A.ads_mode,['launch','manage']))A.ads_mode=undefined;
        A.ads_campaigns='2';return A.mk_goal?'ads':'mkt';}};
  }
  return null;
}

/* Short notes under the quote table */
function notes(a,r,E){
  const out=[];
  if(r.usePack){
    const parts=[];if(r.packSave)parts.push(`${fmt(r.packSave)}/mo`);if(r.setupSave)parts.push(`${fmt(r.setupSave)} in setup`);
    if(parts.length) out.push({kind:'saving',text:`You’re saving ${parts.join(' and ')} with the ${catalog[r.packSku].name}. You only pay the package setup.`});
  }
  if(mk(a,'cold')) out.push({kind:'note',text:'The cold email lead conversion fee is billed monthly based on leads converted, so it isn’t included in the totals.'});
  if(mk(a,'ads')) out.push({kind:'note',text:'Ad spend is paid directly to the ad platforms and is not part of this quote.'});
  return out;
}

const texts={
  enterprise:{title:'Book your strategy meeting',body:'Enterprise GAS-EO programs start at $29,997/mo and are scoped with our strategy team before anything is invoiced.',cta:'Book a strategy meeting'},
  yearlyHint:'Yearly billing applies to your NOV8RS System subscription only: pay for the year and get 2 months free. Services stay monthly.',
  errorContact:'email hello@nov8rs.io'
};

/* GHL tags for each pillar (used by the quote server) */
const ghl={pillars:{brand:['Branding','q-branding'],mkt:['Marketing','q-marketing'],gaseo:['GAS-EO','q-gaseo'],infra:['Infrastructure','q-infrastructure']}};

/* Lower-cost offer the email sequence makes if price is the hold-up: swap the platform plan. */
const downsell={from:'NV-PLATFORM',to:'NV-CRM',answer:{platform_plan:'crm'},tag:'crm-offer-eligible',acceptedTag:'crm-offer-accepted'};

/* ---------------------------------------------------------------------
   HELP CONTENT: FAQs, use cases and pairings, per service topic.
   Written for clients who are new to these services. No prices here:
   pricing only appears on the emailed quote page.
   Answers marked c:1 depend on company policy: confirm them before launch.
   --------------------------------------------------------------------- */
const topics={
  brand:{name:'Branding',short:'Brand kit'},
  website:{name:'Website',short:'Website'},
  ads:{name:'Online Ads',short:'Online ads'},
  social:{name:'Social Media',short:'Social media'},
  cold:{name:'Emails to Businesses',short:'Emails to businesses'},
  gaseo:{name:'Getting Found Online',short:'Getting found online'},
  infra:{name:'AI & Automation',short:'AI & automation'},
  billing:{name:'Prices & Payments',short:'Prices & payments'}
};

const faq={
 brand:[
  ['What will a new brand actually do for my business?','It makes people trust you faster. Example: two plumbers quote the same job. One has a clean logo, matching van, cards and website; the other has a blurry logo. Most people call the first one, and many will even pay a bit more. A strong brand helps you win more jobs and charge what you’re worth.'],
  ['What exactly do I get in the brand kit?','Everything you need to look professional everywhere: your logo, brand colours and fonts, business card and letterhead designs, images for the top of your social media pages, 10 ready-made designs you can reuse (like posts and flyers), and a simple guide on using it all.'],
  ['I already have a logo. Can you work with it?','Yes. We can create a brand-new logo, refresh the one you have (for example, a cleaner, modern version that still feels like you), or keep your logo and build everything else around it.'],
  ['How many designs will I see, and can I ask for changes?','You’ll see first ideas, tell us what you like and don’t like, and we refine them until it feels right for your business. The exact number of ideas and changes is confirmed when we start.',1],
  ['How will I use my brand day to day?','Everywhere your customers see you: your website, social media, van or shop sign, uniforms, invoices, quotes and emails. Example: send the files to your printer for new business cards, and your designer or staff use the guide so everything looks the same.'],
  ['Will the files work for printing and online?','Yes. You get sharp, high-quality files that stay clear at any size, from a tiny social media icon to a big shop sign or a printed T-shirt.'],
  ['Who owns the logo and designs?','The final designs are yours to use for your business once the project is paid in full.',1],
  ['What do you need from me to start?','Just the basics: your business name, what you do, who your customers are, and any colours or styles you love or hate. Showing us 2–3 brands you admire helps us get it right faster.'],
  ['How long does it take?','Most of the time goes into feedback, so quick replies mean a faster finish. We give you a clear timeline when we start.',1],
  ['What are social headers and templates?','Headers are the big banner images at the top of your Facebook, LinkedIn or YouTube page, the first thing visitors see. Templates are ready-made designs for posts, offers and flyers that you can edit and reuse, so you never start from a blank page.'],
  ['Do you print business cards and letterheads?','We design them and give you print-ready files. Send them to any printer, local or online, and they come out perfectly.'],
  ['What if I don’t like the first designs?','That’s normal and part of the process. Tell us what isn’t working, for example “too dark” or “feels too corporate”, and we adjust the direction until you’re happy.']
 ],
 website:[
  ['What will a new website do for my business?','It works as your best salesperson, 24/7. Example: a roofer’s new website shows photos of past jobs, reviews and a “Get a free quote” button. Someone searching at 10pm can request a quote instead of calling a competitor in the morning. More enquiries, without more work.'],
  ['Which website option should I choose?','Simple website: you need to look professional online, fast. Website plus tools: you also want enquiries to land in one place so you can follow up and never lose a lead. Fully custom: you want a one-of-a-kind design or special features, like online booking or selling products.'],
  ['How many pages do I need?','Most small businesses need 4–7: Home, About, Services (or one page per main service), Contact, and often Reviews or FAQ. Example: a cleaning company might have one page each for home, office and end-of-lease cleaning, which also helps Google show the right page to the right customer.'],
  ['Will it look good on phones?','Yes. It automatically adjusts to phones, tablets and computers. Most visitors now come from their phone, so this is where most of your enquiries will come from.'],
  ['Do I need to buy a domain and hosting?','A domain is your web address, like yourbusiness.com. If you have one, we connect it. If not, we help you get one. We confirm hosting details when we start.',1],
  ['Can you improve my current website instead of starting over?','Yes. We keep what works (your content, pictures and the pages Google already likes), fix what doesn’t, and turn it into a site that brings in more enquiries.'],
  ['Can I update it myself?','Yes. Simple changes like text, photos, prices or opening hours are easy, and we show you how. Example: add photos from this week’s jobs in a couple of minutes.'],
  ['Do I need to write everything and supply photos?','Send what you have: your services, your story and any photos. We turn it into clear wording that makes people want to contact you. Real photos of your work and team build the most trust.'],
  ['Will my new website show up on Google?','It’s set up so Google can read and understand it, which is the foundation. To actually climb the rankings and show up on Google Maps and AI apps, add “Get found online” (GAS-EO), which works on it every month.'],
  ['How quickly can it go live?','The simple website is the fastest option. Bigger and custom sites take longer, mostly depending on how fast we get your content and feedback. You get a timeline when we start.',1],
  ['What happens to my old website and email?','When the new site is ready, we switch your web address over to it. Your business email is usually separate from your website and keeps working, and we check this before going live.'],
  ['Do I own the website?','Your content, photos and web address are yours. Ownership and hosting terms for the website build are confirmed before you pay.',1]
 ],
 ads:[
  ['What results can online ads bring?','Customers, fast. Example: a dentist runs Google ads for “emergency dentist near me”. People with tooth pain click, call and book the same day. Unlike most marketing, ads can bring calls within days of going live, and you can see exactly what each new customer cost.'],
  ['What happens first?','We start with an audit. We look at your business, your competitors, your current ads (if you have any) and your website, then send you our recommendations: where to advertise, who to target, what budget to start with and what results to expect. Then we launch.'],
  ['How soon will I get leads or calls?','Often within the first week or two after launch. The first few weeks are also a learning period while we test what works, so results usually get better, and cheaper, over the first couple of months.',1],
  ['Where should my ads run: Google, Facebook, Instagram or somewhere else?','Google: people already searching for what you do (“plumber near me”). Facebook and Instagram: local services and products people discover while scrolling, like a new café or a home renovation offer. LinkedIn: selling to other businesses. Our audit tells you exactly which ones suit you.'],
  ['How much should I spend on ads?','It depends on your area and competition. Many small businesses start with $1,000–$3,000 a month. Example: if a new customer is worth $2,000 to you and ads bring one in for $150, you can spend more with confidence. We show you these numbers every month.'],
  ['Is my ad budget included in your price?','No. Your ad budget is paid straight to Google, Facebook and so on, from your own account. Our fee covers planning, creating, running and improving the ads.'],
  ['What counts as one campaign?','One set of ads with one goal and budget, on one app. Running the same ads on Google and Facebook counts as two, because each is set up and improved separately.'],
  ['What’s the difference between starting new ads, taking over my ads, and just creating them?','Start new ads: we set everything up, create the ads and run them for the first month. Take over: we run the ads you already have and improve them every week. Just create: we build the ads and you run them yourself.'],
  ['Why would I need a separate page for my ads?','People who click an ad want one thing. Example: someone clicks “Free roof inspection” and lands on a page all about that offer with one button to book, instead of your homepage where they get lost. This simple change often turns many more clicks into enquiries, and automatic follow-up messages chase the ones who don’t book straight away.'],
  ['How will I know it’s working?','Every month you get a simple report: what you spent, how many calls and enquiries came in, and what each one cost. Example: “$1,500 spent, 32 enquiries, $47 per enquiry”.'],
  ['What does “testing” mean?','We run two versions of an ad side by side, for example “Same-day repairs” vs “5-star rated”, and keep whichever brings more customers. Small wins every month add up to cheaper leads.'],
  ['Can I pause or stop my ads?','Your ad spending can be paused anytime from your account. Notice terms for our management service are confirmed before you pay.',1]
 ],
 social:[
  ['What results can social media bring?','Trust and repeat business. Example: a bakery posting fresh bakes 3–4 times a week stays top of mind, so locals think of them for birthdays and events, and new customers who check their page see an active, popular business. Social media rarely brings instant sales, but it makes everything else work better.'],
  ['What do you do for me?','We plan what to post each month, create 12–16 posts, write the captions, and post them for you on schedule. You run your business; your pages stay active.'],
  ['Which apps should I be on?','Wherever your customers already are. Most local businesses do best on Facebook, Instagram and their Google listing. If you sell to other businesses, LinkedIn. Being great on two is better than being quiet on five.'],
  ['Who creates the posts?','We do: the designs and the captions, written in your style. Real photos of your work, team and happy customers work best, so send us whatever you have.'],
  ['Do I get to approve posts first?','Yes. You see the plan before anything is posted and can ask for changes.',1],
  ['Are 12–16 posts a month enough?','For most small businesses, yes: that’s 3–4 posts a week, enough to look active and stay top of mind. Need more? Choose “I need more than that” and we’ll tailor it.'],
  ['What kind of posts will you make?','A mix that builds trust and brings enquiries. Examples: before-and-after photos, customer reviews, tips (“3 signs your boiler needs a service”), special offers, behind-the-scenes and team introductions.'],
  ['Do you reply to comments and messages?','Our standard plan creates and posts your content. If you’d like replies handled too, tell us and we’ll add it, or pair it with our AI that answers common questions automatically.',1],
  ['Will social media bring me new customers?','Mostly it builds trust with people who already know you or are checking you out. To reach brand-new people in your area, pair it with online ads, which put your best posts in front of them.'],
  ['Do you need my passwords?','No. The apps let you give us posting access safely, without sharing your password. You stay the owner and can remove our access anytime.'],
  ['How will I know it’s growing?','We track your followers, how many people see your posts, and how many like, comment and share, and show you the trend. Example: “Your posts reached 8,400 local people this month, up 22%.”'],
  ['Is boosting posts included?','No. Boosting means paying the app to show a post to more people. That budget is separate, and our online ads service is the best way to do it properly.']
 ],
 cold:[
  ['What results can emails to businesses bring?','Booked sales calls with businesses that have never heard of you. Example: a bookkeeping firm emails 1,000 local restaurant owners with a short, personal note. A handful reply “Yes, let’s talk”, and a few become long-term clients. Each new client can be worth thousands a year.'],
  ['Who is this good for?','Businesses that sell to other businesses, like accountants, IT support, cleaning companies, recruiters, consultants, manufacturers and software. If your customers are the public, online ads or getting found online usually work better.'],
  ['Is it legal? Will it look like spam?','Emailing businesses is allowed in many countries when you follow the rules: be honest about who you are and make it easy to opt out. We build that in and send at a careful pace, so emails land in inboxes, not spam. Rules vary by country, so we check yours.'],
  ['Why do you set up separate email accounts?','We create email accounts just for this and start them slowly, so email providers trust them. It protects your main business email, so your everyday emails keep landing normally.'],
  ['Do I need a list of contacts?','No. If you have one, great. If not, we find them for you based on who you want to reach, for example “owners of dental clinics in Texas with 5–20 staff”.'],
  ['Who writes the emails?','We do. Short, personal emails that sound like a real person, usually a first email plus a few friendly follow-ups. Example: “Hi Sarah, noticed your clinic just opened a second location. We help practices like yours…”'],
  ['How soon will I see replies?','The first few weeks go into setting up and warming up the new email accounts. Replies usually start once the emails are fully running, and improve as we learn which messages work best.',1],
  ['How many emails are sent?','We start small and increase steadily, to keep your emails landing in inboxes. The plan is confirmed with you when we start.',1],
  ['What is the fee per customer?','After the first month, you pay a small fee for each new customer the emails bring you. It means we only earn more when you do. Exactly what counts as a new customer is agreed before we start.',1],
  ['What happens when someone replies?','Interested replies come straight to you, or into your NOV8RS System, so you can follow up quickly. Add our AI tools and every reply can get an instant answer, even at night.'],
  ['What do you do each month after the first month?','We keep the emails running, find new businesses to contact, improve the messages based on what gets replies, and protect your sending reputation.'],
  ['Could this damage my reputation?','Not when it’s done well. Our emails are relevant, polite and personal, sent in small numbers, and anyone can opt out in one click. Mass spam is what hurts brands, and we don’t send it.']
 ],
 gaseo:[
  ['What results can I expect, and how long does it take?','Expect real progress in 3–6 months: your business starts showing up higher on Google, on Google Maps and in AI answers, and people find you and call you without you paying for each click. Example: a family dentist goes from page 3 to the top results for “dentist near me”, and new patients call every week. It keeps growing as long as the work continues.'],
  ['What happens first?','We start with an audit. We check your website, your Google listing, your reviews, your competitors and where you show up today (on Google, Maps and AI apps like ChatGPT), then send you our recommendations: what we’ll fix, what we’ll build and what results to expect.'],
  ['What is GAS-EO, in simple words?','It makes your business easy to find wherever people look for help today: Google search, Google Maps, voice assistants like Siri and Alexa, and AI apps like ChatGPT and Gemini.'],
  ['How is this different from ads?','Ads are like renting: leads stop when you stop paying. Getting found online is like owning: it takes 3–6 months to build, then brings people to you every month without paying per click. Many businesses do both, using ads for leads now and GAS-EO for the long run.'],
  ['What are AI answers, and why do they matter?','More and more people ask ChatGPT or Google’s AI things like “Who’s the best plumber near me?” instead of scrolling results. These tools only recommend a few businesses. We work to make sure yours is one of them.'],
  ['What is a Google Business Profile?','Your free listing on Google and Google Maps, with your hours, phone number, photos and reviews. For local businesses it’s often the number one source of calls. Example: someone searches “hair salon open now”, sees your 4.9-star listing on the map and taps Call.'],
  ['Do you work only on Google, or on AI apps too?','All of it. The same work helps across Google search, Maps, voice search and AI apps, because they all look at your website, your Google listing, your reviews and what other websites say about you.'],
  ['Can you guarantee the #1 spot?','No one honestly can. Google and AI apps decide their own rankings. What we promise is doing the work that moves you up, and showing you clearly how your position, calls and visitors change every month.'],
  ['What do you do every month?','We improve your website’s wording and behind-the-scenes setup, keep your Google listing active with fresh photos and posts, help you get more reviews, get your business mentioned on trusted websites, and track where you show up.'],
  ['Why is it priced per location?','Each location competes in its own area with its own Google listing. Example: a gym in Dallas and one in Austin face different competitors, so each needs its own work.'],
  ['Do I need a new website for this to work?','Not always. If your site is solid, we work with it. If it’s slow, old or hard to use on a phone, a new website makes this much more effective, and our audit will tell you honestly.'],
  ['What if I stop after a while?','The improvements we’ve made stay in place, but your competitors keep working. Over time, without ongoing work, rankings usually slip back.']
 ],
 infra:[
  ['What results can AI bring my business?','You stop losing customers you never knew you had. Example: a plumber misses 10 calls a week while on jobs. Most of those callers ring the next plumber. With an AI receptionist, every call is answered, questions are handled and jobs are booked, even at 2am. More booked jobs, without hiring.'],
  ['What does the AI receptionist do?','It answers your phone 24/7 in a natural voice, answers common questions (prices, hours, areas you cover), takes the caller’s details, books appointments and passes urgent calls straight to you.'],
  ['Will callers know it’s AI?','The voice sounds natural, and most callers simply get their question answered and their appointment booked. We set it up to be open about being AI where local rules require it.'],
  ['What’s the difference between the sales bot, support bot and callbot?','Sales bot: replies to new enquiries in seconds and follows up until they book. Support bot: answers your existing customers’ questions. Callbot: calls lists of people for you, for example to book appointments or win back old customers.'],
  ['Why does replying fast matter so much?','People usually go with whoever answers first. Example: someone fills in three quote forms on a Sunday. The business that replies in 30 seconds books the job; the ones replying on Monday don’t. AI makes you that first reply, every time.'],
  ['What is the AI Storefront?','Everything in one package: a website, plus AI that answers your calls, replies to new enquiries and answers customer questions, all connected in the NOV8RS System. Ideal if you want the full setup without picking tools one by one.'],
  ['What’s the difference between AI Storefront and AI Salesforce?','AI Storefront handles everyone who contacts you. AI Salesforce does that too, and also reaches out: it calls people for you, follows up and books appointments, like a full AI sales team.'],
  ['How does the AI learn about my business?','We train it on your website, services, prices, common questions and how you like things handled. You test it and approve how it answers before it goes live, and we update it as your business changes.'],
  ['What if the AI can’t answer something?','It takes the person’s details and passes them to you or your team, so no enquiry is ever lost.'],
  ['Can it book appointments into my calendar?','Yes. It checks when you’re free and books straight into your calendar, then sends reminders, so fewer people forget to turn up.'],
  ['Is AI calling allowed where I am?','Rules depend on your country and state, and some places need permission before automated calls. We set up calling for people who’ve agreed to be contacted, and check your local rules before launch.',1],
  ['How long does setup take, and can I see what it says?','Setup depends on how many tools you choose; you get a timeline when we start, and we test everything with you first. Every call and chat is saved in your NOV8RS System, so you can read or listen to what was said anytime.',1]
 ],
 billing:[
  ['What is the NOV8RS System, and why is it on my quote?','Our all-in-one system where your customers, enquiries, messages and AI tools live (often called a CRM). Most of our services run on it, so it’s added once if anything on your quote needs it. Example: an enquiry from your website, a missed-call text and a Facebook message all land in one inbox.'],
  ['I already use other software. Do I still need it?','If the services you chose run on it, yes, because the AI and automation work inside it. If you already have the NOV8RS System, you won’t be charged for it again.'],
  ['What’s the difference between one-time and monthly prices?','One-time items are paid once, like building a website or setting up your AI. Monthly items are ongoing work, like running your ads or getting you found online, billed each month.'],
  ['What does “due today” mean?','What you pay to get started: all one-time items plus the first month of your monthly services.'],
  ['Why do some items start in month 2?','Some setup packages already include the first month of work, so that monthly fee only starts from month 2. You never pay twice for the same month.'],
  ['Should I pay monthly or yearly?','Where yearly is offered (for the NOV8RS System), paying for the year gets you 2 months free. Your services themselves are billed monthly.'],
  ['Why do some items need a quick check?','Their final price depends on details we confirm first, like how many pages or locations. We confirm them before you pay anything.'],
  ['What is a bundle, and how much does it save?','When you choose online ads and getting found online together, you get them as a bundle (the Traffic or Convert Pack), which costs less than buying both separately. Your quote shows the exact saving.'],
  ['Is there a contract?','Your quote shows exactly what you pay and how often. Any minimum commitment or notice period is confirmed with you before you pay.',1],
  ['Can I change or cancel my plan later?','You can add services anytime. Terms for changes or cancelling are confirmed before you start.',1],
  ['Is paying online safe?','Yes. Payments are handled by Stripe, used by millions of businesses worldwide. We never see or store your card details.'],
  ['What happens after I pay?','You get a receipt straight away, and our team contacts you to get started. For ads and getting found online, the first step is your audit and recommendations.']
 ]
};

/* Use cases shown in the right-hand panel: when it's a good choice, what it can lead to, what to pair it with. */
const insights={
 brand:{good:'You’re starting out, rebranding, or your look doesn’t match the quality of your work.',result:'People trust you faster and remember you. Example: customers pick the plumber with the smart van and logo over the one without.',
  pairs:[['website','Put your new brand to work on a website that matches it.'],['social','Show the new look to your audience every week.']]},
 website:{good:'You have no website, or yours is outdated, slow or hard to use on a phone.',result:'A website that brings you enquiries around the clock. Example: someone searching at 10pm requests a quote from you, not a competitor.',
  pairs:[['gaseo','Get your new site found on Google, Maps and AI answers from day one.'],['infra','AI answers and follows up every enquiry the new site brings in, 24/7.']]},
 ads:{good:'You want leads quickly and have a monthly budget for advertising.',result:'Calls and enquiries, often within days of going live. You see what each new customer costs, and can spend more on what works.',
  pairs:[['gaseo','Ads bring leads now while search rankings build. Bought together as a bundle, they cost less.'],['infra','AI follows up every ad lead within seconds, so none go cold.']]},
 social:{good:'Customers check you out online before buying, and you don’t have time to post.',result:'An active page that builds trust, so people think of you first and pick you when they check you out.',
  pairs:[['ads','Ads put your best content in front of new people, not just existing followers.'],['brand','A brand kit and templates make every post look consistent.']]},
 cold:{good:'You sell to other businesses and know exactly who your ideal client is.',result:'Sales calls booked with businesses that had never heard of you. One new client can be worth thousands a year.',
  pairs:[['infra','An AI sales bot replies and follows up the moment a prospect answers.'],['website','Prospects check your website before replying, and a strong site lifts reply rates.']]},
 gaseo:{good:'People search for what you do on Google, Maps or ChatGPT, and find your competitors instead.',result:'In 3–6 months, more people find you on Google, Maps and AI apps, and call you, without you paying per click.',
  pairs:[['ads','Ads bring leads while rankings build. Bought together as a bundle, they cost less.'],['website','A fast, well-built site ranks better and turns more visitors into customers.']]},
 infra:{good:'You miss calls, reply to leads late, or answer the same questions all day.',result:'No more missed calls or slow replies. Every enquiry is answered and booked, even at 2am, without hiring.',
  pairs:[['ads','More leads coming in means more value from your AI tools.'],['gaseo','More people find you, and AI makes sure none slip through.']]}
};

/* Which topics apply, given the answers so far. */
function selectedTopics(a){
  const t=[];const s=a.services||[];
  if(has(s,'brand')){ if(has(a.br_needs,'kit')||!(a.br_needs||[]).length) t.push('brand'); if(has(a.br_needs,'website')) t.push('website'); }
  if(has(s,'mkt')){ const c=a.mk_channels||[]; ['ads','social','cold'].forEach(x=>{if(has(c,x))t.push(x);}); }
  if(has(s,'gaseo')) t.push('gaseo');
  if(has(s,'infra')) t.push('infra');
  return t;
}
/* Topics to show FAQs for on each step. */
function stepTopics(sid,a){
  const sel=selectedTopics(a);
  const map={svc:null,brand:['brand','website'],web:['website'],mkt:['ads','social','cold'],ads:['ads'],social:['social'],cold:['cold'],gaseo:['gaseo'],infra:['infra'],wrap:['billing'],optin:['billing']};
  if(sid==='svc'){const t=[...sel];if(has(a.services,'mkt')&&!(a.mk_channels||[]).length)t.splice(t.indexOf('gaseo')<0?t.length:t.indexOf('gaseo'),0,'ads','social','cold');return t;}
  const t=map[sid]||[];
  if(sid==='mkt'){const c=(a.mk_channels||[]).filter(x=>t.includes(x));return c.length?c:t;}
  return t;
}
/* Add a recommended service. Returns the section id to visit for its questions. */
function addTopic(a,t){
  const add=(k,v)=>{a[k]=has(a[k],v)?a[k]:[...(a[k]||[]),v];};
  if(t==='brand'){add('services','brand');add('br_needs','kit');return 'brand';}
  if(t==='website'){add('services','brand');add('br_needs','website');return 'web';}
  if(['ads','social','cold'].includes(t)){add('services','mkt');add('mk_channels',t);return a.mk_goal?t:'mkt';}
  add('services',t);return t;
}

/* "Did you know?" tips the mascot shares, tagged by topic so they match the step the client is on.
   Each is shown at most once per visit. Keep them short, factual and in plain English. */
const tips=[
 ['gaseo','Your Google Business Profile is free, and for many local businesses it brings in more calls than their website.'],
 ['gaseo','Businesses with fresh photos on their Google listing tend to get more clicks and calls.'],
 ['gaseo','Replying to your Google reviews, good and bad, shows customers you care. Google encourages it too.'],
 ['gaseo','When people ask ChatGPT for “the best plumber near me”, it only names a few businesses. GAS-EO helps make you one of them.'],
 ['gaseo','AI apps look at your website, your reviews and what other websites say about you before recommending you.'],
 ['gaseo','Most clicks go to the first few results on Google. Very few people ever look at page 2.'],
 ['gaseo','Getting found online usually shows real progress in 3–6 months, then keeps bringing calls without paying per click.'],
 ['gaseo','One page for each service you offer helps Google show the right page to the right customer.'],
 ['gaseo','Your business name, address and phone number should match everywhere online. Mismatches confuse Google.'],
 ['gaseo','Voice searches like “Hey Siri, find a dentist open now” often pull answers straight from Google listings.'],
 ['gaseo','A slow website can lose visitors before it even loads. Speed matters to Google and to customers.'],
 ['gaseo','A steady trickle of new reviews every month helps more than 20 reviews in one week.'],
 ['ads','With Google search ads, you usually pay only when someone clicks, not when they see your ad.'],
 ['ads','Google ads can appear at the very top of the results, above everyone else.'],
 ['ads','Microsoft Ads (Bing) also shows your ads on Yahoo and partner sites, often for less per click than Google.'],
 ['ads','Bing users tend to be a bit older, often with more spending power, which suits many local services.'],
 ['ads','One Meta campaign can run on Facebook and Instagram at the same time.'],
 ['ads','Meta ads can reach people by area, age and interests, like homeowners within 10 miles of you.'],
 ['ads','“Retargeting” shows your ads to people who already visited your website, reminding them to come back.'],
 ['ads','With skippable YouTube ads, you usually don’t pay when people skip early.'],
 ['ads','LinkedIn ads can reach people by job title and company size, perfect for selling to businesses.'],
 ['ads','Sending ad clicks to a page made for that one offer usually brings more enquiries than sending them to your homepage.'],
 ['ads','Running two versions of an ad side by side often reveals a clear winner within weeks.'],
 ['ads','Ads can bring calls within days, while getting found online builds for the long run. Many businesses use both.'],
 ['ads','Your ad budget goes straight to Google or Meta, and you can turn it up or down anytime.'],
 ['ads','Before we launch any ads, we audit your business and competitors and send you our recommendations.'],
 ['website','Most people now visit websites on their phone, so your site has to work perfectly on a small screen.'],
 ['website','A clear “Call now” or “Get a quote” button on every page makes it easy for visitors to contact you.'],
 ['website','Real photos of your team and your work build more trust than stock photos.'],
 ['website','Showing reviews on your website helps visitors decide faster.'],
 ['website','Your website works 24/7. Someone at 10pm can request a quote instead of calling a competitor in the morning.'],
 ['website','A short form asking for 3–4 details usually gets more enquiries than a long one.'],
 ['website','Listing the areas you serve helps both customers and Google know where you work.'],
 ['website','The padlock in the browser bar shows your site is secure, so visitors feel safe sending their details.'],
 ['brand','People judge a business in seconds, and a clean logo and look makes a strong first impression.'],
 ['brand','Using the same colours and logo everywhere helps people recognise and remember you.'],
 ['brand','A strong brand helps you charge what you’re worth. People pay more for businesses they trust.'],
 ['brand','Brand guidelines keep everyone, from printers to staff, using your logo the right way.'],
 ['brand','Your social media banner is often the first thing people see on your page.'],
 ['brand','Matching vans, uniforms and signs turn every job into free advertising.'],
 ['social','People often check a business’s social media before buying, to see if it’s active and trusted.'],
 ['social','Posting 3–4 times a week is usually enough to stay top of mind.'],
 ['social','Before-and-after photos are some of the most engaging posts for service businesses.'],
 ['social','Short videos often reach more people than photos on Instagram and Facebook.'],
 ['social','Sharing customer reviews as posts is easy, free proof that people love working with you.'],
 ['social','Social media builds trust, and ads help those posts reach brand-new people nearby.'],
 ['social','Your Google listing can have posts too, and they show up right where people search.'],
 ['cold','Short, personal emails usually get more replies than long sales pitches.'],
 ['cold','Most replies come from the follow-up emails, not the first one.'],
 ['cold','Gmail and Yahoo require proper email setup and an easy unsubscribe for bulk senders. We handle both.'],
 ['cold','Using separate email accounts for outreach protects your main business email.'],
 ['cold','Mentioning something specific about the business you’re emailing makes a reply far more likely.'],
 ['cold','One new business client from email can be worth thousands a year.'],
 ['infra','Many callers who reach voicemail don’t leave a message. They just call the next business.'],
 ['infra','The faster you reply to an enquiry, the more likely you are to win the job.'],
 ['infra','An AI receptionist answers calls at 2am, on weekends and on holidays.'],
 ['infra','AI can book appointments straight into your calendar and send reminders, so fewer people forget to show up.'],
 ['infra','If the AI can’t answer something, it takes the person’s details and passes them straight to you.'],
 ['infra','AI can call your past customers to win them back, like a service or check-up reminder.'],
 ['infra','With every call, message and enquiry in one place, nothing slips through the cracks.']
];

/* Short reactions when the client picks something or moves forward. */
const reactions={
 greet:['Hi there! I’ll guide you through. It takes about 2 minutes, and there’s no sales call.','Welcome! Pick what you need and I’ll help along the way.'],
 pick:{
  brand:'Great pick. A strong look helps people trust you faster.',
  website:'Nice. A good website brings enquiries in around the clock.',
  mkt:'Good choice. Let’s get you more customers.',
  ads:'Great pick. Ads can bring calls within days of going live.',
  social:'Nice. An active page builds trust before people buy.',
  cold:'Smart. Emailing businesses can open doors to big clients.',
  gaseo:'Great pick. Expect real progress in 3–6 months, then calls without paying per click.',
  infra:'Smart move. No more missed calls or slow replies.'
 },
 pairDone:'Great combo! These two work even better together.',
 half:'Halfway there. Just a few more questions.',
 almost:'Last step! Your quote goes straight to your inbox.',
 stuck:'Just one answer missing above, then we can keep going.',
 done:'All set! Your quote is on its way to your inbox.'
};

/* Which option to highlight as "Pairs well" when the client picks something (upsell nudges). */
const suggest={
 services:{brand:['gaseo'],mkt:['gaseo'],gaseo:['mkt'],infra:['mkt']},
 br_needs:{kit:['website'],website:['kit']},
 mk_channels:{social:['ads'],ads:['social']}
};
const suggestWhy={services:{gaseo:'Get found on Google too',mkt:'More leads, faster'},br_needs:{website:'Show off your new look',kit:'Make your site look the part'},mk_channels:{ads:'Reach new people nearby',social:'Build trust while ads run'}};

const COMPANY={id:'nov8rs',brand,seo,catalog,sections,price,offer,notes,texts,ghl,downsell,
  help:{topics,faq,insights,selectedTopics,stepTopics,addTopic,tips,reactions,suggest,suggestWhy},
  init(E){ctx.engine=E;ctx.needsPlatform=a=>E.build({...a,pl_existing:undefined,ai_crm:a.ai_crm==='pl'?'none':a.ai_crm}).platform;},
  helpers:{entQualified,mk,webOn}};
root.COMPANY=COMPANY;
})(typeof window!=='undefined'?window:globalThis);

/* =====================================================================
   QUOTE ENGINE (generic). Works in the browser and in Node.
   A company plugs in its own config (see companies/<id>/company.js):
   catalog, question flow, pricing rules, offers, brand, SEO and texts.
   ===================================================================== */
(function(root){
function createEngine(C){
  const fmt=n=>'$'+Math.round(n).toLocaleString('en-US');
  const has=(a,v)=>Array.isArray(a)&&a.includes(v);
  const isAny=(x,arr)=>arr.includes(x);
  const CATALOG=C.catalog, SECTIONS=C.sections;
  const Q={};SECTIONS.forEach(s=>s.qs.forEach(q=>Q[q.id]=q));
  const O=(qid,v)=>(Q[qid]&&Q[qid].opts||[]).find(o=>o.v===v)||{};
  const visQ=(q,a)=>!q.show||q.show(a);
  const E={C,CATALOG,SECTIONS,Q,O,visQ,fmt,has,isAny};

  /* Turns answers into priced lines. Only catalog items with a yearly price (yr) can be billed yearly
     (here: the platform/CRM plans). Everything else always bills monthly. */
  function build(a){
    const L=[];
    const add=(g,sku,opt={})=>{const c=CATALOG[sku];if(!c)throw new Error('Unknown SKU '+sku);const qty=opt.qty||1;
      const once=opt.once!==undefined?opt.once:(c.once||0)*qty;
      const mo=opt.mo!==undefined?opt.mo:(c.mo||0)*qty;
      const annual=c.yr!==undefined;
      const yr=annual?(opt.yr!==undefined?opt.yr:c.yr*qty):0;
      const line={g,sku,name:opt.name||c.name,qty,once,mo,yr,annual,m2:!!opt.m2,from:!!(opt.from||c.from),contact:!!c.contact,
        unitPrice:c.unitPrice||0,unitText:c.unitText||'',review:!!(opt.review||c.review),note:opt.note||'',
        inc:opt.inc||c.inc||[],yrNote:c.yrNote||''};
      L.push(line);return line;};
    const include=(g,name,text,inc)=>{const l={g,sku:'',name,qty:1,once:0,mo:0,yr:0,included:text,inc:inc||[]};L.push(l);return l;};
    const extra=C.price(a,{add,include,has,isAny,O,CATALOG,fmt,lines:L,engine:E})||{};
    const once=L.reduce((s,x)=>s+x.once,0);
    const mo=L.reduce((s,x)=>s+x.mo,0);
    const due=once+L.reduce((s,x)=>s+(x.m2?0:x.mo),0);
    const annualLines=L.filter(x=>x.annual);
    const yearlySave=annualLines.reduce((s,x)=>s+Math.max(0,x.mo*12-x.yr),0);
    const review=L.filter(x=>x.review);
    return {lines:L,once,mo,due,yearlySave,hasAnnual:annualLines.length>0,review,...extra};
  }
  /* Totals for the billing toggle. Yearly only changes the lines that have a yearly price. */
  const yearlyOn=(l,y)=>y&&l.annual;
  const rec=(l,y)=>yearlyOn(l,y)?l.yr:l.mo;
  const per=(l,y)=>yearlyOn(l,y)?'/yr':'/mo';
  function totals(r,billing){
    const y=billing==='yearly'&&r.hasAnnual;
    const mo=r.lines.filter(l=>!yearlyOn(l,y)).reduce((s,l)=>s+l.mo,0);
    const yr=r.lines.filter(l=>yearlyOn(l,y)).reduce((s,l)=>s+l.yr,0);
    const due=r.once+r.lines.reduce((s,l)=>s+(yearlyOn(l,y)?l.yr:(l.m2?0:l.mo)),0);
    const text=[mo?fmt(mo)+'/mo':'',yr?fmt(yr)+'/yr':''].filter(Boolean).join(' + ')||'$0';
    return {y,mo,yr,due,text,label:y?'Yearly':'Monthly'};
  }
  E.rec=rec;E.per=per;E.yearlyOn=yearlyOn;
  E.build=build;E.totals=totals;
  E.offer=a=>C.offer?C.offer(a,build(a),E):null;
  E.notes=(a,r)=>C.notes?C.notes(a,r,E):[];
  if(C.init) C.init(E);
  return E;
}
root.createEngine=createEngine;
})(typeof window!=='undefined'?window:globalThis);
if(typeof module!=='undefined'&&module.exports) module.exports={COMPANY:globalThis.COMPANY,createEngine:globalThis.createEngine};


/* What can be paid online right now, shared by the quote page and the Stripe checkout function.
   - Items needing review, "from" prices, contact-for-rates and Enterprise quotes are not payable online.
   - Items that start in month 2 are listed as "starts later" and are not charged today.
   - Per-lead fees are billed on usage, never at checkout.
   - Stripe can't mix monthly and yearly items in one subscription, so yearly billing is only offered
     when every recurring item charged today has a yearly price. */
(function(root){
function checkoutPlan(E,r,billing){
  const lines=r.lines.filter(l=>l.sku);
  const blocked=lines.filter(l=>l.review||l.contact||l.from);
  const recurringNow=lines.filter(l=>l.mo&&!l.m2);
  const yearlyAllowed=recurringNow.length>0&&recurringNow.every(l=>l.annual);
  const y=billing==='yearly'&&yearlyAllowed;
  const items=[],later=[];
  lines.forEach(l=>{
    if(l.unitPrice&&!l.mo&&!l.once){later.push({name:l.name,text:E.fmt(l.unitPrice)+' '+l.unitText});return;}
    if(l.once) items.push({name:l.name,amount:l.once,interval:null});
    if(l.mo){
      if(l.m2) later.push({name:l.name,text:E.fmt(l.mo)+'/mo, starts month 2'});
      else items.push({name:l.name,amount:y&&l.annual?l.yr:l.mo,interval:y&&l.annual?'year':'month'});
    }
  });
  const dueToday=items.reduce((s,i)=>s+i.amount,0);
  const monthly=items.filter(i=>i.interval==='month').reduce((s,i)=>s+i.amount,0);
  const yearly=items.filter(i=>i.interval==='year').reduce((s,i)=>s+i.amount,0);
  const payable=!r.ent&&blocked.length===0&&items.length>0;
  const reason=r.ent?'enterprise':blocked.length?'review':items.length?'':'empty';
  return {payable,reason,blocked:blocked.map(l=>l.name),yearlyAllowed,yearly:y,items,later,dueToday,monthly,yearlyTotal:yearly};
}
root.checkoutPlan=checkoutPlan;
if(typeof module!=='undefined'&&module.exports) module.exports.checkoutPlan=checkoutPlan;
})(typeof window!=='undefined'?window:globalThis);
