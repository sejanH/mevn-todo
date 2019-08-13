<template>
  <div>
    <draggable
      class="list-group"
      ghost-class="ghost"
      :list="todoTasks.tasks"
      :group="{ name: 'description' }"
      tag="div"
      v-bind="dragOptions"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <transition-group type="transition" :name="!isDragging ? 'flip-list' : null">
        <div
          :class="[!element.active?'strike':'','list-group-item']"
          v-for="element in tasks"
          :key="element._id"
        >
          <div>
            {{ element.title }} -
            <small>{{element.body}}</small>
            <span class="actions">
              <span
                style="display:inline-block;font-size:0.75rem;letter-spacing: -0.25px;"
              >{{element.created_at}}</span>&nbsp;
              <span
                style="display:inline-block;"
                class="custom-control custom-checkbox"
                title="mark as complete"
              >
                <input
                  class="custom-control-input"
                  type="checkbox"
                  :value="element._id"
                  :checked="!element.active"
                  :id="'complete_'+element._id"
                  @change="checkBoxAction"
                />
                <label
                  v-if="!element.active"
                  class="custom-control-label"
                  :for="'complete_'+element._id"
                >&#10004;</label>
                <label v-else class="custom-control-label" :for="'complete_'+element._id">&#9022;</label>
              </span>
            </span>
          </div>
          <span v-if="element.tasks.length > 0">
            <nested-draggable :tasks="element.tasks" />
          </span>
          <span v-else>
            <nested-draggable :tasks="element.tasks" />
            <span class="dragOld">Drag other to make its child</span>
          </span>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  props: {
    tasks: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
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
    },
    todoTasks(val) {
      this.$parent.$emit("changed", val);
      deep: false;
    }
  },
  methods: {
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
    },
    checkBoxAction(e) {
      if (
        e.target.checked &&
        this.tasks.filter(data => data._id == e.target.value)[0].active == true
      ) {
        const id = e.target.value;
        const token = localStorage.getItem("token");
        this.tasks.filter(data => data._id == id)[0].active = false;

        axios
          .post("http://localhost:8081/api/todo-list/change-task-status", {
            todoId: this.$parent.selectedTodo[0]._id,
            id: id,
            token: token
          })
          .then(res => {
            if (res.data.nModified == 1) {
              this.todoTasks.tasks.filter(
                data => data._id == id
              )[0].active = false;
            }
          })
          .catch(err => {});
      } else {
        swal({
          icon: "info",
          text: "Once marked completed it cannot be undone yet!",
          timer: 2000,
          button: false
        });
        e.target.checked = true;
      }
    }
  },
  components: {
    draggable
  },
  name: "nested-draggable",
  computed: {
    dragOptions() {
      return {
        animation: 250,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
    todoTasks() {
      return {
        tasks: this.tasks
      };
    }
  }
};
</script>
<style scoped>
.strike {
  text-decoration: line-through;
}
span.actions {
  float: right;
}
/* draggable css*/
.flip-list-move {
  transition: linear transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 10px;
}
.list-group-new {
  min-height: 20px;
}
span > div.list-group > span > div.list-group-item {
  cursor: move;
  position: relative;
  display: block;
  padding: 0.55rem 0 0.55rem 1rem;
  margin-bottom: -1px;
  background-color: #fff;
  border-left: 1px solid rgba(0, 0, 0, 0.125);
  border-top: 1px solid rgba(0, 0, 0, 0.125);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  border-right: 0px solid rgba(0, 0, 0, 0.125);
  border-radius: 0px;
}
.list-group-item i {
  cursor: pointer;
}
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
}
.dragOld {
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border: 1px dashed grey;
  display: block;
  min-height: 20px;
}
</style>