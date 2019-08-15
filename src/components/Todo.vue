<template>
  <div>
    <div id="todo" class="row justify-content-center">
      <div class="col-md-3" id="todo-list">
        <div style="display:block;">
          <h6 style="display: inline-block;">Select one</h6>
          <button
            v-if="$route.name=='todo'"
            @click="$router.push({name:'new-todo'})"
            class="btn bg-mevn btn-xs"
            title="Add new"
          >&#x2725;</button>
          <button
            v-if="$route.name == 'new-todo'"
            @click="$router.go(-1)"
            class="btn bg-mevn btn-xs"
            title="Back"
          >&#x276E;&#x276E;</button>
        </div>
        <div class="scrollbar">
          <div class="handle">
            <div class="mousearea"></div>
          </div>
        </div>

        <div class="frame smart" id="smart" v-if="parentTodo != -1">
          <ul class="items">
            <li
              v-for="(todo) in parentTodo"
              v-bind:key="todo._id"
              @click="showTodo(todo._id)"
              :class="[$route.name=='todo'?'':'disabled']"
            >
              <span class="todoActions" v-if="selectedTodo[0]._id==todo._id">
                <button class="btn btn-xs bg-danger" @click="deleteTodo(todo._id)">X</button>
              </span>
              <small>{{todo.title }}</small>
            </li>
          </ul>
        </div>
      </div>
      <br />
      <div class="col-md-8 col-xs-11 col-sm-11" v-if="$route.name=='todo'">
        <table class="table table-borderless table-sm" v-if="selectedTodo.length !== 0">
          <tr id="todo">
            <td
              :class="[selectedTodo[0].deleted ? 'strike':'','']"
              style="font-size: 1.15rem;font-weight: 600"
            >
              {{selectedTodo[0].title}}-
              <small>{{selectedTodo[0].body}}</small>
            </td>
            <td
              style="float:right;font-size:0.75rem;display : flex;align-items : center;"
            >{{selectedTodo[0].created_att}}</td>
            <td>
              <button class="btn btn-xs bg-mevn" title="Add new task" @click="addTask">&#x2724;</button>
            </td>
          </tr>
        </table>
        <div v-if="parentTodo.length > 0 && parentTodo != -1">
          <nested-draggable :tasks="selectedTodo[1]" />
          <button
            v-if="selectedTodo[1].length > 0"
            class="btn bg-mevn btn-block"
            @click="SaveChanges(selectedTodo[0]._id)"
            :disabled="!SaveChangesEnabled"
          >Save changes</button>
        </div>
        <div class="text-center centered" v-if="parentTodo != -1 && parentTodo.length == 0">
          <div class="spinner-grow text-danger" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div class="alert alert-warning" role="alert" v-if="parentTodo == -1">
          Hi No Todo Found by your name
          <router-link :to="{name:'new-todo'}">create one now</router-link>
        </div>
      </div>
      <div class="col-md-8 col-xs-11 col-sm-11" v-else>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import nestedDraggable from "./Nested";
import swal from "sweetalert";
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
      delayedDragging: false,
      SaveChangesEnabled: false
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
    },
    parentTodo(val) {
      this.parentTodo = val;
    },
    selectedTodo(val) {
      this.selectedTodo = val;
    },
    SaveChangesEnabled(val) {
      this.SaveChangesEnabled = val;
    }
  },
  components: {
    nestedDraggable
  },
  created() {
    this.getTodo();
  },
  methods: {
    dateBeautify(data) {
      data.forEach((currentValue, index, arr) => {
        let m = new Date(parseInt(currentValue.created_at));
        currentValue.created_att =
          m.getFullYear() +
          "-" +
          m.getMonth() +
          "-" +
          m.getDate() +
          " " +
          m.getHours() +
          ":" +
          m.getMinutes() +
          ":" +
          m.getSeconds();
        currentValue.tasks.forEach(val => {
          let d = new Date(parseInt(val.created_at));
          val.created_att =
            d.getFullYear() +
            "-" +
            d.getMonth() +
            "-" +
            d.getDate() +
            "  " +
            d.getHours() +
            ":" +
            d.getMinutes() +
            ":" +
            d.getSeconds();
          if (val.tasks.length > 0) {
            dateBeautify(val.tasks);
          }
        });
      });
    },
    async getTodo(id = null) {
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
            this.dateBeautify(this.todos);
            if (id == null) {
              this.showTodo(this.todos[0]._id);
            } else {
              this.showTodo(id);
            }
          }
        })
        .catch(err => {
          if (err.request.response == "expired") {
            this.$root.$emit("expired");
          } else if (err.request.status === 0) {
            this.getTodo();
            swal({
              icon: "error",
              title: "Sorry !",
              text:
                "Connection to server failed! Reload the page or try again later"
            });
          }
        });
    },
    addTask() {
      this.$router.push({
        name: "new-todo",
        query: { todo: this.selectedTodo[0]._id }
      });
    },
    showTodo(todoId) {
      this.selectedTodo = [];
      this.list = this.todos.map((body, index) => {
        return { body, order: index + 1, fixed: false };
      });
      let todo = [];
      todo[0] = this.todos.filter(data => data._id == todoId)[0];
      todo[1] = todo[0].tasks;
      this.selectedTodo = todo;
    },
    deleteTodo(todoId) {
      swal("Delete the Todo?", {
        buttons: {
          cancel: "No!",
          Logout: {
            text: "Yes! Delete",
            value: "delete"
          }
        }
      }).then(value => {
        switch (value) {
          case "delete":
            axios
              .post("http://localhost:8081/api/todo/delete", {
                token: localStorage.getItem("token"),
                todoId
              })
              .then(res => {
                this.getTodo();
              })
              .catch(err => {});
            break;
          default:
            swal({ text: "Delete cancelled!", button: false, timer: 1000 });
        }
      });
    },
    SaveChanges(todoId) {
      swal("Save the changes?", {
        buttons: {
          cancel: "No!",
          Logout: {
            text: "Save",
            value: "save"
          }
        }
      }).then(value => {
        if (value == "save") {
          this.dataParse(this.selectedTodo[1]);
          // axios
          //   .post("http://localhost:8081/api/todo-save-order", {
          //     token: localStorage.getItem("token"),
          //     todoId,
          //     newOrder: this.selectedTodo[1]
          //   })
          //   .then(res => {
          //     if (res.data.nModified == 1) {
          //       this.getTodo(todoId);
          //     }
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });
        } else {
        }
      });
    },
    dataParse(data) {
      data.forEach((currentValue, index, arr) => {
        delete currentValue.created_att;
        console.log(currentValue);
        currentValue.tasks.forEach(val => {
          if (val.tasks.length > 0) {
            dateParse(val.tasks);
          }
        });
      });
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
  mounted() {
    this.$on("changed", data => {
      this.SaveChangesEnabled = true;
      this.selectedTodo[1] = data.tasks;
      this.selectedTodo[0].tasks = data.tasks;
    });
  },
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
h5,
tr#todo {
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
button.btn-xs {
  padding: 0 0.25rem;
  font-size: 1rem;
  font-weight: 400;
  float: right;
}
.todoActions {
  float: right;
}
.items > li .todoActions {
  opacity: 0;
}
.items > li:hover .todoActions {
  opacity: 1;
  cursor: pointer;
}
.frame ul.items li.disabled {
  /*pointer-events: none;*/
  cursor: not-allowed;
}
</style>