<template>
  <v-footer dark padless absolute app>
    <v-card tile class="lighten-1 white--text" color="#4C4C4C" width="100%">
      <v-card-text class="white--text pt-0">
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="6" md="4">
              <img height="82" src="/sum-siva.svg" />
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <a href="https://pressum.sum.ba" target="_blank">
                <img height="82" src="/pressum-logo-white.svg" />
              </a>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-row class="text-center text-md-left">
                <v-col cols="12">
                  <div>
                    <v-icon size="30" color="white"
                      >mdi-map-marker-outline</v-icon
                    >
                    <span class="white--text"
                      >Trg hrvatskih velikana 1 88000 Mostar, BiH</span
                    >
                  </div>
                </v-col>
                <v-col cols="12">
                  <div>
                    <v-icon size="30" color="white">mdi-phone</v-icon>
                    <span class="white--text">
                      <a href="tel:+38736337063" class="white--text"
                        >+387 36 337-063</a
                      >
                    </span>
                  </div>
                </v-col>
                <v-col cols="12">
                  <div>
                    <v-icon size="30" color="white">mdi-email</v-icon>
                    <span class="white--text">
                      <a href="mailto:pressum@sum.ba" class="white--text"
                        >pressum@sum.ba</a
                      >
                    </span>
                  </div>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text
        class="white--text text-center"
        style="background-color: #4c4c4c"
      >
        <span class="text-center text-caption white--text"
          >Copyright ©{{ new Date().getFullYear() }} Sveučilište u Mostaru. Sva
          prava pridržana. Razvio i dizajnirao Centar za informacijske
          tehnologije Sveučilišta u Mostaru – SUMIT</span
        >
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped></style>
