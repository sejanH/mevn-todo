<template>
  <draggable class="list-group" ghost-class="ghost" tag="ul" :list="tasks" :group="{ name: 'g1' }">
    <div
      :class="[element.deleted?'strike':'','list-group-item']"
      v-for="element in tasks"
      :key="element.id"
    >
      {{ element.title }} -
      <small>{{element.body}}</small>
      <span class="actions">
        <span style="display:inline-block;font-size:" v-if="!element.deleted">{{element.created_at}}</span>
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
      <nested-draggable :tasks="element.tasks" />
    </div>
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
  components: {
    draggable
  },
  name: "nested-draggable"
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