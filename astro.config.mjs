---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const interviews = await getCollection('interviews');
  const authorMap = new Map<string, typeof interviews>();

  interviews.forEach((entry) => {
    // authorName-ஐ URL-safe slug ஆக மாற்றுதல் (இங்கேயே inline-ஆக, தனி function இல்லாமல் —
    // Astro-இன் getStaticPaths build-time extraction, வெளியில் இருக்கும் helper function-ஐ
    // சில நேரம் சரியா bundle பண்ணாத ஒரு known issue இருப்பதால்)
    const key = entry.data.authorName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\u0B80-\u0BFF-]/g, '');
    if (!authorMap.has(key)) authorMap.set(key, []);
    authorMap.get(key)!.push(entry);
  });

  return Array.from(authorMap.entries()).map(([slug, entries]) => ({
    params: { name: slug },
    props: { entries },
  }));
}

const { entries } = Astro.props;
const sorted = entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
const author = sorted[0].data;
---
<BaseLayout title={`${author.authorName} - கூவல்`}>
  <section class="px-margin-desktop pt-section-gap pb-stack-lg reveal active">
    <div class="max-w-3xl mx-auto text-center">
      <div class="w-28 h-28 rounded-full overflow-hidden mx-auto mb-6 border-2 border-primary/20">
        <img src={author.authorPhoto} alt={author.authorName} class="w-full h-full object-cover" />
      </div>
      <h1 class="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-3">{author.authorName}</h1>
      {author.authorRole && <p class="font-label-caps text-label-caps text-secondary">{author.authorRole}</p>}
      <p class="font-caption text-caption text-on-surface-variant mt-4">{sorted.length} நேர்காணல்{sorted.length > 1 ? "கள்" : ""}</p>
    </div>
  </section>

  <section class="px-margin-desktop pb-section-gap">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter max-w-5xl mx-auto">
      {sorted.map((entry) => (
        <a href={`/interview/${entry.slug}`} class="block no-underline reveal active magazine-lift bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/30">
          <div class="aspect-[4/3] overflow-hidden">
            <img src={entry.data.coverImage} alt={entry.data.title} class="w-full h-full object-cover" />
          </div>
          <div class="p-stack-md">
            <span class="font-label-caps text-label-caps text-tertiary">{entry.data.category}</span>
            <h3 class="font-headline-md text-headline-md text-primary mt-2">{entry.data.title}</h3>
            <p class="font-caption text-caption text-on-surface-variant mt-2">{entry.data.date.toLocaleDateString('ta-IN', { year: 'numeric', month: 'long' })}</p>
          </div>
        </a>
      ))}
    </div>
  </section>
</BaseLayout>
