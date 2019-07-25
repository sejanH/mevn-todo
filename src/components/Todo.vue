<template>
  <div>
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
            <li v-for="todo in parentTodo" v-bind:key="todo.id" @click="showTodo(todo.id)">
              {{todo.id}} -
              <small>{{todo.title }}</small>
            </li>
          </ul>
        </div>
      </div>
      <br />
      <div class="col-md-8 col-xs-11 col-sm-11" v-if="$route.name=='todo'">
        <table class="table table-borderless table-sm">
          <tr>
            <td>
              <h5
                v-if="selectedTodo.length !== 0"
                :class="[selectedTodo[0].deleted ? 'strike':'','']"
              >
                {{selectedTodo[0].title}}-
                <small>{{selectedTodo[0].body}}</small>
              </h5>
            </td>
            <td
              v-if="selectedTodo.length !== 0"
              style="float:right;font-size:0.75rem;display : flex;align-items : center;"
            >{{selectedTodo[0].created_at}}</td>
          </tr>
        </table>
        <div v-if="parentTodo.length > 0 && parentTodo != -1">
          <nested-draggable :tasks="selectedTodo[1]" />
        </div>
        <div class="text-center centered" v-else>
          <div class="spinner-grow text-danger" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>

        <div
          class="alert alert-warning"
          role="alert"
          v-if="parentTodo == -1"
        >Hi No Todo Found by your name</div>
      </div>
      <div class="col-md-8 col-xs-11 col-sm-11" v-else>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import nestedDraggable from "./Nested";
export default {
  name: "todo",
  data() {
    return {
      todos: [],
      list: [],
      parentTodo: [],
      selectedTodo: [],
      editable: true,
      isDragging: false,
      delayedDragging: false
    };
  },
  watch: {
    isDragging(newValue) {
      if (newValue) {
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    }
  },
  components: {
    nestedDraggable
  },
  created() {
    this.getTodo();
  },
  methods: {
    async getTodo() {
      await axios
        .get("http://localhost:8081/api/my-todos", {
          params: {
            token: localStorage.getItem("token")
          }
        })
        .then(res => {
          if (res.data.length == 0) {
            this.parentTodo = -1;
          } else {
            this.todos = res.data;
            this.parentTodo = res.data.filter(data => data.parent == 0);
            const plugin = document.createElement("script");
            plugin.setAttribute("src", "/js/sly.min.js");
            plugin.async = true;
            document.head.appendChild(plugin);
            this.showTodo(this.todos[0].id);
          }
        })
        .catch(err => {
          if (err.request.response == "expired") {
            this.$root.$emit("expired");
          }
        });
    },
    showTodo(todoId) {
      this.selectedTodo = [];
      this.list = this.todos.map((body, index) => {
        return { body, order: index + 1, fixed: false };
      });
      let todo = [];
      todo[0] = this.todos.filter(data => data.id == todoId)[0];
      todo[1] = todo[0].tasks;
      this.selectedTodo = todo;
    },
    orderList() {
      this.list = this.list.sort((one, two) => {
        return one.order - two.order;
      });
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    }
  },
  mounted() {},
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    }
  }
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
  font-size: 20px;
  line-height: 80px;
}
.frame ul.items li {
  float: left;
  width: 100%;
  height: 80px;
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
.strike {
  text-decoration: line-through;
}
span.actions {
  float: right;
}
/* draggable css*/
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
div.centered {
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>