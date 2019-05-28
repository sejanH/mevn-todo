<template>
	<nav class="navbar navbar-expand-md navbar-dark bg-mevn">
	<div class="container">
		<router-link class="navbar-brand" to="/">Home</router-link>
		<button
		class="navbar-toggler"
		type="button"
		data-toggle="collapse"
		data-target="#navbarSupportedContent"
		aria-controls="navbarSupportedContent"
		aria-expanded="false"
		aria-label="Toggle navigation"
		>
		<span class="navbar-toggler-icon"></span>
	</button>

		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav ml-auto">
				<li class="nav-item">
					<router-link class="nav-link" to="home">Home</router-link>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" to="/todo-list">My Todo-List</router-link>
				</li>
				<li class="nav-item dropdown">
					<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i class="far fa-user-circle"></i></a>
					<div class="dropdown-menu dropdown-menu-lg-right" aria-labelledby="navbarDropdown">
						<router-link class="dropdown-item" to="/login">Login</router-link>
						<router-link class="dropdown-item" to="/join">Signup</router-link>
						<div class="dropdown-divider"></div>
						<router-link class="dropdown-item" to="/logout">Logout</router-link>
					</div>
				</li>
			</ul>
		</div>

	</div>
</nav>
</template>

<script>
	export default{
		name:'navbar'
	}
</script>