<template>
  <div id="footer">&copy; Mominul Haque Sejan 2018-{{toYear}}</div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {
      toYear: new Date().getFullYear()
    };
  }
};
</script>