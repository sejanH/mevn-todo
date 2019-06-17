<template>
  <div id="todo" class="row justify-content-center">
    <div class="col-md-3" id="todo-list">
      <h6>Select one</h6>
      <div class="scrollbar">
        <div class="handle">
          <div class="mousearea"></div>
        </div>
      </div>

      <div class="frame smart" id="smart">
        <ul class="items">
          <li v-for="todo in todos">{{todo.id}}</li>
        </ul>
      </div>
    </div>
    <div class="col-md-8">
      <ul class="list-group"></ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "todo",
  data() {
    return {
      todos: []
    };
  },
  created() {
    axios
      .get("http://localhost:8081/api/my-todos", {
        params: {
          token: localStorage.getItem("token")
        }
      })
      .then(res => {
        this.todos = res.data;
        const plugin = document.createElement("script");
        plugin.setAttribute("src", "/js/sly.min.js");
        plugin.async = true;
        document.head.appendChild(plugin);
      });
  },
  mounted() {}
};
</script>

<style scoped>
#todo {
  min-height: calc(100vh - 41px);
  max-height: 100vh;
}
h5 {
  text-align: center;
  color: grey;
  border-bottom: 1px solid grey;
}
.wrap {
  position: relative;
  float: left;
  width: 550px;
  margin: 0 40px 3em 0;
}
.wrap:nth-child(2n) {
  margin-right: 0;
}

/* Frame */
.frame {
  height: 80vh;
  overflow: hidden;
}
.frame .slidee {
  padding: 20px 25px;
  background: #fff;
}
.frame ul.items {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 98%;
  font-size: 24px;
  line-height: 100px;
}
.frame ul.items li {
  float: left;
  width: 100%;
  height: 100px;
  border-bottom: 1px solid grey;
  padding: 0;
  text-align: center;
  cursor: pointer;
}
.frame ul.items li.active {
  color: #000;
  background: rgba(93, 219, 226, 0.8);
}
.frame ul.items li:hover,
.frame ul.items li:focus {
  color: #000;
  background: rgba(18, 158, 158, 0.25);
}
/* Scrollbar */
.scrollbar {
  position: absolute;
  right: 10px;
  width: 5px;
  height: 80vh;
  background: #ccc;
  line-height: 0;
}
.scrollbar .handle {
  width: 100%;
  height: 100px;
  background: rgba(18, 158, 158, 1);
  cursor: pointer;
}
.scrollbar .handle .mousearea {
  position: absolute;
  top: 0;
  left: -10px;
  width: 22px;
  height: 100%;
}
</style>