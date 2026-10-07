// Micro frontend: PERFIL  (equipo "Cuentas") — implementado como Web Component
// Contrato: define la etiqueta <mfe-perfil>
// Publica:  'usuario:cambio' { nombre }
(function () {
  const VERSION = '1.0.0';
  const datos = { nombre: '', ciudad: 'Valledupar' };  // estado propio

  class MfePerfil extends HTMLElement {
    connectedCallback() {
      // Shadow DOM: estilos y marcado encapsulados. Ni el contenedor ni
      // otros micro frontends pueden afectar (ni ser afectados por) este CSS.
      const sombra = this.shadowRoot || this.attachShadow({ mode: 'open' });
      sombra.innerHTML = `
        <style>
          :host { display: block; }
          h2 { margin: 0 0 10px; color: var(--upc-color-exito-oscuro, #1b6b3a); font-family: var(--upc-fuente-display, 'Fraunces', Georgia, serif); font-size: clamp(32px, 5vw, 48px); font-weight: 700; letter-spacing: -.02em; line-height: 1.05; }
          .version { display: inline-flex; align-items: center; gap: 7px; padding: 6px 11px; border-radius: 999px; background: var(--upc-color-primario-suave, #e3efe4); color: var(--upc-color-texto-tenue, #5f6a58); font-family: var(--upc-fuente-mono, 'IBM Plex Mono', Consolas, monospace); font-size: 12px; line-height: 1; }
          .version::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--upc-color-exito, #2f8f4e); }
          form { position: relative; overflow: hidden; max-width: 460px; margin-top: 24px; padding: 34px 28px 26px; background: var(--upc-color-superficie, #fffcf3); border: 1px solid var(--upc-color-borde, #e3d9bd); border-radius: var(--upc-radio-2, 14px); box-shadow: var(--upc-sombra-1, 0 1px 2px rgba(18, 67, 43, .08), 0 8px 18px -10px rgba(18, 67, 43, .22)); }
          form::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 6px; background: repeating-linear-gradient(90deg, var(--upc-color-acento, #f2b632) 0 18px, var(--upc-color-peligro, #b8432b) 18px 36px, var(--upc-color-borde, #e3d9bd) 36px 54px, var(--upc-color-exito, #2f8f4e) 54px 72px); }
          label { display: block; margin: 18px 0 7px; color: var(--upc-color-texto-suave, #4a5848); font-size: 11px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
          label:first-child { margin-top: 0; }
          input { width: 100%; padding: 12px 14px; border: 1.5px solid var(--upc-color-borde-input, #cdbf9c); border-radius: var(--upc-radio-1, 8px); box-sizing: border-box; background: var(--upc-color-superficie, #fffcf3); color: var(--upc-color-texto, #1c2b21); font-family: var(--upc-fuente-base, 'Hanken Grotesk', system-ui, sans-serif); font-size: 16px; transition: border-color .2s, box-shadow .2s; }
          input::placeholder { color: var(--upc-color-texto-tenue, #5f6a58); }
          input:focus { outline: none; border-color: var(--upc-color-exito, #2f8f4e); box-shadow: 0 0 0 4px rgba(47, 143, 78, .2); }
          button { margin-top: 24px; padding: 12px 26px; border: 0; border-radius: 999px; background: var(--upc-color-exito-oscuro, #1b6b3a); color: var(--upc-color-sobre-primario, #fbf5e6); font-family: var(--upc-fuente-base, 'Hanken Grotesk', system-ui, sans-serif); font-size: 15px; font-weight: 600; cursor: pointer; transition: background .2s, transform .15s; }
          button:hover { background: var(--upc-color-primario, #12432b); }
          button:active { transform: scale(.97); }
          button:focus-visible { outline: 3px solid var(--upc-color-acento, #f2b632); outline-offset: 2px; }
          .ok { margin: 16px 0 0; color: var(--upc-color-exito-oscuro, #1b6b3a); font-size: 14px; font-weight: 600; }
          .ok:empty { display: none; }
          .ok::before { content: '✓ '; }
        </style>
        <h2>Mi perfil</h2>
        <span class="version">mfe-perfil v${VERSION} · Web Component</span>
        <form>
          <label>Nombre</label>
          <input name="nombre" value="${datos.nombre}" placeholder="Escribe tu nombre" required>
          <label>Ciudad</label>
          <input name="ciudad" value="${datos.ciudad}">
          <button type="submit">Guardar</button>
          <p class="ok"></p>
        </form>`;

      sombra.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault();
        const f = e.target;
        datos.nombre = f.nombre.value.trim();
        datos.ciudad = f.ciudad.value.trim();
        sombra.querySelector('.ok').textContent = 'Datos guardados.';
        window.dispatchEvent(new CustomEvent('usuario:cambio', { detail: { nombre: datos.nombre } }));
      });
    }
  }

  if (!customElements.get('mfe-perfil')) {
    customElements.define('mfe-perfil', MfePerfil);
  }
})();
