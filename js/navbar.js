$("body").prepend(`<nav class="site-header sticky-top py-1 bg-dark">
<div class="container d-flex flex-column flex-md-row justify-content-between">
  <a class="py-2 d-none d-md-inline-block" href="home.html">Inicio</a>
  <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
  <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
  <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
  <a class="py-2 d-none d-md-inline-block" href="cart.html">Mi carrito</a>
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span id="navbar-user">Dropdown button</span>
    </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a class="dropdown-item"  href="my-profile.html">My profile</a>
      <a class="dropdown-item" id="logout" href="index.html">Log Out</a>
  </div>
</div>
</nav>`)
