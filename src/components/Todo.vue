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
      <div class="col-md-8" v-if="$route.name=='todo'">
        <!-- <h5 :class="[  selectedTodo[0].deleted ? 'strike':'']">{{selectedTodo[0].title}}</h5> -->
        <!-- <ul class="list-group">
          <li :class="[selectedTodo.deleted ? 'strike':'','list-group-item']">{{selectedTodo.title}}</li>
          <button class="btn btn-secondary">
            <i class="fas fa-plus-circle"></i>
          </button>
          <li :class="[selectedTodo.deleted ? 'strike':'','list-group-item']">
            {{selectedTodo.body}} -
            <small>{{selectedTodo.created_at}}</small>
          </li>
        </ul>-->
        <h6 v-if="selectedTodo.length !== 0">
          {{selectedTodo[0][0].title}}-
          <small>{{selectedTodo[0][0].body}}</small>
        </h6>
        <draggable tag="span" v-model="selectedTodo" v-bind="dragOptions" :move="onMove">
          <transition-group name="no" class="list-group" tag="ul">
            <li
              v-for="(element,index) in selectedTodo"
              :key="index"
              :class="[element.deleted ? 'strike':'','list-group-item']"
            >{{element[1]}}</li>
          </transition-group>
        </draggable>
      </div>
      <div class="col-md-8" v-else>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
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
    draggable
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
          this.todos = res.data;
          this.parentTodo = res.data.filter(data => data.parent == 0);
          const plugin = document.createElement("script");
          plugin.setAttribute("src", "/js/sly.min.js");
          plugin.async = true;
          document.head.appendChild(plugin);
          this.showTodo(this.todos[0].id);
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
      todo[1] =
        this.todos.filter(data => data.parent == todoId).length > 0
          ? this.todos.filter(data => data.parent == todoId)
          : [];
      this.selectedTodo.push(todo);
      //this.selectedTodo = todo;
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
        animation: 0,
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
</style>