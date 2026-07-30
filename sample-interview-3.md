---
import { getCollection } from 'astro:content';

const interviews = await getCollection('interviews');

// ஒவ்வொரு interview-இன் pullQuotes-ஐயும் தட்டையாக்கி single list ஆக்குதல்
const allQuotes = interviews.flatMap((entry) =>
  entry.data.pullQuotes.map((q) => ({
    quote: q,
    name: entry.data.authorName,
    role: entry.data.authorRole || '',
    photo: entry.data.authorPhoto,
    slug: entry.slug,
  }))
);

// எதுவும் இல்லைனா, placeholder quotes காட்டு (content இன்னும் இல்லாத போது demo-க்கு)
const fallback = [
  { quote: "எழுத்து என்பது அமைதியின் இன்னொரு குரல்.", name: "எழுத்தாளர் பெயர் (placeholder)", role: "கவிஞர்", photo: "", slug: null },
  { quote: "மொழி வாழும்போது மட்டுமே நினைவுகள் வாழ்கின்றன.", name: "எழுத்தாளர் பெயர் (placeholder)", role: "நாவலாசிரியர்", photo: "", slug: null },
  { quote: "ஒவ்வொரு கதையும் ஒரு கண்ணாடி — நம்மைத் திருப்பிக் காட்டுகிறது.", name: "எழுத்தாளர் பெயர் (placeholder)", role: "சிறுகதை எழுத்தாளர்", photo: "", slug: null },
  { quote: "வாசிப்பு என்பது தனிமையில் கண்டடையும் தோழமை.", name: "எழுத்தாளர் பெயர் (placeholder)", role: "கட்டுரையாளர்", photo: "", slug: null },
];

const quotes = allQuotes.length > 0 ? allQuotes : fallback;
const row1 = [...quotes, ...quotes];
const row2 = [...quotes].reverse().concat([...quotes].reverse());
---
<section class="py-section-gap relative overflow-hidden">
  <div class="absolute top-1/2 left-0 w-full h-1/2 bg-surface-dim/30 -z-10"></div>
  <div class="container mx-auto px-margin-desktop text-center mb-16 reveal active">
    <p class="font-label-caps text-label-caps text-tertiary mb-3 tracking-[0.3em]">எழுத்தாளர்களின் குரல்</p>
    <h2 class="font-headline-md text-headline-md text-primary">நகரும் <span class="italic text-secondary">மேற்கோள்</span> சுவர்</h2>
    {allQuotes.length === 0 && (
      <p class="font-caption text-caption text-on-surface-variant mt-4">Placeholder content — நேர்காணல்கள் CMS மூலம் சேர்க்கும்போது இங்கு தானாகப் புதுப்பிக்கப்படும்</p>
    )}
  </div>
  <div class="pm-wall reveal active">
    <div class="pm-particles">
      {[...Array(10)].map((_, i) => (
        <span class="pm-petal" style={`left:${(i * 9.5 + 3)}%; animation-duration:${14 + (i % 5) * 3}s; animation-delay:-${i * 2.2}s;`}></span>
      ))}
    </div>
    <div class="pm-row-depth pm-row-back">
      <div class="pm-row pm-left">
        {row1.map((item, i) => (
          item.slug ? (
            <a href={`/interview/${item.slug}`} class="pm-card no-underline" style={`animation-delay:${i * 0.3}s;`}>
              <span class="pm-mark">"</span>
              <p class="pm-quote-ta">{item.quote}</p>
              <div class="pm-attribution">
                <div class="pm-avatar" style={item.photo ? `background-image:url('${item.photo}')` : ''}></div>
                <div>
                  <div class="pm-name">{item.name}</div>
                  <div class="pm-role">{item.role}</div>
                </div>
              </div>
              <span class="pm-readmore">முழு நேர்காணலைப் படிக்க <span class="material-symbols-outlined">north_east</span></span>
            </a>
          ) : (
            <div class="pm-card" style={`animation-delay:${i * 0.3}s;`}>
              <span class="pm-mark">"</span>
              <p class="pm-quote-ta">{item.quote}</p>
              <div class="pm-attribution">
                <div class="pm-avatar"></div>
                <div>
                  <div class="pm-name">{item.name}</div>
                  <div class="pm-role">{item.role}</div>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
    <div class="pm-row-depth pm-row-front">
      <div class="pm-row pm-right">
        {row2.map((item, i) => (
          item.slug ? (
            <a href={`/interview/${item.slug}`} class="pm-card no-underline" style={`animation-delay:${i * 0.35}s;`}>
              <span class="pm-mark">"</span>
              <p class="pm-quote-ta">{item.quote}</p>
              <div class="pm-attribution">
                <div class="pm-avatar" style={item.photo ? `background-image:url('${item.photo}')` : ''}></div>
                <div>
                  <div class="pm-name">{item.name}</div>
                  <div class="pm-role">{item.role}</div>
                </div>
              </div>
              <span class="pm-readmore">முழு நேர்காணலைப் படிக்க <span class="material-symbols-outlined">north_east</span></span>
            </a>
          ) : (
            <div class="pm-card" style={`animation-delay:${i * 0.35}s;`}>
              <span class="pm-mark">"</span>
              <p class="pm-quote-ta">{item.quote}</p>
              <div class="pm-attribution">
                <div class="pm-avatar"></div>
                <div>
                  <div class="pm-name">{item.name}</div>
                  <div class="pm-role">{item.role}</div>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  </div>
  <div class="absolute bottom-10 right-10 w-32 h-32 botanical-accent animate-pulse">
    <span class="material-symbols-outlined text-[100px] text-tertiary">filter_vintage</span>
  </div>
</section>

<style>
  /* Moving Quote Wall — இது இந்த component-க்குள்ளேயே scoped, சரியா apply ஆகும் */
  .pm-wall { position: relative; display: flex; flex-direction: column; gap: 22px; padding: 10px 0 6px; }
  .pm-wall::before, .pm-wall::after { content: ""; position: absolute; top: 0; bottom: 0; width: 120px; z-index: 3; pointer-events: none; }
  .pm-wall::before { left: 0; background: linear-gradient(90deg, #FBF8F2, transparent); }
  .pm-wall::after { right: 0; background: linear-gradient(270deg, #FBF8F2, transparent); }

  /* Depth: பின்னணி row சிறியதா, மங்கலா — முன் row crisp-ஆ */
  .pm-row-depth.pm-row-back { opacity: .55; transform: scale(0.9); }
  .pm-row-depth.pm-row-front { position: relative; z-index: 2; }

  .pm-row { display: flex; width: max-content; gap: 28px; will-change: transform; }
  .pm-row.pm-left { animation: pmScrollLeft 60s linear infinite; }
  .pm-row.pm-right { animation: pmScrollRight 65s linear infinite; }
  .pm-row:hover { animation-play-state: paused; }
  @keyframes pmScrollLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes pmScrollRight { from { transform: translateX(-50%); } to { transform: translateX(0); } }
  @keyframes pmBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }

  .pm-card {
    position: relative; flex: 0 0 auto; width: 400px; padding: 38px 34px;
    background: #FFFFFF; border: 1px solid #E3D8C6; border-radius: 18px;
    box-shadow: 0 6px 20px -10px rgba(27, 77, 145, 0.12);
    transform-style: preserve-3d; transition: border-color .4s ease, box-shadow .4s ease;
    display: block; cursor: default;
    animation: pmBob 6s ease-in-out infinite;
  }
  a.pm-card { cursor: pointer; }
  .pm-card::before { content: ""; position: absolute; top: 26px; left: 0; width: 4px; height: 34px; background: #82AB7D; border-radius: 0 4px 4px 0; }
  .pm-card:hover { border-color: rgba(27, 77, 145, 0.4); box-shadow: 0 24px 48px -18px rgba(27, 77, 145, 0.3); }
  .pm-mark { font-family: 'Bodoni Moda', serif; font-style: italic; font-size: 48px; color: #4F7FBF; opacity: .9; line-height: .4; display: block; margin-bottom: 18px; }
  .pm-quote-ta { font-family: 'Noto Serif Tamil', serif; font-weight: 500; font-size: 20px; line-height: 1.7; color: #1A2938; margin-bottom: 22px; min-height: 90px; }
  .pm-attribution { display: flex; align-items: center; gap: 12px; padding-top: 16px; border-top: 1px solid #E3D8C6; }
  .pm-avatar { width: 38px; height: 38px; border-radius: 50%; flex: 0 0 auto; background: linear-gradient(140deg, #4F7FBF, #1B4D91); background-size: cover; background-position: center; }
  .pm-name { font-family: 'Manrope', sans-serif; font-size: 14px; color: #1B4D91; font-weight: 600; }
  .pm-role { font-family: 'Manrope', sans-serif; font-size: 12px; color: #6A6B4E; margin-top: 2px; letter-spacing: .02em; }
  .pm-readmore {
    display: flex; align-items: center; gap: 6px; margin-top: 16px;
    font-family: 'Manrope', sans-serif; font-size: 11px; letter-spacing: .05em; text-transform: uppercase;
    color: #82AB7D; font-weight: 600; opacity: 0; transform: translateY(4px);
    transition: opacity .3s ease, transform .3s ease;
  }
  .pm-readmore .material-symbols-outlined { font-size: 16px; }
  a.pm-card:hover .pm-readmore { opacity: 1; transform: translateY(0); }

  /* பின்னணியில் மிதக்கும் sage-green இலைத்துணுக்குகள் */
  .pm-particles { position: absolute; inset: 0; pointer-events: none; z-index: 1; overflow: hidden; }
  .pm-petal {
    position: absolute; bottom: -20px; width: 10px; height: 10px;
    background: #82AB7D; opacity: 0; border-radius: 60% 0 60% 0;
    animation: pmDrift linear infinite;
  }
  @keyframes pmDrift {
    0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
    10% { opacity: .45; }
    90% { opacity: .3; }
    100% { transform: translateY(-360px) translateX(24px) rotate(180deg); opacity: 0; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pm-row.pm-left, .pm-row.pm-right, .pm-card, .pm-petal { animation: none !important; }
  }
  @media (max-width: 640px) {
    .pm-card { width: 300px; padding: 28px 24px; }
    .pm-quote-ta { font-size: 17px; min-height: auto; }
  }
</style>
