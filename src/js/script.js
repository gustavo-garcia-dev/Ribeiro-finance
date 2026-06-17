const sidebar = document.getElementById('sidebar');
const openBtn = document.getElementById('open_btn');

// Verifica se estava aberto anteriormente
if (localStorage.getItem('sidebarOpen') === 'true') {
    sidebar.classList.add('open-sidebar');
}

openBtn.addEventListener('click', function () {

    sidebar.classList.toggle('open-sidebar');

    // Salva o estado atual
    localStorage.setItem(
        'sidebarOpen',
        sidebar.classList.contains('open-sidebar')
    );

});