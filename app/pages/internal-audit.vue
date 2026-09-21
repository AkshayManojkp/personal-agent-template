<script setup lang="ts">
definePageMeta({ layout: false });

type AuditResponse = {
  auditor: {
    id: string;
    name: string;
    email: string;
  };
  access: string;
};

const { data, error } = await useFetch<AuditResponse>("/api/internal/audit");

if (error.value?.statusCode === 401) {
  await navigateTo({ path: "/login", query: { redirect: "/internal-audit" } });
}
</script>

<template>
  <main class="min-h-svh bg-default px-6 py-10 text-default sm:px-10">
    <div class="mx-auto max-w-4xl space-y-8">
      <header class="flex flex-wrap items-start justify-between gap-4 border-b border-default pb-6">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-warning">Restricted area</p>
          <h1 class="mt-2 text-3xl font-semibold text-highlighted">Internal audit</h1>
          <p class="mt-2 max-w-xl text-sm text-muted">
            This area is separate from the normal assistant experience and is available only to accounts listed in the internal audit allowlist.
          </p>
        </div>
        <UButton to="/" variant="soft" color="neutral">Back to assistant</UButton>
      </header>

      <UAlert
        v-if="error"
        color="error"
        variant="soft"
        title="Access denied"
        description="Add this account email to INTERNAL_AUDIT_EMAILS to enable audit access."
      />

      <UCard v-else-if="data" class="max-w-xl">
        <template #header>
          <div class="flex items-center gap-3">
            <UIcon name="i-lucide-shield-check" class="size-5 text-success" />
            <h2 class="font-semibold text-highlighted">Audit session active</h2>
          </div>
        </template>
        <dl class="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt class="text-muted">Auditor</dt>
            <dd class="mt-1 font-medium text-highlighted">{{ data.auditor.name }}</dd>
          </div>
          <div>
            <dt class="text-muted">Account</dt>
            <dd class="mt-1 font-medium text-highlighted">{{ data.auditor.email }}</dd>
          </div>
          <div>
            <dt class="text-muted">Scope</dt>
            <dd class="mt-1 font-medium text-highlighted">{{ data.access }}</dd>
          </div>
        </dl>
      </UCard>
    </div>
  </main>
</template>
