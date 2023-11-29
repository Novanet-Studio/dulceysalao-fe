<template>
  <header>
    <div class="header__wrapper">
      <div class="header__container">
        <div class="header__brand">
          <NuxtLink class="header__link" to="/">
            <NuxtImg src="/dulce-y-salao-logo.png" alt="Dulce y Salao Logo" />
          </NuxtLink>
        </div>
        <div class="header__content">
          <AppHeaderActions />
        </div>
      </div>
    </div>
    <AppHeaderNavigation />
  </header>
</template>
