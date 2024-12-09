const aside = document.querySelector('aside')
aside.innerHTML = `

<ul class="sidebar-nav" id="sidebar-nav">
    
<li class="nav-item">
  <a class="nav-link collapsed" data-page="dashboard" href="">
    <i class="bi bi-grid"></i>
    <span>Dashboard</span>
  </a>
</li><!-- End Dashboard Nav -->

<li class="nav-item">
  <a class="nav-link collapsed" data-bs-target="#ciudadanos-nav" data-bs-toggle="collapse" href="">
    <i class="bi bi-people-fill"></i><span>Ciudadanos</span><i class="bi bi-chevron-down ms-auto"></i>
  </a>
  <ul id="ciudadanos-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
    <li>
      <a href="informacion.html" data-page="informacion">
        <i class="bi bi-circle"></i><span>Informacion</span>
      </a>
    </li>

    <li>
      <a href="#historial" data-page="historial">
        <i class="bi bi-circle"></i><span>Historial</span>
      </a>
    </li>
    <li>
      <a href="#categorias" data-page="categorias">
        <i class="bi bi-circle"></i><span>Categorias</span>
      </a>
    </li>
  </ul>
</li><!-- Fin Ciudadanos -->

<li class="nav-item">
  <a class="nav-link collapsed" href="#antecedentes" data-page="antecedentes">
    <i class="bi bi-ui-radios"></i>
    <span>Antecedentes</span>
  </a>
</li><!-- Fin Antecedentes -->

<li class="nav-item">
  <a class="nav-link collapsed" href="#delitos" data-page="delitos">
    <i class="bi bi-shield-shaded"></i>
    <span>Delitos</span>
  </a>
</li><!-- Fin Delitos -->


<li class="nav-item">
  <a class="nav-link collapsed" data-bs-target="#informes-nav" data-bs-toggle="collapse" href="">
    <i class="bi bi-receipt-cutoff"></i><span>Informes</span><i class="bi bi-chevron-down ms-auto"></i>
  </a>
  <ul id="informes-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
    <li>
      <a href="#ciudadanos" data-page="ciudadanos">
        <i class="bi bi-circle"></i><span>Ciudadanos</span>
      </a>
    </li>

    <li>
      <a href="#antecedentes" data-page="antecedentes">
        <i class="bi bi-circle"></i><span>Antecedentes</span>
      </a>
    </li>
    <li>
      <a href="#incidencias" data-page="incidencias">
        <i class="bi bi-circle"></i><span>Incidencias</span>
      </a>
    </li>
  </ul>
</li><!-- Fin Ciudadanos -->

`