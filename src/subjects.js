import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

document.addEventListener('click', () => {
  const stream$ = new Subject(); // почти тоже Observable. Но начала нужно подписаться, потом имитить события вне создания.

  stream$.subscribe((v) => console.log('Value: ', v));

  stream$.next('Hello');
  stream$.next('Rx');
  stream$.next('JS');
});

document.addEventListener('click', () => {
  const stream$ = new BehaviorSubject('First!'); // как Subject но со значение по умолчанию

  stream$.subscribe((v) => console.log('Value: ', v));

  stream$.next('Hello');
  stream$.next('Rx');
  stream$.next('JS');
});

document.addEventListener('click', () => {
  const stream$ = new ReplaySubject(2); // запоминает все задиспатченные значения в данном случае 'Rx' и 'JS'

  stream$.next('Hello');
  stream$.next('Rx');
  stream$.next('JS');

  stream$.subscribe((v) => console.log('Value: ', v));
});
