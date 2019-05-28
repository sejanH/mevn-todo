<template>
	<div id="login" class="row justify-content-center">
		<div class="col-md-5">
			<h4>Login</h4>
			<p>Login and start using this app.</p>
		</div>
		<div class="col-md-5">
			<form class="login-form">
				<div class="form-group">
					<label for="inputEmail3" class="font-weight-bold col-form-label">Email</label>					
					<input type="email" class="form-control" id="inputEmail3" placeholder="Email"  autocomplete="new-email" >					
				</div>
				<div class="form-group">
					<label for="inputPassword3" class="font-weight-bold col-form-label">Password</label>					
					<input type="password" class="form-control" id="inputPassword3" placeholder="Password" autocomplete="new-password">
				</div>
				<div class="form-group">					
					<button type="submit" class="btn btn-info">Login</button>					
				</div>
			</form>
		</div>
	</div>
</template>
<script>
	export default{
		name:'login'
	}
</script>
<style scoped>
div#login{
	padding-top: 20px;
	background-image: linear-gradient(to top, rgba(0, 0, 0,0), rgba(93, 213, 226,0.9));
	height: calc(100vh - 56px);
}
form.login-form{
	background: rgba(18, 158, 158,0.35);
	padding: 2.5rem; border-radius: 0.8rem;
}
</style>