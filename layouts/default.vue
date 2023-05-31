<template>
  <div class="mx-auto h-full w-auto">
    <header border-bottom border-b text-center sm:p-3>
      <div>
        <h4 text-4 text-8 font-500>
          TeknoRB
        </h4>
      </div>
    </header>
    <main class="h-full px-10 py-5 text-center">
      <div>
        <slot />
      </div>
      <Footer />
      <div class="mx-auto mt-5 text-center text-sm opacity-85">
        [Default Layout]
      </div>
    </main>
  </div>
</template>
