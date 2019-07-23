<template>
  <draggable
    class="list-group"
    ghost-class="ghost"
    :list="tasks"
    :group="{ name: 'g1' }"
    tag="ul"
    v-bind="dragOptions"
  >
    <li
      :class="[element.deleted?'strike':'','list-group-item']"
      v-for="element in tasks"
      :key="element.id"
    >
      {{ element.title }} -
      <small>{{element.body}}</small>
      <span class="actions">
        <span
          style="display:inline-block;font-size:0.75rem;letter-spacing: -0.25px;"
          v-if="!element.deleted"
        >{{element.created_at}}</span>
        <span
          style="display:inline-block;"
          class="custom-control custom-checkbox"
          title="mark as complete"
        >
          <input
            class="custom-control-input"
            type="checkbox"
            :value="element.id"
            :id="'complete_'+element.id"
          />
          <label class="custom-control-label" :for="'complete_'+element.id">&#10004;</label>
        </span>
      </span>
      <nested-draggable :tasks="element.tasks" v-if="element.tasks.length>0" />
    </li>
  </draggable>
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
    }
  },
  components: {
    draggable
  },
  name: "nested-draggable",
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
.dragArea {
  min-height: 50px;
  outline: 1px dashed;
}
</style>