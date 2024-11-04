<template>
  <div style="display: flex; justify-content: center; margin-top: 30px">
    <v-html style="width: 80%; font-size: 18px; height: auto"
      >Sustav Knjige/e-Knjige u sklopu Sveučilišne nakladničke kuće PRESSUM
      stvoren je s ciljem da prati nakladničku djelatnost Sveučilišta u Mostaru
      i da se u njemu mogu vidjeti sve omeđene tj. neserijske publikacije
      (monografije, katalozi, priručnici). Sustav je podijeljen na dva dijela –
      Knjige i e-Knjige. U dijelu Knjige korisnici će moći vidjeti osnovne
      podatke o knjigama do razine predgovora. U dijelu e-Knjige korisnici će
      moći vidjeti osnovne podatke o knjigama te preuzeti elektronske inačice
      istih. Za dodatne informacije i podršku javite se na e-mail adresu
      <a :href="`mailto:${pressum_contact}`" style="text-decoration: none"
        >pressum@sum.ba</a
      ></v-html
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      pressum_contact: "pressum@sum.ba",
    };
  },
};
</script>

<style></style>
