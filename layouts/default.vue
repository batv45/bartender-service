<template>
  <div class="mx-auto h-full w-auto">
    <header border-bottom border-b text-center sm:p-3>
      <div flex flex-row justify-center>
        <h4 me-5 block border-e border-e-bluegray pe-5 font-sans text-4 text-8 font-50 font-light text-shadow-md>
          TeknoRB
        </h4>
        <div>
          <ul class="nav-menu">
            <li>
              <NuxtLink to="/">
                Ürün arama
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/test">
                Api Test
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <main class="flex flex-col justify-center">
      <div flex flex-row justify-center p-5>
        <slot />
      </div>
      <Footer mt-10 border-t pt-5 />
      <div class="mx-auto mt-5 text-center text-sm opacity-85">
        [Default Layout]
      </div>
    </main>
  </div>
</template>

<style>
.nav-menu li{
display: inline-block;
margin-right: 1rem
}
.nav-menu li a {
  --at-apply: my-auto block border rounded bg-blueGray shadow p-2 px-3 text-size-lg text-white dark:border-gray-4

}
.nav-menu li a.router-link-active {
  --at-apply: bg-blue-500 shadow  shadow-blue border-blue-6;

}
</style>
