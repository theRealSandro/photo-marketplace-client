<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link
          href="#"
          class="navbar-brand logo-font"
          :to="{ name: 'home' }">DSPM</router-link>
        <button class="navbar-toggler" type="button"
          data-toggle="collapse" data-target="#navbarMenu">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarMenu" class="collapse navbar-collapse justify-content-end">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link
                class="nav-link"
                active-class="active"
                exact
                :to="{ name: 'home' }"
              >Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                active-class="active"
                exact
                :to="{ name: 'photographer' }"
              >Fotografer
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                active-class="active"
                exact
                :to="{ name: 'client' }"
              >Klien
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
