import './app/style/app.style.scss';

import { App } from '@/app/App';

const elemApp = document.querySelector<HTMLElement>('#app');

if (elemApp) {
  new App(elemApp);
}

// TEST BLOCK

// let counter = 0;

// const onClick = () => {
//   console.log("click");
//   console.log(counter)
// };

// const onClick2 = () => {
//   console.log("click2");
//   console.log(counter)
// };

// const onClick3 = () => {
//   console.log("click3");
//   counter += 1;
//   console.log(counter)
// };

// const template = `
// <div>
//   <button my-onclick="onClick"></button>
//   <div>
//     <button my-onclick="onClick3"></button>
//     <span>{{counter}}</span>
//   </div>
//   <button my-onclick="onClick2"></button>
// </div>
// `;

// // Создаем словарь с нашими функциями

// const functions: { [key: string]: () => void } = {
//   onClick,
//   onClick2,
//   onClick3,
// };

// let parser = new DOMParser();
// let doc = parser.parseFromString(template, "text/html");

// // Добавляем обработчики событий к элементам с атрибутом 'my-onclick'
// let elements = doc.querySelectorAll("[my-onclick]");
// elements.forEach((element) => {
//   let functionName = element.getAttribute("my-onclick");
//   if (functionName === null) return;
//   let functionToUse = functions[functionName];
//   if (functionToUse) {
//     element.addEventListener("click", functionToUse);
//   }
// });

// elemApp?.append(doc.body.firstChild!);

// const testTemplate = `
// <div onclick="() => {console.log('13213')}">
//   <h1>Test</h1>
//   <h1>Test1</h1>
//   <h1>Test2</h1>
//   <h1>Test3</h1>
// </div>
// `;

// function convertStringTemplateToHtmlELement(_template: string) {
//   const sp = _template.split("");

//   const result = [];

//   for (let i = 0; i < sp.length; i += 1) {
//     const elem = sp[i];

//     let openTagIndex = 0;
//     let closeTagIndex = 0;
//     let isOpenTag = false;
//     let isCloseTag = false;

//     if (elem === "<") {
//       openTagIndex = i;
//       isOpenTag = true;
//       result.push({ openTag: "<" });
//     }

//     if (elem === ">") {
//       closeTagIndex = i;
//       isCloseTag = true;
//       result.push({ closeTag: ">" });
//     }

//     if (isCloseTag && isOpenTag) {
//       let test = "";
//       for (let z = openTagIndex; z < sp.length; z++) {
//         test += sp[z];

//         if (test === "div") {
//           result.push({ nameTag: test });
//           test = "";
//         }

//         if (test === "onclick=") {
//           result.push({ handlerEvent: "onclick" });
//         }
//       }
//     }
//   }

//   const template = document.createElement("div");
//   template.innerHTML = _template;

//   console.log(sp);
//   console.log(result);

//   return template.children[0];
// }

// const result = convertStringTemplateToHtmlELement(testTemplate);

// document.body.append(result!);
