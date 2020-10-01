// 3.18. Личный проект: больше деталей (часть 1)
"use strict";

(function () {

  const body = document.querySelector(`body`);
  const USER_MESSAGES = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
  ];
  const USER_NAMES = [
    `Артем`,
    `Дмитрий`,
    `Анна`,
    `Татьяна`,
    `Александр`,
    `Полина`,
  ];
  const NUMBER_PICTURE = 25;
  const sectionPictures = document.querySelector(`.pictures`);
  const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
  const bigPicture = document.querySelector(`.big-picture`);
  const socialComments = bigPicture.querySelector(`.social__comments`);
  const socialCommentCount = bigPicture.querySelector(`.social__comment-count`);
  const commentsLoader = bigPicture.querySelector(`.comments-loader`);

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const getUserComments = () => {
    const arrayComments = [];
    for (let i = 0; i < getRandomInt(1, 50); i++) {
      arrayComments.push({
        avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
        message: USER_MESSAGES[Math.floor(Math.random() * USER_MESSAGES.length)],
        name: USER_NAMES[Math.floor(Math.random() * USER_NAMES.length)]
      });
    }
    return arrayComments;
  };

  const getUserPictures = () => {
    const arrayUserPictures = [];
    for (let i = 1; i <= NUMBER_PICTURE; i++) {
      arrayUserPictures.push({
        url: `photos/${i}.jpg`,
        description: `Описание фотографии`,
        likes: getRandomInt(15, 200),
        comments: getUserComments()
      });
    }
    return arrayUserPictures;
  };

  const outputPictures = (data) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector(`.picture__likes`).textContent = data.likes;
    pictureElement.querySelector(`.picture__comments`).textContent = data.comments.length;
    pictureElement.querySelector(`.picture__img`).src = data.url;
    return pictureElement;
  };

  const fragment = document.createDocumentFragment();
  const arrayUserPictures = getUserPictures();
  for (let i = 0; i < arrayUserPictures.length; i++) {
    fragment.appendChild(outputPictures(arrayUserPictures[i]));
  }
  sectionPictures.appendChild(fragment);

  const cleanElements = () => {
    while (socialComments.firstChild) {
      socialComments.removeChild(socialComments.firstChild);
    }
  };

  const createSocialComments = (comment) => {
    const newComment = document.createElement(`li`);
    newComment.classList.add(`social__comment`);
    socialComments.append(newComment);

    const socialPicture = document.createElement(`img`);
    socialPicture.classList.add(`social__picture`);
    socialPicture.src = comment.avatar;
    socialPicture.alt = comment.name;
    socialPicture.width = `35`;
    socialPicture.height = `35`;
    newComment.append(socialPicture);

    const socialText = document.createElement(`p`);
    socialText.classList.add(`social__text`);
    socialText.textContent = comment.message;
    newComment.append(socialText);

    return newComment;
  };

  const addsUserComments = (data) => {
    cleanElements();
    for (let dataComment of data) {
      createSocialComments(dataComment);
    }
  };

  const outputBigPicture = (data) => {
    bigPicture.querySelector(`.big-picture__img img`).src = data.url;
    bigPicture.querySelector(`.likes-count`).textContent = data.likes;
    bigPicture.querySelector(`.social__caption`).textContent = data.description;
    bigPicture.querySelector(`.comments-count`).textContent = data.comments.length;
    addsUserComments(data.comments);
  };

  body.classList.remove(`modal-open`);
  bigPicture.classList.remove(`hidden`);
  outputBigPicture(arrayUserPictures[0]);
  socialCommentCount.classList.add(`hidden`);
  commentsLoader.classList.add(`hidden`);

})();
