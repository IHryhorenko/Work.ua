// const initialVacancies = [
//   {
//     id: '1',
//     title: 'Junior Frontend Developer',
//     company: 'IT Solutions',
//     city: 'Київ',
//     salary: '25 000 – 35 000 грн',
//     employment: 'Повна зайнятість',
//     workFormat: 'Віддалено',
//     experience: 'Без досвіду',
//     category: 'IT',
//     description: 'Шукаємо Junior Frontend Developer для роботи над вебпроєктами.',
//     responsibilities: 'Розробка інтерфейсів, виправлення помилок, робота з React.',
//     requirements: 'Знання HTML, CSS, JavaScript та основ React.',
//     conditions: 'Навчання, підтримка команди та гнучкий графік.',
//     date: new Date().toISOString(),
//   },
//   {
//     id: '2',
//     title: 'UI/UX Designer',
//     company: 'Creative Studio',
//     city: 'Львів',
//     salary: '20 000 – 30 000 грн',
//     employment: 'Повна зайнятість',
//     workFormat: 'Гібридно',
//     experience: '1–2 роки',
//     category: 'Дизайн',
//     description: 'Шукаємо дизайнера для створення зручних інтерфейсів.',
//     responsibilities: 'Створення макетів, прототипів та робота з дизайн-системою.',
//     requirements: 'Знання Figma та основ UI/UX дизайну.',
//     conditions: 'Комфортний офіс та професійний розвиток.',
//     date: new Date().toISOString(),
//   },
//   {
//     id: '3',
//     title: 'Менеджер з продажу',
//     company: 'Sales Group',
//     city: 'Одеса',
//     salary: '18 000 – 28 000 грн',
//     employment: 'Повна зайнятість',
//     workFormat: 'В офісі',
//     experience: 'Без досвіду',
//     category: 'Продажі',
//     description: 'Потрібен менеджер для роботи з клієнтами.',
//     responsibilities: 'Консультація клієнтів та оформлення замовлень.',
//     requirements: 'Комунікабельність та відповідальність.',
//     conditions: 'Ставка та бонуси за результатами роботи.',
//     date: new Date().toISOString(),
//   },
// ];

// export function getVacancies() {
//   const saved = localStorage.getItem('vacancies');

//   if (saved) {
//     return JSON.parse(saved);
//   }

//   localStorage.setItem('vacancies', JSON.stringify(initialVacancies));
//   return initialVacancies;
// }

// export function saveVacancies(vacancies) {
//   localStorage.setItem('vacancies', JSON.stringify(vacancies));
// }

// export function getVacancyById(id) {
//   return getVacancies().find((vacancy) => vacancy.id === id);
// }