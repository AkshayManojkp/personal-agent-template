<script setup lang="ts">
import { startChat } from "~/composables/chat/navigation";

const input = ref("");

const greeting = computed(() => {
  const hour = new Date().getHours();
  let timeGreeting = "Good evening";
  if (hour < 12) timeGreeting = "Good morning";
  else if (hour < 18) timeGreeting = "Good afternoon";

  return timeGreeting;
});

function createChat(prompt: string) {
  const text = prompt.trim();
  if (!text) return;
  input.value = "";
  void startChat(text);
}

function onSubmit() {
  createChat(input.value);
}

function summarizeDay() {
  void startChat("Summarize my day using the daily-summary skill.");
}

const quickChats = [
  {
    label: "Who are you?",
    icon: "i-lucide-user-round",
    action: () => createChat("Who are you?"),
  },
  {
    label: "What can you help me with?",
    icon: "i-lucide-message-circle-question",
    action: () => createChat("What can you help me with?"),
  },
  {
    label: "What is the weather in Paris?",
    icon: "i-lucide-sun",
    action: () => createChat("What is the weather in Paris?"),
  },
  {
    label: "What do you remember about me?",
    icon: "i-lucide-brain",
    action: () => createChat("What do you remember about me?"),
  },
  {
    label: "Summarize my day",
    icon: "i-lucide-calendar-days",
    action: summarizeDay,
  },
];
</script>

<template>
  <UDashboardPanel
    id="home"
    class="min-h-0"
    :ui="{ body: 'p-0 sm:p-0' }"
  >
    <template #header>
      <AppNavbar>
        <div class="hidden items-center gap-2 text-xs text-muted sm:flex">
          <span class="status-dot" aria-hidden="true" />
          <span>All systems operational</span>
        </div>
      </AppNavbar>
    </template>

    <template #body>
      <div class="hero-glow relative flex flex-1 overflow-auto">
        <div class="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
        <UContainer class="relative flex w-full flex-1 flex-col justify-center gap-8 py-12 sm:gap-10 sm:py-16">
          <div class="hero-intro max-w-2xl space-y-4">
            <UBadge color="neutral" variant="subtle" class="rounded-full px-3 py-1">
              <span class="status-dot me-2" aria-hidden="true" />
              Your personal agent
            </UBadge>
            <div class="space-y-2">
              <p class="text-sm font-medium uppercase tracking-[0.18em] text-muted">
                {{ greeting }}, welcome back
              </p>
              <h1 class="text-4xl font-semibold tracking-tight text-highlighted sm:text-6xl sm:leading-[1.05]">
                What are we solving today?
              </h1>
              <p class="max-w-xl text-base leading-7 text-muted sm:text-lg">
                Ask anything, pick up a thread, or let V turn your context into momentum across every channel.
              </p>
            </div>
          </div>

          <div class="hero-composer max-w-3xl space-y-3">
            <UChatPrompt
              v-model="input"
              class="[view-transition-name:chat-prompt] shadow-xl shadow-black/5"
              variant="subtle"
              :ui="{ base: 'px-1.5 min-h-32' }"
              @submit="onSubmit"
            >
              <template #footer>
                <div class="flex items-center gap-2 px-2 pb-1 text-xs text-muted">
                  <UIcon name="i-lucide-sparkles" class="size-4" />
                  <span>Press enter to start a conversation</span>
                </div>
                <UChatPromptSubmit
                  class="ms-auto shrink-0"
                  color="neutral"
                  size="sm"
                />
              </template>
            </UChatPrompt>
            <div class="flex items-center gap-2 text-xs text-muted">
              <UIcon name="i-lucide-shield-check" class="size-4" />
              <span>Your conversations are private and securely stored.</span>
            </div>
          </div>

          <div class="hero-prompts space-y-3">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium text-highlighted">Start with a prompt</p>
              <span class="text-xs text-muted">Personalized for you</span>
            </div>
            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <UButton
                v-for="quickChat in quickChats"
                :key="quickChat.label"
                :icon="quickChat.icon"
                :label="quickChat.label"
                color="neutral"
                variant="outline"
                class="group h-auto justify-start rounded-xl px-4 py-3 text-left"
                @click="quickChat.action()"
              />
            </div>
          </div>
        </UContainer>
      </div>
    </template>
  </UDashboardPanel>
</template>
