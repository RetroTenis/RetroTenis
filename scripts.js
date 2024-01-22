document.addEventListener('DOMContentLoaded', function () {
    const ball = document.getElementById('ball');
    const container = document.getElementById('container');
    const bar = document.getElementById('bar');
    const topBar = document.getElementById('topBar');
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');
  
    // Velocidades iniciales
    const constantVelocity = -5;
    let velocityX = 2;
    let velocityY = constantVelocity;
  
    // Posiciones iniciales
    let positionX = 0;
    let positionY = container.clientHeight / 2;
  
    // Dimensiones del contenedor y la pelota
    const containerHeight = container.clientHeight;
    const containerWidth = container.clientWidth;
    const ballRadius = parseInt(window.getComputedStyle(ball).width) / 2;
  
    // Variables para el arrastre de la barra
    let isDragging = false;
    let dragStartX = 0;
  
    // Evento de inicio del arrastre
    bar.addEventListener('mousedown', function (event) {
      isDragging = true;
      dragStartX = event.clientX - bar.getBoundingClientRect().left;
    });
  
    // Evento de movimiento durante el arrastre
    document.addEventListener('mousemove', function (event) {
      if (isDragging) {
        let x = event.clientX - container.getBoundingClientRect().left - dragStartX;
        // Asegurar que la barra no se salga del contenedor en el eje horizontal
        x = Math.max(0, Math.min(x, containerWidth - bar.clientWidth));
        bar.style.left = x + 'px';
      }
    });
  
    // Evento de finalización del arrastre
    document.addEventListener('mouseup', function () {
      isDragging = false;
    });
  
    // Botones para mover la barra
    leftButton.addEventListener('click', function () {
      moveBar(bar, -50);
    });
  
    rightButton.addEventListener('click', function () {
      moveBar(bar, 50);
    });
  
    // Función para mover la barra con un desplazamiento específico
    function moveBar(currentBar, offset) {
      const currentLeft = parseInt(window.getComputedStyle(currentBar).left);
      const newLeft = currentLeft + offset;
  
      // Limitar la posición de la barra dentro del contenedor en el eje horizontal
      if (newLeft >= 0 && newLeft <= containerWidth - parseInt(window.getComputedStyle(currentBar).width)) {
        currentBar.style.left = newLeft + 'px';
      }
    }
  
    // Función principal para actualizar la posición de la pelota
    function updateBall() {
      positionY += velocityY;
      positionX += velocityX;
  
      // Colisión con el borde superior
      if (positionY < 0) {
        positionY = 0;
        velocityY *= -1; // Invertir dirección vertical
      }
      // Colisión con el borde inferior y la barra inferior
      else if (positionY > containerHeight - parseInt(window.getComputedStyle(ball).height)) {
        const barPosition = parseInt(window.getComputedStyle(bar).left);
        const barWidth = parseInt(window.getComputedStyle(bar).width);
        const barHeight = parseInt(window.getComputedStyle(bar).height);
  
        // Verificar colisión con la barra inferior
        if (
          positionX >= barPosition &&
          positionX <= barPosition + barWidth &&
          positionY + ball.clientHeight >= containerHeight -barHeight
        ) {
          positionY = containerHeight - barHeight - ballRadius;
          velocityY *= -1; // Invertir dirección vertical
        }
        // Sin colisión con la barra inferior, terminar el juego
        else {
          const container = document.getElementById('container');
          var miH1 = document.getElementById("gameOver");
  
          container.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKYFqE2jk10ZRLHTlFUYkJ5wckufQYf5D3jw&usqp=CAU')";
          miH1.style.display = "block";
          return; // Detener el gameloop
        }
      }
  
      // Colisión con los bordes izquierdo y derecho
      if (positionX < 0 || positionX > containerWidth - parseInt(window.getComputedStyle(ball).width)) {
        velocityX *= -1; // Invertir dirección en el eje horizontal
      }
  
      // Lógica de movimiento de la barra superior
      const ballMidPoint = positionX + ballRadius;
      const topBarMidPoint = parseInt(window.getComputedStyle(topBar).left) + parseInt(window.getComputedStyle(topBar).width) / 2;
  
      // Ajustar la posición de la barra superior en función de la relación entre las posiciones medias
      moveBar(topBar, (ballMidPoint - topBarMidPoint) * 0.1);
  
      // Colisión con la barra superior
      const topBarPosition = parseInt(window.getComputedStyle(topBar).left);
      const topBarWidth = parseInt(window.getComputedStyle(topBar).width);
  
      if (positionX >= topBarPosition && positionX <= topBarPosition + topBarWidth && positionY <= parseInt(window.getComputedStyle(topBar).height)) {
        positionY = parseInt(window.getComputedStyle(topBar).height);
        velocityY *= -1; // Invertir dirección vertical
      }
  
      // Actualizar la posición de la pelota
      ball.style.top = positionY + 'px';
      ball.style.left = positionX + 'px';
  
      // Solicitar el próximo cuadro de animación
      requestAnimationFrame(updateBall);
    }
  
    // Iniciar la animación cuando la página esté cargada
    updateBall();
  });
  