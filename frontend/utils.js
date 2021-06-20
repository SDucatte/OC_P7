function alert(message) {
    let alert = document.createElement('div');
    alert.classList.add('alert');
    alert.innerHTML = message + '<i class="fas fa-times"></i>';
    document.querySelector('main').prepend(alert);
    alert.querySelector('.fa-times').addEventListener('click', function() {
        this.closest('.alert').classList.add('fade');
    })
    setTimeout(function () {
        document.querySelector('.alert').classList.add('fade');
    }, 5000);

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 6500);
    
}