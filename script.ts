document.addEventListener('DOMContentLoaded', () => {
  // Associa cada URL de avatar a um nome
  const avatars: { [key: string]: string } = {
      './images/avatar 2.png': 'Ana Clara',
      './images/avatar 3.png': 'Maria Oliveira',
      './images/avatar 4.png': 'João Oliveira',
      './images/avatar 5.png': 'Lindley Ellington',
  };
  const avatarUrls: string[] = Object.keys(avatars); // Lista de URLs de avatares
  let currentAvatarUrl: string = ''; // Variável para armazenar o avatar atual

  function getAvatarName(avatarUrl: string): string {
      return avatars[avatarUrl];
  }

  // Seleciona um avatar aleatório para o botão "Adicionar comentário"
  function setRandomAvatarForButton(): void {
      currentAvatarUrl = avatarUrls[Math.floor(Math.random() * avatarUrls.length)];
      const buttonAvatarImg = document.getElementById('add-comment-avatar') as HTMLImageElement;
      if (buttonAvatarImg) {
          buttonAvatarImg.src = currentAvatarUrl;
          buttonAvatarImg.alt = 'Avatar do botão de comentário';
      } else {
          console.error('Elemento com ID "add-comment-avatar" não encontrado.');
      }
  }

  // Inicializa o avatar do botão
  setRandomAvatarForButton();

  const commentInput = document.getElementById('comment-input') as HTMLInputElement;
  const addCommentBtn = document.getElementById('add-comment-btn') as HTMLButtonElement;
  const commentsList = document.getElementById('comments-list') as HTMLDivElement;

  if (!commentInput) console.error('Elemento com ID "comment-input" não encontrado.');
  if (!addCommentBtn) console.error('Elemento com ID "add-comment-btn" não encontrado.');
  if (!commentsList) console.error('Elemento com ID "comments-list" não encontrado.');

  function addComment(): void {
      if (!commentInput || !commentsList) return;

      const commentText = commentInput.value.trim();
      if (commentText) {
          // Usa o avatar atual para o comentário
          const avatarUrl = currentAvatarUrl;
          const userName = getAvatarName(avatarUrl);

          const commentElement = document.createElement('div');
          commentElement.className = 'comment';

          const avatar = document.createElement('img') as HTMLImageElement;
          avatar.src = avatarUrl;
          avatar.alt = 'Avatar do usuário';
          avatar.className = 'comment-avatar';

          const contentContainer = document.createElement('div');
          contentContainer.className = 'comment-content';

          const userNameElement = document.createElement('strong');
          userNameElement.textContent = userName;

          const text = document.createElement('span');
          text.textContent = commentText;
          text.className = 'comment-text';

          const time = document.createElement('span');
          time.className = 'time';
          time.textContent = 'Agora';

          const likeContainer = document.createElement('div');
          likeContainer.className = 'like-container';

          const likeIcon = document.createElement('i');
          likeIcon.className = 'fa-regular fa-heart';

          const likeCount = document.createElement('span');
          likeCount.className = 'like-count';
          likeCount.textContent = '0';

          likeContainer.appendChild(likeIcon);
          likeContainer.appendChild(likeCount);

          likeIcon.addEventListener('click', () => {
              const liked = likeIcon.classList.toggle('liked');
              const count = parseInt(likeCount.textContent || '0', 10);
              likeCount.textContent = (liked ? count + 1 : count - 1).toString();
          });

          contentContainer.appendChild(userNameElement);
          contentContainer.appendChild(text);
          contentContainer.appendChild(time);
          
          commentElement.appendChild(avatar);
          commentElement.appendChild(contentContainer);
          commentElement.appendChild(likeContainer);

          commentsList.appendChild(commentElement);

          commentInput.value = '';
          // Atualiza o avatar aleatório após o comentário ser enviado
          setRandomAvatarForButton();
      }
  }

  if (addCommentBtn && commentInput && commentsList) {
      addCommentBtn.addEventListener('click', addComment);

      commentInput.addEventListener('keydown', (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
              event.preventDefault();
              addComment();
          }
      });
  }
});
