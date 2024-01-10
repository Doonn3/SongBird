import { Home } from '@/pages/Home';
import { QuizPage, ResultPage } from '@/pages/Quiz';
import { GalleryPage } from '@/pages/Gallery';
import { NotFoundPage } from '@/pages/NotFoundPage';

const ROUT__DEFAULT = {
  path: '/',
  name: 'default',
  redirect: '/home',
};

const ROUT__HOME = {
  path: '/home',
  name: 'home',
  component: Home,
};

const ROUTE_QUIZ = {
  path: '/quiz',
  name: 'quiz',
  component: QuizPage,
};

const ROUTE_RESULT_PAGE = {
  path: '/quiz-result',
  name: 'quiz-result',
  component: ResultPage,
};

const ROUT__GALLERY = {
  path: '/gallery',
  name: 'gallery',
  component: GalleryPage,
};

const ROUT_NOT_FOUND_PAGE = {
  path: '*',
  name: 'not-found-page',
  component: NotFoundPage,
};

export const routs = [
  ROUT__DEFAULT,
  ROUT__HOME,
  ROUTE_QUIZ,
  ROUTE_RESULT_PAGE,
  ROUT_NOT_FOUND_PAGE,
  ROUT__GALLERY,
];
