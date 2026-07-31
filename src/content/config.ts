import { defineCollection, z } from 'astro:content';

const interviews = defineCollection({
  type: 'content',
  schema: z.object({
    // அடிப்படை தகவல்கள்
    title: z.string(),                    // நேர்காணல் தலைப்பு
    authorName: z.string(),                // எழுத்தாளர் பெயர்
    authorRole: z.string().optional(),     // கவிஞர் / நாவலாசிரியர் / விமர்சகர் etc.
    authorPhoto: z.string(),               // எழுத்தாளர் படம் (image path)
    coverImage: z.string(),                // நேர்காணல் cover/hero image
    interviewerName: z.string().optional(),// நேர்காணல் கண்டவர் பெயர்
    category: z.string(),                  // இலக்கியம் / கலை / சினிமா / இசை etc.
    tags: z.array(z.string()).default([]),  // subject tags (எ.கா. அரசியல், கவிதையியல், வரலாறு) — footer tag cloud & archive filter-க்கு
    issueNumber: z.string().optional(),    // இதழ் எண்
    date: z.date(),                        // வெளியான தேதி
    excerpt: z.string(),                   // சுருக்க அறிமுகம் (archive card-ல் தெரியும்)
    featured: z.boolean().default(false),  // homepage hero-ல காட்டணுமா

    // கேள்வி - பதில் ஜோடிகள்
    qa: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })),

    // "நகரும் மேற்கோள் சுவர்"-ல் தானாகக் காட்டப்படும் முக்கிய மேற்கோள்கள்
    pullQuotes: z.array(z.string()).default([]),
  }),
});

export const collections = { interviews };
