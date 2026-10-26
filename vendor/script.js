document.addEventListener('DOMContentLoaded', () => {
  const allPlayers = document.querySelectorAll('.player-container');

  allPlayers.forEach(player => {
    const btn = player.querySelector('.play-button');
    const audio = player.querySelector('audio');
    const progressFill = player.querySelector('.progress-fill');
    const progressWrapper = player.querySelector('.progress-wrapper');

    if (!btn || !audio || !progressFill) return;

    btn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        btn.classList.add('playing');
        btn.querySelector('.btn-icon').textContent = '⏸';
      } else {
        audio.pause();
        btn.classList.remove('playing');
        btn.querySelector('.btn-icon').textContent = '▶';
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (audio.duration > 0) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = `${percent}%`;
      }
    });

    audio.addEventListener('ended', () => {
      btn.classList.remove('playing');
      progressFill.style.width = '0%';
      btn.querySelector('.btn-icon').textContent = '▶';
    });

    // Перемотка по клику на шкалу
    if (progressWrapper) {
      progressWrapper.addEventListener('click', (e) => {
        const rect = progressWrapper.getBoundingClientRect();
        const posX = e.clientX - rect.left;
        const percent = Math.max(0, Math.min(100, (posX / rect.width) * 100));
        const seekTime = (percent / 100) * audio.duration;
        audio.currentTime = seekTime;
      });
    }
  });
});

const audio = document.getElementById('bg-music');
const btn = document.getElementById('music-toggle');
let isPlaying = false;

btn.addEventListener('click', () => {
  if (!isPlaying) {
    // Пытаемся запустить
    audio.play().then(() => {
      isPlaying = true;
      btn.textContent = '🎶';
      btn.classList.add('active');
    }).catch(error => {
      console.error('Ошибка воспроизведения:', error);
      btn.textContent = 'Ошибка звука';
    });
  } else {
    // Останавливаем
    audio.pause();
    isPlaying = false;
    btn.textContent = '🎵';
    btn.classList.remove('active');
  }
});
