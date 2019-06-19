<template>
  <div class="row justify-content-center">
    <div>
      <a @click="$router.go('-1')" class="btn bg-mevn">Back</a>
    </div>
    <div class="col-md-9">
      <h4>Add a new todo</h4>
      <form v-bind:model="newTodo" v-on:submit.prevent="addNewTodo">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" v-model="newTodo.title">
        </div>
        <div class="form-group">
          <label for="body">Body</label>
          <input type="text" class="form-control" v-model="newTodo.body">
        </div>
        <!-- <div class="form-group">
          <label for="created_at">Created at</label>
          <input type="text" class="form-control" readonly :value="newTodo.created_at">
        </div>-->
        <input type="submit" value="Add" class="btn btn-success">
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "new-todo",
  data() {
    return {
      newTodo: {
        title: "",
        body: "",
        parent: 0,
        position: 1,
        active: true,
        deleted: false,
        created_at: Date.now()
      }
    };
  },
  methods: {
    addNewTodo() {
      console.log(this.newTodo);
    }
  }
};
</script>

<style scoped>
</style>
