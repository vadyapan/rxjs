import { from, fromEvent, scan } from 'rxjs';

const stream$ = of(1, 2, 3, 4); // знаком $ показываем что элемент реативен, можем применять функционал
// метод of позволяет создавать стримы из любых данных
stream$.subscribe((value) => {
  console.log('Value: ', value);
});

const arr$ = from([1, 2, 3, 4]).pipe( // from работает с массивами, метод pipe позволяет использовать операторы
  scan((acc, v) => acc.concat(v), []), // scan работает как reduce, тут конкатенируем в пустрой массив
);

arr$.subscribe((value) => console.log(value));

const stream$ = new Observable(observer => { // Observable позволяет создать объект стрима
  observer.next('First value')
  setTimeout(() => observer.next('After 1000 ms'), 1000)
  setTimeout(() => observer.complete(), 1500)
  // setTimeout(() => observer.error('Something went wrong'), 2000)
  setTimeout(() => observer.next('After 3000 ms'), 3000)
})

stream$.subscribe(
  (val) => console.log('Value: ', val),
  (err) => console.log(err),
  () => console.log('Complete')
)

stream$.subscribe({
  next(val) {
    console.log(val)
  },
  error(err) {
    console.log(err)
  },
  complete() {
    console.log('Complete')
  }
})

fromEvent(document.querySelector('canvas'), 'mousemove') // метод fromEvent позволяет создать стрим из событий
  .pipe(
    map(e => ({
      x: e.offsetX,
      y: e.offsetY,
      ctx: e.target.getContext('2d')
    }))
  )
  .subscribe(pos => {
    pos.ctx.fillRect(pos.x, pos.y, 2, 2)
  })

const clear$ = fromEvent(document.getElementById('clear'), 'click')

clear$.subscribe(() => {
  const canvas = document.querySelector('canvas')
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
})

const sub = interval(500).subscribe(v => console.log(v))

setTimeout(() => {
  sub.unsubscribe()
}, 4000)

timer(2500).subscribe(v => console.log(v)) // timer создаст стрим через 2.5 секунды

range(42, 10).subscribe(v => console.log(v)) // range создает диапазон (тут 42-51)
