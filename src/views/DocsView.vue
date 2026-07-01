<script setup lang="ts">
import { ref, computed, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@unhead/vue";
import MarkdownIt from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import TheHeader from "@/layout/TheHeader.vue";
import TheFooter from "@/layout/TheFooter.vue";

type DocStatus = "loading" | "ready" | "not-found" | "error";
type DocMeta = { title: string; description?: string };

// Module scope: created once, shared across renders.
const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

const docs = import.meta.glob("@/content/docs/*.md", {
  query: "?raw",
  import: "default",
  eager: false,
}) as Record<string, () => Promise<string>>;

const slugToLoader: Record<string, () => Promise<string>> = Object.fromEntries(
  Object.entries(docs).map(([path, loader]) => [
    path.split("/").pop()!.replace(/\.md$/, ""),
    loader,
  ]),
);

// Minimal YAML frontmatter parser: only flat `key: value` pairs are needed
// (title/description), which keeps the docs chunk lean and browser-safe.
function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, content: raw };
  const data: Record<string, string> = {};
  for (const line of (match[1] ?? "").split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    if (!key) continue;
    data[key] = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
  }
  return { data, content: raw.slice(match[0].length) };
}

const route = useRoute();

const status = ref<DocStatus>("loading");
const html = ref("");
const meta = ref<DocMeta>({ title: "" });
const articleRef = ref<HTMLElement | null>(null);

async function load(slug: string) {
  status.value = "loading";
  html.value = "";

  const loader = slugToLoader[slug];
  if (!loader) {
    meta.value = { title: "Page not found" };
    status.value = "not-found";
    return;
  }

  try {
    const raw = await loader();
    const { data, content } = parseFrontmatter(raw);
    html.value = md.render(content);
    meta.value = {
      title: data.title ?? slug,
      description: data.description,
    };
    status.value = "ready";
    await nextTick();    
  } catch {
    meta.value = { title: "Something went wrong" };
    status.value = "error";
  }
}

watch(
  () => route.params.slug,
  (slug) => load(String(slug)),
  { immediate: true },
);

useHead(
  computed(() => ({
    title: meta.value.title,
    meta: meta.value.description
      ? [{ name: "description", content: meta.value.description }]
      : [],
  })),
);
</script>

<template>
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
  >
    Skip to main content
  </a>
  <TheHeader />
  <main id="main" class="pt-24 mx-auto w-full max-w-3xl px-4 py-16 md:px-6">
    <template v-if="status === 'loading'">
      <div class="space-y-4" aria-hidden="true">
        <Skeleton class="h-10 w-2/3" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-4/5" />
      </div>
      <span class="sr-only" role="status">Loading document…</span>
    </template>

    <article
      v-else-if="status === 'ready'"
      ref="articleRef"
      tabindex="-1"
      class="prose dark:prose-invert max-w-none focus:outline-none"
      v-html="html"
    />

    <Empty v-else>
      <EmptyHeader>
        <EmptyTitle>
          {{ status === "not-found" ? "Document not found" : "Something went wrong" }}
        </EmptyTitle>
        <EmptyDescription>
          {{
            status === "not-found"
              ? "The page you’re looking for doesn’t exist or has moved."
              : "We couldn’t load this document. Please try again."
          }}
        </EmptyDescription>
      </EmptyHeader>
      <RouterLink to="/" class="text-primary underline underline-offset-4">
        Back to home
      </RouterLink>
    </Empty>
  </main>
  <TheFooter />
</template>
