import { Home } from "@/pages/Home";
import { QuizPage, ResultPage } from "@/pages/Quiz";
import { GalleryPage } from "@/pages/Gallery";
import { NotFoundPage } from "@/pages/NotFoundPage";

const ROUT__DEFAULT = {
  path: "/",
  name: "default",
  redirect: "/home",
};

const ROUT__HOME = {
  path: "/home",
  name: "home",
  component: new Home(),
};

const ROUTE_QUIZ = {
  path: "/quiz",
  name: "quiz",
  component: new QuizPage(),
};

const ROUTE_RESULT_PAGE = {
  path: "/quiz-result",
  name: "quiz-result",
  component: new ResultPage(),
};

const ROUT__GALLERY = {
  path: "/gallery",
  name: "gallery",
  component: new GalleryPage(),
};

const ROUT_NOT_FOUND_PAGE = {
  path: "/*",
  name: "not-found-page",
  component: new NotFoundPage(),
};

export const routs = [
  ROUT__DEFAULT,
  ROUT__HOME,
  ROUTE_QUIZ,
  ROUTE_RESULT_PAGE,
  ROUT_NOT_FOUND_PAGE,
  ROUT__GALLERY,
];
