const aside = document.querySelector('aside')
aside.innerHTML = `

<ul class="sidebar-nav" id="sidebar-nav">
    
<li class="nav-item">
  <a class="nav-link collapsed" data-page="dashboard" href="index.html">
    <i class="bi bi-grid"></i>
    <span>Dashboard</span>
  </a>
</li><!-- End Dashboard Nav -->

<li class="nav-item">
  <a class="nav-link collapsed" href="informacion.html" data-page="antecedentes">
    <i class="bi bi-people-fill"></i>
    <span>Ciudadanos</span>
  </a>
</li><!-- Fin Antecedentes -->

<li class="nav-item">
  <a class="nav-link collapsed" href="antecedentes.html" data-page="antecedentes">
    <i class="bi bi-ui-radios"></i>
    <span>Antecedentes</span>
  </a>
</li><!-- Fin Antecedentes -->

<li class="nav-item">
  <a class="nav-link collapsed" href="delitos.html" data-page="delitos">
    <i class="bi bi-shield-shaded"></i>
    <span>Delitos</span>
  </a>
</li><!-- Fin Delitos -->

<li class="nav-item">
  <a class="nav-link collapsed" href="grados_delitos.html" data-page="delitos">
    <i class="bi bi-shield-shaded"></i>
    <span>Grados Delitos</span>
  </a>
</li><!-- Fin Delitos -->

`