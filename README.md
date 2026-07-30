# கூவல் (Koovel) — Astro + Netlify CMS Setup

**குறிப்பு:** இந்த இதழின் பெயர் "பன்மியம்"-ல் இருந்து "கூவல்"-ஆக மாற்றப்பட்டுள்ளது. கீழே உள்ள வழிமுறைகளில் `panmiyam` எனும் folder/repo பெயர் **technical reference மட்டும்** — code-ல் காட்டப்படும் பெயர் "கூவல்" தான். உங்க GitHub repo பெயரையும் மாற்ற விரும்பினால், அது ஒரு தனி (optional) படி — repo settings-ல் rename செய்யலாம்.

இது உங்க இலக்கிய இதழ் website-இன் முழுமையான project. இதுல் Netlify CMS (`/admin`) மூலம்
நேர்காணல்களை Code தொடாமல் form-ல் நிரப்பி publish பண்ணலாம்.

---

## 1. இதை GitHub-க்கு upload பண்றது

1. [github.com](https://github.com) -ல் login பண்ணி, **New repository** உருவாக்குங்க (பெயர்: `panmiyam`, Public அல்லது Private — இரண்டும் சரி)
2. இந்த zip-ஐ unzip பண்ணி, அதுக்குள் இருக்கிற எல்லா files/folders-ஐயும் புதிய repo-வுக்குள் upload பண்ணுங்க:
   - GitHub website-லேயே "uploading an existing file" மூலம் drag & drop பண்ணலாம், **அல்லது**
   - Terminal தெரிஞ்சா:
     ```bash
     cd panmiyam
     git init
     git add .
     git commit -m "Initial Panmiyam site"
     git branch -M main
     git remote add origin https://github.com/<உங்க-username>/panmiyam.git
     git push -u origin main
     ```

## 2. Netlify-ல் இணைப்பது

1. [app.netlify.com](https://app.netlify.com) -ல் login பண்ணுங்க
2. **Add new site → Import an existing project → Deploy with GitHub**
3. உங்க `panmiyam` repo-வை select பண்ணுங்க
4. Build settings automatic-ஆ `netlify.toml`-ல் இருந்து வரும் (`npm run build`, publish: `dist`) — அதை அப்படியே வையுங்க
5. **Deploy site** கிளிக் பண்ணுங்க. 2-3 நிமிடத்தில் live ஆகிடும்.

## 3. Netlify Identity + Git Gateway (இது `/admin` login வேலை செய்ய அவசியம்)

1. உங்க Netlify site dashboard-ல் → **Site configuration → Identity** → **Enable Identity**
2. Identity settings-ல் **Registration** → "Invite only" ஆக வையுங்க (பாதுகாப்புக்கு)
3. அதே Identity பக்கத்தில் கீழே **Services → Git Gateway** → **Enable Git Gateway**
4. **Site configuration → Identity → Invite users** மூலம் உங்க email-ஐ invite பண்ணுங்க — உங்க email-க்கு ஒரு link வரும், அதை கிளிக் பண்ணி password set பண்ணுங்க

## 4. `/admin` பயன்படுத்துவது

1. `https://உங்க-சைட்-பெயர்.netlify.app/admin` -க்கு போங்க
2. Login பண்ணுங்க (step 3-ல் set பண்ணின password)
3. **நேர்காணல்கள்** collection-ல் **New நேர்காணல்** கிளிக் பண்ணுங்க
4. Fields நிரப்புங்க:
   - தலைப்பு, எழுத்தாளர் பெயர், படங்கள் (upload பண்ணலாம்), பிரிவு, தேதி, சுருக்க அறிமுகம்
   - **கேள்வி-பதில்கள்** — "Add" கிளிக் பண்ணி எத்தனை வேணும்னாலும் ஜோடி சேர்க்கலாம்
   - **முக்கிய மேற்கோள்கள்** — இங்கு சேர்க்கும் வரிகள் **தானாகவே "நகரும் மேற்கோள் சுவர்"-ல்** homepage-ல் தெரியும்
5. **Publish** கிளிக் பண்ணுங்க — 1-2 நிமிடத்தில் website-ல் தானாக புது page தோன்றும் (Netlify தானாக rebuild பண்ணும்)

---

## Project அமைப்பு (technical குறிப்பு — தேவைப்பட்டால்)

```
panmiyam/
├── src/
│   ├── content/
│   │   ├── config.ts          ← நேர்காணல் data schema
│   │   └── interviews/*.md    ← ஒவ்வொரு நேர்காணலும் ஒரு .md file (CMS இதையே edit பண்ணும்)
│   ├── layouts/BaseLayout.astro   ← nav, footer, fonts, கலர் palette (எல்லா pages share பண்ணும்)
│   ├── components/QuoteWall.astro ← மேற்கோள் சுவர் — content-ல் இருந்து auto-generate ஆகும்
│   └── pages/
│       ├── index.astro        ← முகப்பு
│       ├── archive.astro      ← காப்பகம் (filter-ஓட)
│       ├── interview/[slug].astro  ← ஒவ்வொரு நேர்காணலுக்கும் தானாக page உருவாகும்
│       └── issues/collections/media/about/contact/newsletter.astro (placeholder pages)
├── public/admin/               ← Netlify CMS config
└── netlify.toml
```

**3 placeholder நேர்காணல்கள்** (`src/content/interviews/sample-interview-*.md`) already சேர்க்கப்பட்டிருக்கு —
டெமோவுக்காக. இதை `/admin`-ல் edit/delete பண்ணி உங்க உண்மையான நேர்காணல்களால் replace பண்ணலாம்.

## Local-ஆ preview பண்ண (விரும்பினால், optional)

```bash
npm install
npm run dev
```
`http://localhost:4321` -ல் திறக்கும். (`/admin` local-ல் CMS Identity இல்லாம் வேலை செய்யாது — அது Netlify deploy ஆனப்புறமே வேலை செய்யும்.)
