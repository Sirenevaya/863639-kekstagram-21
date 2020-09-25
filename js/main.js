"use strict";

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
const NUMBER_COMMENTS = getRandomInt(1, 7);
const NUMBER_PICTURE = 25;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getComments = function () {
  const arrayComments = [];
  for (let i = 0; i < NUMBER_COMMENTS; i++) {
    arrayComments.push({
      avatar: `img/avatar-` + getRandomInt(1, 6) + `.svg`,
      message: USER_MESSAGES[Math.floor(Math.random() * USER_MESSAGES.length)],
      name: USER_NAMES[Math.floor(Math.random() * USER_NAMES.length)]
    });
  }
  return arrayComments;
};

const getRandomComments = function () {
  const comments = [];
  for (let i = 0; i < getRandomInt(0, 10); i++) {
    comments.push(getComments());
  }
  return comments;
};

const getUserPhoto = function () {
  const arrayPhoto = [];
  for (let i = 1; i <= NUMBER_PICTURE; i++) {
    arrayPhoto.push({
      url: `photos/` + i + `.jpg`,
      description: ``,
      likes: getRandomInt(15, 200),
      comments: getRandomComments()
    });
  }
  return arrayPhoto;
};

const getPicture = getUserPhoto();

const sectionPictures = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`)
  .content
  .querySelector(`.picture`);

const outputPicture = function (data) {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector(`.picture__likes`).textContent = data.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = data.comments.length;
  pictureElement.querySelector(`.picture__img`).src = data.url;

  return pictureElement;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < getPicture.length; i++) {
  fragment.appendChild(outputPicture(getPicture[i]));
}
sectionPictures.appendChild(fragment);
