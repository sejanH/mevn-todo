<template>
  <div class="row justify-content-center">
    <div class="col-md-9">
      <h4>Add a new todo</h4>
      <form v-bind:model="newTodo" v-on:submit.prevent="addNewTodo">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" v-model="newTodo.title" />
        </div>
        <div class="form-group">
          <label for="body">Body</label>
          <input type="text" class="form-control" v-model="newTodo.body" />
        </div>
        <input
          type="submit"
          value="Add"
          :class="[newTodo.title || newTodo.body==''?'btn-disabled':'','btn btn-success']"
        />
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
        tasks: [],
        created_at: Date.now(),
        parent: 0,
        position: 1,
        active: true,
        deleted: false,
        token: localStorage.getItem("token")
      }
    };
  },
  methods: {
    addNewTodo() {
      axios
        .post("http://localhost:8081/api/new/create", this.newTodo)
        .then(res => {
          console.log(res.data);
          this.newTodo.title = this.newTodo.body = "";
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
</style>
